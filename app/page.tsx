import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
// import VideoSection from '@/components/VideoSection';
import CTASection from '@/components/CTASection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SocialSection from '@/components/SocialSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      {/* <VideoSection /> */}
      <CTASection />
      <div id="about"><AboutSection /></div>
      <TestimonialsSection />
      <SocialSection />
      <div id="contact"><ContactSection /></div>
      <Footer />
    </main>
  );
}