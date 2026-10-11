import Link from 'next/link';
import SiteFooter from '../site-footer';

export const metadata = { title: 'À propos — Valorant Intelligence' };

export default function AboutPage() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Accueil</Link>
      <p className="eyebrow">Projet indépendant · démonstration</p>
      <h1>À propos de Valorant Intelligence</h1>
      <p>Valorant Intelligence est un projet communautaire développé à titre personnel par Lucas DÉCÉBAL-DANGER. Son objectif est de proposer gratuitement aux joueurs un outil d’analyse et de réflexion après les parties. Le projet ne prévoit actuellement ni publicité, ni abonnement, ni paiement. Cette description devra être mise à jour si le projet évolue.</p>

      <h2>État actuel</h2>
      <ul>
        <li>Le site est une démo publique accessible sans compte.</li>
        <li>Les profils, matchs, statistiques, comparaisons et succès affichés sont fictifs.</li>
        <li>Aucune API Riot ni Riot Sign On n’est intégrée; aucune statistique personnelle de joueur n’est récupérée.</li>
        <li>Le coach est une simulation à réponses préécrites, et non une véritable IA.</li>
        <li>Les préférences et le plan d’entraînement sont temporaires et ne sont pas sauvegardés durablement par l’application.</li>
        <li>Les inscriptions aux notifications ne sont pas ouvertes.</li>
      </ul>

      <h2>Éditeur et contact</h2>
      <p>Le site est développé et exploité à titre personnel par <strong>Lucas DÉCÉBAL-DANGER</strong>, particulier résidant en France, en Île-de-France, dans le Val-d’Oise. Aucune société ni micro-entreprise n’a été créée pour ce projet. Adresse postale et autres mentions d’identification à publier : <strong>[À COMPLÉTER après vérification des obligations applicables et des options de protection de l’adresse personnelle]</strong>. Contact : <a href="mailto:lucasdecebaldanger09@gmail.com">lucasdecebaldanger09@gmail.com</a>.</p>

      <SiteFooter note="Valorant Intelligence est exploité en nom personnel par Lucas DÉCÉBAL-DANGER; cette mention ne remplace pas les informations légales à compléter." />
    </main>
  );
}
