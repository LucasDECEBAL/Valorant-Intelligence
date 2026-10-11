# Valorant Intelligence

Plateforme d'analyse compétitive en français. **Projet indépendant, non affilié à Riot Games.**

## Ce qui est livré
- Next.js App Router + TypeScript + Tailwind CSS.
- Landing page, dashboard fidèle à la maquette, statistiques, IA Coach heuristique et connexion UI.
- Fournisseur `DemoDataProvider` par défaut; `RiotDataProvider` est volontairement non activé tant que `RIOT_API_KEY` et les autorisations officielles ne sont pas vérifiées. Aucun endpoint Riot inventé.
- Prisma/PostgreSQL, schéma et seed démo.
- Tests Vitest sur agrégations et coach.

## Lancement local
```bash
npm install
cp .env.example .env
docker compose up -d
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```
Ouvrir http://localhost:3000. Le dashboard fonctionne en mode démo sans PostgreSQL; PostgreSQL est requis pour la persistance. Sous Windows, utiliser PowerShell (`Copy-Item .env.example .env`).

## Vérifications
`npm run typecheck`, `npm run lint`, `npm run build`, `npm test`.

## Données et sécurité
Les statistiques affichées en mode démo sont fictives et identifiées. La démo publique ne requiert ni compte utilisateur ni base PostgreSQL; la page de connexion reste une interface préparatoire. Ne jamais exposer une clé Riot ou un autre secret côté client.

## Déploiement Vercel — démo publique
Importer le dépôt dans Vercel et utiliser les commandes npm par défaut (`npm install`, `npm run build`). Aucun PostgreSQL ni secret d'authentification n'est requis pour le mode démo. Définir `DATA_PROVIDER=mock` dans les variables d'environnement Vercel ou laisser la valeur par défaut. Ne pas configurer `RIOT_API_KEY` pour cette version; sa présence ne sélectionne pas le fournisseur Riot. Ne lancer ni migration Prisma ni seed pour ce déploiement. Prisma, PostgreSQL, le schéma et les migrations restent disponibles pour une évolution ultérieure.

## Structure
`app/` pages, `lib/` analytics/coach/demo, `services/` fournisseurs, `prisma/` schéma/seed, `tests/` unitaires.
