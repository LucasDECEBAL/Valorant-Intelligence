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
Les statistiques affichées en mode démo sont fictives et identifiées. Les mots de passe ne sont pas encore persistés dans cette première tranche : la page de connexion est un écran préparatoire; brancher Auth.js Credentials avec hash Argon2/bcrypt avant production. Toute requête privée doit être autorisée côté serveur. Ne jamais mettre une clé Riot dans le frontend.

## Déploiement
Sur Vercel, définir `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET` et éventuellement `RIOT_API_KEY`, connecter un PostgreSQL hébergé, puis exécuter `npx prisma migrate deploy` et `npm run prisma:seed` depuis un environnement contrôlé. Prévoir sauvegardes, logs sans secrets, revue RGPD et validation des accès Riot avant activation.

## Structure
`app/` pages, `lib/` analytics/coach/demo, `services/` fournisseurs, `prisma/` schéma/seed, `tests/` unitaires.
