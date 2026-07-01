# FM Remix Forge Studio V32.2

Base V32 conservée avec correction propre du workflow GitHub Actions.

## Correction V32.2

- Suppression volontaire du `package-lock.json` car il contenait des URLs de registre internes non utilisables par GitHub Actions.
- Installation GitHub forcée depuis `https://registry.npmjs.org/`.
- Installation des dépendances avec `npm install --package-lock=false`.
- Conservation du code applicatif V32 et de l'interface en français.

## Commandes locales

```bash
npm install --package-lock=false
npm run check
npm run typecheck
npm run build
npm run dist:win
```
