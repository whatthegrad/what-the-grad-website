import HeroSection from '@/components/HeroSection';
import PsychometricSection from '@/components/PsychometricSection';
import StudyAbroadMap from '@/components/StudyAbroadMap';
import ServicesSection from '@/components/ServicesSection';
// import VideoSection from '@/components/VideoSection';
import CTASection from '@/components/CTASection';
import FoundersSection from '@/components/FoundersSection';
import SocialSection from '@/components/SocialSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PsychometricSection />
      <StudyAbroadMap />
      <ServicesSection />
      {/* <VideoSection /> */}
      <CTASection />
      <FoundersSection />
      <SocialSection />
      <div id="contact"><ContactSection /></div>
      <Footer />
    </main>
  );
}