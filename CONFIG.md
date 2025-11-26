# ⚙️ Configuration

## Variables à configurer

### 1. Dans `src/pages/Home.jsx`

Remplacez ces deux valeurs :

```javascript
// Ligne ~5 : Votre clé publique Stripe
const stripePromise = loadStripe('pk_test_VOTRE_CLE_PUBLIQUE_ICI')

// Ligne ~15 : L'URL de votre Firebase Function
const response = await fetch('https://VOTRE_FUNCTION_URL/createCheckoutSession', {
```

### 2. Dans Firebase Functions

Configurez la clé secrète :

```bash
firebase functions:config:set stripe.secret="sk_test_VOTRE_CLE_SECRETE"
```

### 3. Dans `functions/index.js` (optionnel)

Si vous déployez l'application sur un domaine spécifique, mettez à jour les URLs :

```javascript
success_url: 'https://votre-domaine.com/success',
cancel_url: 'https://votre-domaine.com/cancel',
```

## Où trouver vos clés Stripe ?

1. Connectez-vous à [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Assurez-vous d'être en **Mode Test**
3. Allez dans **Developers** → **API Keys**
4. Copiez :
   - **Publishable key** → pour React
   - **Secret key** → pour Firebase Functions

## Où trouver l'URL de votre fonction ?

Après avoir déployé avec `firebase deploy --only functions`, vous verrez :

```
✔  functions[createCheckoutSession(us-central1)]: Successful create operation.
Function URL (createCheckoutSession): https://us-central1-XXXXX.cloudfunctions.net/createCheckoutSession
```

Copiez cette URL complète.

