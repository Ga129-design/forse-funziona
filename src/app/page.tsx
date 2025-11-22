import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ChiSiamo from '@/components/ChiSiamo';
import Candidati from '@/components/Candidati';
import Progetti from '@/components/Progetti';
import News from '@/components/News';
import Contattaci from '@/components/Contattaci';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <ChiSiamo />
      <Candidati />
      <Progetti />
      <News />
      <Contattaci />
      <Footer />
      <Analytics />
    </main>
  );
}
