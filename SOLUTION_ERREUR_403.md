# 🔧 Solution à l'erreur 403 - Runtime Config

## Problème

L'erreur `403, Permission denied to get service [runtimeconfig.googleapis.com]` signifie que l'API Runtime Config n'est pas activée dans votre projet Google Cloud.

## ✅ Solution appliquée (Simple - pour test)

Le code utilise maintenant un fichier local `config.local.js` pour stocker la clé secrète. **Ce fichier n'est pas versionné et reste local.**

### Ce qui a été fait

1. Le code essaie d'abord `functions.config()` (méthode recommandée)
2. Sinon, il utilise une variable d'environnement `STRIPE_SECRET_KEY`
3. En dernier recours, il charge depuis `functions/config.local.js` (pour développement local)

## 🚀 Configuration rapide (pour test local)

### Option 1 : Fichier local (recommandé pour développement)

1. Copiez le fichier d'exemple :
```bash
cd functions
cp config.local.example.js config.local.js
```

2. Éditez `config.local.js` et ajoutez votre clé secrète :
```javascript
module.exports = {
  stripeSecretKey: 'sk_test_VOTRE_CLE_SECRETE'
}
```

3. Le fichier `config.local.js` est dans `.gitignore` et ne sera pas versionné.

### Option 2 : Variable d'environnement

```bash
export STRIPE_SECRET_KEY="sk_test_VOTRE_CLE_SECRETE"
```

### Option 3 : Firebase Config (pour déploiement)

```bash
firebase functions:config:set stripe.secret="sk_test_VOTRE_CLE_SECRETE"
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
firebase functions:config:set stripe.secret="sk_test_VOTRE_CLE_SECRETE"
```

Remplacez `sk_test_VOTRE_CLE_SECRETE` par votre vraie clé secrète.

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

