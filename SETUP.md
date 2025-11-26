# 🚀 Guide de configuration rapide

## Étape par étape pour débutants

### 1️⃣ Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte gratuit
3. Accédez au [Dashboard](https://dashboard.stripe.com)
4. **Assurez-vous que le Mode Test est activé** (toggle en haut à droite)

### 2️⃣ Obtenir vos clés API Stripe

1. Dans le Dashboard Stripe, allez dans **Developers** → **API Keys**
2. Vous verrez deux clés :
   - **Publishable key** : `pk_test_...` → **À utiliser dans React**
   - **Secret key** : `sk_test_...` → **À utiliser dans Firebase Functions**

⚠️ **Ne partagez JAMAIS votre clé secrète !**

### 3️⃣ Créer un projet Firebase

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquez sur **Ajouter un projet**
3. Donnez un nom (ex: "stripe-demo")
4. Suivez les étapes de création

### 4️⃣ Installer Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 5️⃣ Initialiser Firebase dans le projet

```bash
firebase init functions
```

Répondez aux questions :
- Sélectionnez votre projet Firebase
- Langage : **JavaScript**
- ESLint : **Oui** (recommandé)
- Installer les dépendances : **Oui**

### 6️⃣ Configurer la clé secrète Stripe dans Firebase

```bash
firebase functions:config:set stripe.secret="sk_test_VOTRE_CLE_SECRETE_ICI"
```

Remplacez `sk_test_VOTRE_CLE_SECRETE_ICI` par votre vraie clé secrète.

### 7️⃣ Déployer la fonction Firebase

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

Après le déploiement, vous verrez une URL comme :
```
https://us-central1-VOTRE-PROJET.cloudfunctions.net/createCheckoutSession
```

**Copiez cette URL !** Vous en aurez besoin pour React.

### 8️⃣ Configurer React

1. Ouvrez `src/pages/Home.jsx`
2. Remplacez `pk_test_VOTRE_CLE_PUBLIQUE_ICI` par votre clé publique Stripe
3. Remplacez `https://VOTRE_FUNCTION_URL/createCheckoutSession` par l'URL de votre fonction

### 9️⃣ Installer et lancer React

```bash
npm install
npm run dev
```

L'application devrait s'ouvrir sur `http://localhost:5173`

### 🔟 Tester le paiement

1. Cliquez sur "Acheter le T-shirt"
2. Utilisez la carte de test :
   - Numéro : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : `123`
3. Complétez le paiement
4. Vous devriez être redirigé vers la page de succès !

## ✅ Vérification

- [ ] Compte Stripe créé
- [ ] Clés API copiées (publique et secrète)
- [ ] Projet Firebase créé
- [ ] Firebase CLI installé et connecté
- [ ] Firebase Functions initialisées
- [ ] Clé secrète configurée dans Firebase
- [ ] Fonction déployée
- [ ] URL de fonction copiée
- [ ] Clé publique et URL configurées dans React
- [ ] Application React lancée
- [ ] Paiement testé avec succès

## 🆘 Besoin d'aide ?

Si vous rencontrez des erreurs :

1. **Vérifiez les logs Firebase** :
   ```bash
   firebase functions:log
   ```

2. **Vérifiez votre configuration** :
   ```bash
   firebase functions:config:get
   ```

3. **Vérifiez la console du navigateur** (F12) pour les erreurs côté client

4. **Vérifiez le Dashboard Stripe** pour voir si la session a été créée

