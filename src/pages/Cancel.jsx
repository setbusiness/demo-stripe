import { Link } from 'react-router-dom'
import './Cancel.css'

function Cancel() {
  return (
    <div className="cancel-container">
      <div className="card">
        <div className="cancel-icon">❌</div>
        <h1>Paiement annulé</h1>
        <p className="message">Votre paiement a été annulé.</p>
        <p className="details">Vous pouvez réessayer quand vous le souhaitez.</p>
        <Link to="/" className="back-button">
          Retour à la boutique
        </Link>
      </div>
    </div>
  )
}

export default Cancel

