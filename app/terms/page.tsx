import Link from 'next/link';
import SiteFooter from '../site-footer';

export const metadata = { title: 'Conditions d’utilisation — Valorant Intelligence' };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Accueil</Link>
      <p className="eyebrow">Brouillon à compléter avant publication</p>
      <h1>Conditions d’utilisation</h1>
      <p className="legal-warning">Ce document est un projet de rédaction, pas un texte juridique validé. Il ne doit pas être publié comme version définitive avant d’avoir complété les informations entre crochets et fait vérifier son applicabilité.</p>

      <h2>1. Exploitant du service</h2>
      <p>Le site Valorant Intelligence est exploité en nom personnel par <strong>Lucas DÉCÉBAL-DANGER</strong>. Statut et adresse : <strong>[À COMPLÉTER : informations applicables à confirmer avant publication]</strong>. Contact : <strong>[À COMPLÉTER : coordonnée de contact vérifiée]</strong>.</p>

      <h2>2. Service actuellement disponible</h2>
      <p>Le site propose une démonstration publique d’une interface d’analyse de performances VALORANT. Les statistiques, profils, matchs, succès et recommandations affichés dans cette démonstration sont fictifs. Le site ne propose actuellement ni connexion à un compte Riot, ni récupération de statistiques personnelles, ni inscription aux notifications.</p>

      <h2>3. Coach et préférences</h2>
      <p>Le coach est une simulation locale à réponses préécrites; il ne s’agit pas d’un service d’intelligence artificielle. Les réponses saisies, les préférences et le plan d’entraînement restent dans l’état temporaire de la page selon le code applicatif examiné; ils ne sont pas enregistrés durablement ni envoyés par l’application à un serveur. Les pratiques de l’hébergeur et du fournisseur de polices doivent être vérifiées séparément.</p>

      <h2>4. Utilisation de la démo</h2>
      <p>Ne saisissez pas de mot de passe, de donnée personnelle ou d’information confidentielle dans la démonstration. L’accès au tableau de bord ne crée pas de compte et n’établit pas de session utilisateur.</p>

      <h2>5. Propriété intellectuelle et relation avec Riot Games</h2>
      <p>Valorant Intelligence est un projet indépendant. Il n’est ni approuvé ni parrainé par Riot Games. Les marques et éléments associés à Riot Games restent la propriété de leurs détenteurs respectifs. Cette page ne constitue pas une autorisation d’utiliser leurs marques ou contenus.</p>

      <h2>6. Évolutions et validation</h2>
      <p>Ces conditions décrivent uniquement l’état actuel de la démo et devront être révisées avant l’ajout de comptes, de données Riot, de stockage, de communications ou de toute autre fonctionnalité. La version définitive et les règles impératives applicables restent à valider par l’exploitant avec un conseil juridique.</p>
      <p>Politique de confidentialité : consultez la <Link href="/privacy">page dédiée à la confidentialité</Link>.</p>

      <p className="legal-updated">Date d’entrée en vigueur : [À COMPLÉTER avant publication].</p>
      <SiteFooter note="Conditions provisoires · Exploitant en nom personnel : Lucas DÉCÉBAL-DANGER." />
    </main>
  );
}
