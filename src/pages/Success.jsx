import { Link } from 'react-router-dom'
import './Success.css'

function Success() {
  return (
    <div className="success-container">
      <div className="card">
        <div className="success-icon">✅</div>
        <h1>Merci pour votre achat !</h1>
        <p className="message">Votre paiement a été validé avec succès.</p>
        <p className="details">Vous recevrez un email de confirmation sous peu.</p>
        <Link to="/" className="back-button">
          Retour à la boutique
        </Link>
      </div>
    </div>
  )
}

export default Success

