import Link from 'next/link';

type SiteFooterProps = {
  note: string;
};

export default function SiteFooter({note}: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p>{note}</p>
      <p className="riot-disclaimer">Valorant Intelligence isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p>
      <nav aria-label="Informations légales">
        <Link href="/terms">Conditions d’utilisation</Link>
        <Link href="/privacy">Politique de confidentialité</Link>
        <Link href="/about">À propos</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
