# 🔐 Configuration Firebase Functions

## ✅ Clé secrète déjà configurée !

La clé secrète Stripe est déjà configurée directement dans `functions/index.js` pour simplifier le déploiement.

⚠️ **Note** : Pour un projet de test/démo, c'est acceptable. Pour la production, utilisez `functions.config()` (voir `SOLUTION_ERREUR_403.md`).

## Étape 1 : Installer les dépendances Functions

```bash
cd functions
npm install
cd ..
```

## Étape 2 : Déployer la fonction

```bash
firebase deploy --only functions
```

## Étape 3 : Copier l'URL de la fonction

Après le déploiement, vous verrez une URL comme :
```
Function URL (createCheckoutSession): https://us-central1-XXXXX.cloudfunctions.net/createCheckoutSession
```

**Copiez cette URL complète** et mettez-la à jour dans `src/pages/Home.jsx` à la ligne 16.

## ⚠️ Important

- La clé secrète est configurée dans `functions/index.js` (côté serveur uniquement)
- Ne la mettez JAMAIS dans le code React
- Elle est uniquement accessible côté serveur (Firebase Functions)
- Pour la production, consultez `SOLUTION_ERREUR_403.md` pour utiliser `functions.config()`

