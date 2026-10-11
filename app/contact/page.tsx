import Link from 'next/link';
import SiteFooter from '../site-footer';

export const metadata = { title: 'Contact — Valorant Intelligence' };

export default function ContactPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Accueil</Link>
      <p className="eyebrow">Contact · brouillon à compléter</p>
      <h1>Contacter Valorant Intelligence</h1>
      <p>Aucun formulaire d’envoi n’est proposé sur cette page et aucune coordonnée de contact vérifiée n’a été trouvée dans le projet.</p>
      <p className="legal-warning"><strong>Avant publication, l’exploitant doit fournir un moyen de contact réel et surveillé :</strong> [À COMPLÉTER : adresse email ou autre coordonnée de contact]. Cette page ne collecte ni ne transmet de message.</p>
      <SiteFooter note="Exploitant en nom personnel : Lucas DÉCÉBAL-DANGER. Coordonnées de contact à fournir avant publication." />
    </main>
  );
}
