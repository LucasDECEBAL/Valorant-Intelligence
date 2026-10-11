import Link from 'next/link';
import SiteFooter from '../site-footer';

export const metadata = { title: 'Contact — Valorant Intelligence' };

export default function ContactPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Accueil</Link>
      <p className="eyebrow">Contact · coordonnées de l’exploitant</p>
      <h1>Contacter Valorant Intelligence</h1>
      <p>Le site est exploité à titre professionnel en nom personnel par Lucas DÉCÉBAL-DANGER, établi en France, en Île-de-France, dans le Val-d’Oise.</p>
      <p>Contact : <a href="mailto:lucasdecebaldanger09@gmail.com">lucasdecebaldanger09@gmail.com</a>.</p>
      <p className="legal-warning">Cette page ne comporte pas de formulaire et ne transmet aucun message. Adresse postale complète et statut juridique précis : [À COMPLÉTER ou confirmer leur applicabilité après vérification juridique].</p>
      <SiteFooter note="Exploitant en nom personnel : Lucas DÉCÉBAL-DANGER. Contact : lucasdecebaldanger09@gmail.com." />
    </main>
  );
}
