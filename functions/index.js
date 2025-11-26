const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

// Configuration de la clé secrète Stripe
// Priorité : 1) functions.config() 2) Variable d'environnement 3) Fichier local
let stripeSecretKey

try {
  // Essayer d'utiliser functions.config() (recommandé)
  stripeSecretKey = functions.config().stripe?.secret
} catch (e) {
  // Si functions.config() n'est pas disponible, utiliser une variable d'environnement
  stripeSecretKey = process.env.STRIPE_SECRET_KEY
}

// Si aucune méthode n'a fonctionné, charger depuis un fichier local (pour développement)
if (!stripeSecretKey) {
  try {
    const localConfig = require('./config.local.js')
    stripeSecretKey = localConfig.stripeSecretKey
  } catch (e) {
    // Fichier local non trouvé, ce n'est pas grave
  }
}

if (!stripeSecretKey) {
  throw new Error('Clé secrète Stripe non configurée. Voir README.md pour la configuration.')
}

const stripe = require('stripe')(stripeSecretKey)

// Produits disponibles
const products = {
  tshirt: {
    name: 'T-shirt Demo',
    amount: 2000, // 20.00 € en centimes
  },
}

/**
 * Crée une session Stripe Checkout
 * POST /createCheckoutSession
 * Body: { productId: 'tshirt', quantity: 1 }
 */
exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      // Vérifier que la méthode est POST
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
      }

      const { productId, quantity = 1 } = req.body

      // Vérifier que le produit existe
      if (!products[productId]) {
        return res.status(400).json({ error: 'Produit non trouvé' })
      }

      const product = products[productId]

      // Créer la session Checkout Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: product.name,
              },
              unit_amount: product.amount,
            },
            quantity: parseInt(quantity, 10),
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin || 'http://localhost:5173'}/success`,
        cancel_url: `${req.headers.origin || 'http://localhost:5173'}/cancel`,
      })

      // Retourner l'ID de la session
      res.json({ id: session.id })
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error)
      res.status(500).json({ error: error.message })
    }
  })
})

