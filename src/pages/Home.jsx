import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import './Home.css'

// Clé publique Stripe (Mode Test)
const stripePromise = loadStripe('pk_test_51SXdZYGqKSpED76edPmgmqrrRnues23bAaFp5lxken2DZuBBkBsA4toyayin6zMHmULmap8Y8G4eatIGDfXJh0NZ005chi5RP5')

function Home() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setLoading(true)

      // ⚠️ IMPORTANT : Remplacez par l'URL de votre Firebase Function
      const response = await fetch('https://VOTRE_FUNCTION_URL/createCheckoutSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: 'tshirt',
          quantity: 1,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session')
      }

      const { id } = await response.json()
      const stripe = await stripePromise

      await stripe.redirectToCheckout({
        sessionId: id,
      })
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors du paiement. Vérifiez votre configuration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-container">
      <div className="card">
        <h1>🛍️ Mini Boutique</h1>
        <p className="subtitle">Démonstration Stripe Checkout</p>

        <div className="product-card">
          <h2>T-shirt Demo</h2>
          <p className="price">20,00 €</p>
          <p className="description">Un magnifique T-shirt pour cette démonstration</p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="buy-button"
          >
            {loading ? 'Chargement...' : 'Acheter le T-shirt'}
          </button>
        </div>

        <div className="info-box">
          <p>💡 <strong>Mode Test activé</strong></p>
          <p>Utilisez la carte de test : <code>4242 4242 4242 4242</code></p>
          <p>Date d'expiration : n'importe quelle date future</p>
          <p>CVC : n'importe quel code à 3 chiffres (ex: 123)</p>
        </div>
      </div>
    </div>
  )
}

export default Home

