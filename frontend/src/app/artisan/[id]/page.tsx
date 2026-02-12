import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';
import ArtisanHero from '@/components/artisan/ArtisanHero';
import TrustBadges from '@/components/artisan/TrustBadges';
import AboutPortfolio from '@/components/artisan/AboutPortfolio';
import Reviews from '@/components/artisan/Reviews';
import ServicesPricing from '@/components/artisan/ServicesPricing';
import Availability from '@/components/artisan/Availability';
import ServiceMap from '@/components/artisan/ServiceMap';
import RelatedProviders from '@/components/artisan/RelatedProviders';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// In a real application, you would fetch artisan data here

async function fetchArtisan(id: string) {
  // Mock data fetching
  if (!id) return null;
  return {
    id,
    name: 'Arjun Sharma',
    role: 'Master Carpenter',
    rating: 4.9,
    reviews: 124,
    location: 'South Delhi',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocFV...' 
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const artisan = await fetchArtisan(resolvedParams.id);
  
  if (!artisan) {
    return {
      title: 'Artisan Not Found | Karigar Marketplace'
    };
  }

  return {
    title: `${artisan.name} - ${artisan.role} | Karigar Marketplace`,
    description: `Book ${artisan.name} for bespoke services in ${artisan.location}.`,
  };
}

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const artisan = await fetchArtisan(resolvedParams.id);

  if (!artisan) {
    notFound();
  }

  return (
    <>
      <PremiumNavigation />
      <main className="bg-background-light dark:bg-background-dark min-h-screen pt-24 md:pt-28 pb-12 px-6">
        <ArtisanHero artisan={artisan} />
        <TrustBadges />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Left Column: Bio, Portfolio, Reviews */}
           <div className="lg:col-span-2 space-y-16">
              <AboutPortfolio artisan={artisan} />
              <Reviews artisan={artisan} />
           </div>
           
           {/* Right Column: Pricing, Calendar, Map */}
           <div className="space-y-12">
              <ServicesPricing artisan={artisan} />
              <Availability artisan={artisan} />
              <ServiceMap artisan={artisan} />
           </div>
        </div>

        <RelatedProviders currentArtisanId={artisan.id} />
      </main>
      <Footer />
    </>
  );
}
