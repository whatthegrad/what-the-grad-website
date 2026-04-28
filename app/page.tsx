import HeroSection from '@/components/HeroSection';
import CTASection from '@/components/CTASection';
import AboutSection from '@/components/AboutSection';
import SocialSection from '@/components/SocialSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CTASection />
      <div id="about"><AboutSection /></div>
      <SocialSection />
      <div id="contact"><ContactSection /></div>
      <Footer />
    </main>
  );
}