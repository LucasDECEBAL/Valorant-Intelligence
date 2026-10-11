import Link from 'next/link';
import SiteFooter from '../site-footer';

export const metadata = { title: 'Contact — Valorant Intelligence' };

export default function ContactPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Accueil</Link>
      <p className="eyebrow">Contact · coordonnées de l’exploitant</p>
      <h1>Contacter Valorant Intelligence</h1>
      <p>Valorant Intelligence est développé et exploité à titre personnel par Lucas DÉCÉBAL-DANGER, particulier résidant en France, en Île-de-France, dans le Val-d’Oise. Le projet est actuellement gratuit et sans publicité, abonnement ni paiement.</p>
      <p>Contact : <a href="mailto:lucasdecebaldanger09@gmail.com">lucasdecebaldanger09@gmail.com</a>.</p>
      <p className="legal-warning">Cette page ne comporte pas de formulaire et ne transmet aucun message. Adresse postale et autres mentions d’identification à publier : [À COMPLÉTER après vérification des obligations applicables et des options de protection de l’adresse personnelle].</p>
      <SiteFooter note="Exploitant en nom personnel : Lucas DÉCÉBAL-DANGER. Contact : lucasdecebaldanger09@gmail.com." />
    </main>
  );
}
