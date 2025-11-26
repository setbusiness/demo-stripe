# 🚀 Démarrage rapide

## Configuration de la clé secrète Stripe

Pour que le projet fonctionne, vous devez configurer votre clé secrète Stripe. **Choisissez UNE des méthodes suivantes :**

### Méthode 1 : Fichier local (⭐ Recommandé pour développement)

1. Copiez le fichier d'exemple :
```bash
cd functions
cp config.local.example.js config.local.js
```

2. Éditez `config.local.js` et remplacez `VOTRE_CLE_SECRETE_ICI` par votre vraie clé :
```javascript
module.exports = {
  stripeSecretKey: 'sk_test_51SXdZYGqKSpED76emOyHqYQiGiTxCUIDjCkf4hzhzUOBPQvNeUFM8vaIHHrqYTmrU9zFfqQYMnOEhPQtp1vdmW0E00WStPxOek'
}
```

✅ **Avantage** : Simple, fonctionne immédiatement, fichier non versionné

### Méthode 2 : Firebase Config (pour déploiement)

```bash
firebase functions:config:set stripe.secret="sk_test_51SXdZYGqKSpED76emOyHqYQiGiTxCUIDjCkf4hzhzUOBPQvNeUFM8vaIHHrqYTmrU9zFfqQYMnOEhPQtp1vdmW0E00WStPxOek"
```

✅ **Avantage** : Sécurisé, recommandé pour la production

### Méthode 3 : Variable d'environnement

```bash
export STRIPE_SECRET_KEY="sk_test_51SXdZYGqKSpED76emOyHqYQiGiTxCUIDjCkf4hzhzUOBPQvNeUFM8vaIHHrqYTmrU9zFfqQYMnOEhPQtp1vdmW0E00WStPxOek"
```

## Installation et lancement

```bash
# 1. Installer les dépendances React
npm install

# 2. Installer les dépendances Functions
cd functions
npm install
cd ..

# 3. Configurer la clé secrète (voir ci-dessus)

# 4. Déployer la fonction Firebase
firebase deploy --only functions

# 5. Copier l'URL de la fonction et la mettre dans src/pages/Home.jsx ligne 16

# 6. Lancer l'application React
npm run dev
```

## ⚠️ Important

- Le fichier `config.local.js` est dans `.gitignore` et ne sera **jamais** versionné
- Ne commitez **jamais** votre clé secrète dans Git
- Utilisez toujours des clés de **test** (`sk_test_...`) pour le développement

