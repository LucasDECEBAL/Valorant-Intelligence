import './globals.css';
import SiteBackground from '../components/site-background';
export const metadata={title:'Valorant Intelligence',description:'Analyse. Progresse. Surpasse-toi.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" suppressHydrationWarning><body><SiteBackground />{children}</body></html>}