// import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PremiumHeroSection from '@/components/home/PremiumHeroSection';
import PremiumNavigation from '@/components/PremiumNavigation';
// import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function Home() {
  return (
    <>
      <PremiumNavigation />
      {/* <Navigation /> */}
      <main className="overflow-x-hidden">
        <PremiumHeroSection />
        {/* <HeroSection /> */}
        <div className="relative z-20 bg-background-light dark:bg-background-dark">
            <ServicesSection />
            <HowItWorksSection />
            <TestimonialsSection />
        </div>
      </main>
      <Footer />
    </>
  );
}

