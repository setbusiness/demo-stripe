# 🛍️ Mini Boutique - Stripe Demo (Mode Test)

Un projet simple pour apprendre à intégrer Stripe Checkout dans une application React avec Firebase Functions.

## 📋 Prérequis

- Node.js 18+ installé
- Un compte Stripe (gratuit)
- Un compte Firebase (gratuit)
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances React

```bash
npm install
```

### 2. Installer les dépendances Firebase Functions

```bash
cd functions
npm install
cd ..
```

### 3. Configurer Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

Lors de l'initialisation :
- Sélectionnez votre projet Firebase
- Choisissez JavaScript
- Activez ESLint si vous le souhaitez

### 4. Configurer Stripe

#### Obtenir vos clés API Stripe

1. Connectez-vous à [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Assurez-vous d'être en **Mode Test** (toggle en haut à droite)
3. Copiez vos clés :
   - **Clé publique** : `pk_test_...` (pour React)
   - **Clé secrète** : `sk_test_...` (pour Firebase Functions)

#### Configurer la clé secrète Stripe

**Option 1 : Fichier local (pour développement/test)**

1. Copiez le fichier d'exemple :
```bash
cd functions
cp config.local.example.js config.local.js
```

2. Éditez `functions/config.local.js` et ajoutez votre clé secrète :
```javascript
module.exports = {
  stripeSecretKey: 'sk_test_VOTRE_CLE_SECRETE'
}
```

**Option 2 : Firebase Config (pour déploiement)**

```bash
firebase functions:config:set stripe.secret="sk_test_VOTRE_CLE_SECRETE"
```

**Option 3 : Variable d'environnement**

```bash
export STRIPE_SECRET_KEY="sk_test_VOTRE_CLE_SECRETE"
```

### 5. Configurer React avec votre clé publique

Éditez `src/pages/Home.jsx` et remplacez :

```javascript
const stripePromise = loadStripe('pk_test_VOTRE_CLE_PUBLIQUE_ICI')
```

### 6. Déployer Firebase Functions

```bash
firebase deploy --only functions
```

Après le déploiement, copiez l'URL de votre fonction (elle ressemblera à :
`https://us-central1-VOTRE-PROJET.cloudfunctions.net/createCheckoutSession`)

### 7. Configurer l'URL de la fonction dans React

Éditez `src/pages/Home.jsx` et remplacez :

```javascript
const response = await fetch('https://VOTRE_FUNCTION_URL/createCheckoutSession', {
```

Par l'URL de votre fonction déployée.

### 8. Mettre à jour les URLs de redirection (optionnel)

Si vous déployez l'application, mettez à jour les URLs dans `functions/index.js` :

```javascript
success_url: 'https://votre-domaine.com/success',
cancel_url: 'https://votre-domaine.com/cancel',
```

## 🎮 Utilisation

### Lancer l'application en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Tester un paiement

1. Cliquez sur le bouton "Acheter le T-shirt"
2. Vous serez redirigé vers la page Stripe Checkout
3. Utilisez les informations de carte de test :
   - **Numéro de carte** : `4242 4242 4242 4242`
   - **Date d'expiration** : n'importe quelle date future (ex: 12/25)
   - **CVC** : n'importe quel code à 3 chiffres (ex: 123)
   - **Code postal** : n'importe quel code postal valide
4. Complétez le paiement
5. Vous serez redirigé vers la page de succès

## 📁 Structure du projet

```
stripe-demo/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Page principale avec le bouton d'achat
│   │   ├── Success.jsx       # Page de succès après paiement
│   │   └── Cancel.jsx        # Page d'annulation
│   ├── App.jsx               # Routeur principal
│   └── main.jsx              # Point d'entrée
├── functions/
│   ├── index.js              # Firebase Function pour créer la session Stripe
│   └── package.json
├── firebase.json             # Configuration Firebase
├── .firebaserc               # Configuration projet Firebase
└── package.json
```

## 🔒 Sécurité

⚠️ **IMPORTANT** :
- Ne jamais exposer votre clé secrète Stripe (`sk_test_...`) côté client
- Utilisez toujours les variables d'environnement Firebase pour les clés secrètes
- Testez uniquement en mode Test avec des cartes de test

## 🐛 Débogage

### Voir les logs Firebase Functions

```bash
firebase functions:log
```

### Vérifier la configuration Firebase

```bash
firebase functions:config:get
```

### Erreurs courantes

- **"Invalid API Key"** : Vérifiez que votre clé secrète est bien configurée dans Firebase
- **"Function not found"** : Vérifiez que la fonction est bien déployée et que l'URL est correcte
- **"CORS error"** : Assurez-vous que CORS est bien configuré dans `functions/index.js`

## 📚 Ressources

- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Firebase Functions](https://firebase.google.com/docs/functions)
- [Stripe Test Cards](https://stripe.com/docs/testing)

## 🎯 Prochaines étapes

Une fois que ce projet fonctionne, vous pouvez :
- Ajouter plusieurs produits
- Ajouter la gestion de quantité
- Intégrer Firestore pour stocker les produits
- Ajouter des webhooks Stripe
- Créer un panier d'achat

## 📝 Notes

Ce projet est conçu pour l'apprentissage en mode test. Pour passer en production, vous devrez :
1. Obtenir vos clés Live depuis Stripe Dashboard
2. Mettre à jour la configuration Firebase avec les clés Live
3. Déployer l'application sur Firebase Hosting ou un autre service
4. Tester soigneusement avant de passer en production

