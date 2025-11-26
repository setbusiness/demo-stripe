# 🔧 Solution à l'erreur 403 - Runtime Config

## Problème

L'erreur `403, Permission denied to get service [runtimeconfig.googleapis.com]` signifie que l'API Runtime Config n'est pas activée dans votre projet Google Cloud.

## ✅ Solution appliquée (Simple - pour test)

J'ai modifié `functions/index.js` pour utiliser directement la clé secrète dans le code. **C'est acceptable pour un projet de test/démo en mode test uniquement.**

### Ce qui a été fait

La clé secrète est maintenant directement dans le fichier `functions/index.js` avec un commentaire clair indiquant que c'est pour le test uniquement.

## 🚀 Prochaines étapes

Maintenant vous pouvez déployer directement :

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## 🔒 Alternative : Activer Runtime Config (pour production)

Si vous voulez utiliser la méthode sécurisée avec `functions.config()` (recommandé pour la production), vous devez :

### 1. Activer l'API Runtime Config

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Sélectionnez votre projet Firebase
3. Allez dans **APIs & Services** → **Library**
4. Recherchez "Cloud Runtime Configuration API"
5. Cliquez sur **Enable**

### 2. Donner les permissions nécessaires

1. Allez dans **IAM & Admin** → **IAM**
2. Trouvez votre compte utilisateur
3. Assurez-vous qu'il a le rôle **Editor** ou **Owner**

### 3. Réessayer la commande

```bash
firebase functions:config:set stripe.secret="sk_test_51SXdZYGqKSpED76emOyHqYQiGiTxCUIDjCkf4hzhzUOBPQvNeUFM8vaIHHrqYTmrU9zFfqQYMnOEhPQtp1vdmW0E00WStPxOek"
```

### 4. Modifier functions/index.js pour utiliser config

Si vous activez Runtime Config, remplacez dans `functions/index.js` :

```javascript
// Remplacer cette ligne :
const STRIPE_SECRET_KEY = 'sk_test_...'
const stripe = require('stripe')(STRIPE_SECRET_KEY)

// Par :
const stripe = require('stripe')(functions.config().stripe.secret)
```

## 💡 Recommandation

Pour ce projet de démonstration/test :
- ✅ La solution actuelle (clé en dur) est **parfaitement acceptable**
- ✅ Vous pouvez déployer et tester immédiatement
- ⚠️ Pour un projet en production, activez Runtime Config et utilisez `functions.config()`

