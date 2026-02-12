import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesSearch from '@/components/services/ServicesSearch';
import ServicesSidebar from '@/components/services/ServicesSidebar';
import FeaturedArtisans from '@/components/services/FeaturedArtisans';
import ArtisanGrid from '@/components/services/ArtisanGrid';


import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Services | Karigar Marketplace',
  description: 'Connect with skilled local artisans for home services, repairs, and custom projects.',
};

export default function ServicesPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="bg-background-light dark:bg-background-dark min-h-screen">
        <ServicesHero />
        <ServicesSearch />
        
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row gap-12">
                <ServicesSidebar />
                <section id="artisans" className="flex-1">
                    <FeaturedArtisans />
                    <ArtisanGrid />
                </section>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
