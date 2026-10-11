import Link from 'next/link';
import SiteFooter from '../site-footer';

export const metadata = { title: 'Confidentialité — Valorant Intelligence' };

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Accueil</Link>
      <p className="eyebrow">Projet à compléter et vérifier juridiquement</p>
      <h1>Politique de confidentialité</h1>
      <p className="legal-warning">Cette page décrit des constats faits dans le code de la démo. Elle ne vaut pas confirmation des traitements de Vercel, de Google ou d’autres prestataires. Les éléments restant entre crochets et les obligations applicables doivent être vérifiés avant finalisation.</p>

      <h2>1. Responsable du traitement</h2>
      <p><strong>Lucas DÉCÉBAL-DANGER, exploitation professionnelle en nom personnel</strong>, établi en France, en Île-de-France, dans le Val-d’Oise. Statut juridique précis, adresse postale complète et éventuelles informations sur un représentant : <strong>[À COMPLÉTER ou confirmer leur applicabilité après vérification juridique]</strong>. Point de contact pour les questions de confidentialité : <a href="mailto:lucasdecebaldanger09@gmail.com">lucasdecebaldanger09@gmail.com</a>.</p>

      <h2>2. Fonctionnement confirmé de la démo</h2>
      <ul>
        <li>Les profils, matchs et statistiques affichés sont des données fictives; ils ne proviennent pas d’un compte VALORANT connecté.</li>
        <li>La page de connexion est un accès à la démo et ne demande ni email ni mot de passe.</li>
        <li>Le chat du coach et les cases du plan d’entraînement sont conservés dans l’état temporaire de la page selon le code examiné; l’application ne les envoie pas à un serveur et ne les enregistre pas durablement.</li>
        <li>Les préférences de démonstration sont temporaires. Aucune inscription aux notifications n’est ouverte.</li>
        <li>Aucune intégration Riot API ou Riot Sign On n’est implémentée dans cette version.</li>
      </ul>

      <h2>3. Hébergement et services tiers à vérifier</h2>
      <p>Le site est hébergé sur Vercel. Les journaux, données techniques, durées de conservation, éventuels cookies et autres traitements opérés par Vercel ne sont pas déterminés par le seul code de l’application et doivent être confirmés à partir de la configuration et des documents du fournisseur.</p>
      <p>Le code charge les polices depuis Google Fonts. Le navigateur contacte donc un service externe pour cette ressource. Les données techniques transmises, les éventuels cookies, les transferts et les conditions du fournisseur doivent être vérifiés séparément avant de décrire ce traitement comme complet.</p>
      <p>Aucun outil d’analyse d’audience ou mécanisme de stockage navigateur applicatif n’a été trouvé dans le code examiné. Cela ne permet pas de conclure qu’aucun journal ou traitement technique n’existe chez les fournisseurs.</p>

      <h2>4. Cookies et traceurs</h2>
      <p>Aucun mécanisme applicatif de cookie ou de traceur n’a été trouvé lors de l’examen du code. La présence éventuelle de cookies ou traceurs déposés par l’hébergement, les polices ou des outils tiers reste à vérifier dans le navigateur et auprès des fournisseurs. <strong>[À COMPLÉTER après vérification : inventaire des traceurs, finalités, base applicable et choix de consentement requis]</strong>.</p>

      <h2>5. Données Riot Games</h2>
      <p>La démo actuelle ne récupère aucune statistique personnelle Riot. Toute future fonctionnalité affichant les données personnelles d’un joueur devra être conçue autour d’un consentement explicite via Riot Sign On et des règles d’opt-in de Riot; elle n’est pas disponible aujourd’hui.</p>

      <h2>6. Droits, demandes et durée de conservation</h2>
      <p>Les modalités de demande d’accès, de rectification, d’effacement ou d’exercice d’autres droits, ainsi que les durées de conservation applicables, ne peuvent être finalisées avant identification de l’exploitant et vérification des traitements des fournisseurs. <strong>[À COMPLÉTER après examen juridique et fournisseurs : procédure, contact et durées exactes]</strong>.</p>

      <p>Conditions d’utilisation : consultez la <Link href="/terms">page dédiée aux conditions d’utilisation</Link>.</p>
      <p className="legal-updated">Dernière mise à jour : 11/10/2026 (date de publication déclarée par l’exploitant; à confirmer avant mise en ligne de cette version).</p>
      <SiteFooter note="Politique provisoire · Responsable indiqué en nom personnel : Lucas DÉCÉBAL-DANGER." />
    </main>
  );
}
