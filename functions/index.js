const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

// ⚠️ POUR TEST UNIQUEMENT : Clé secrète Stripe en dur
// En production, utilisez : functions.config().stripe.secret
const stripe = require('stripe')(STRIPE_SECRET_KEY)

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

