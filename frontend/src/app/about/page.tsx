import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import CoreValues from '@/components/about/CoreValues';
import StatsRow from '@/components/about/StatsRow';
import AboutMap from '@/components/about/AboutMap';
import JoinCommunity from '@/components/about/JoinCommunity';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Karigar | Our Story',
  description: 'Learn about the mission, vision, and craftsmanship behind Karigar - A premium hyperlocal marketplace.',
};

export default function AboutPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="bg-cream dark:bg-background-dark min-h-screen">
        <AboutHero />
        <OurStory />
        <CoreValues />
        <StatsRow />
        <AboutMap />
        <JoinCommunity />
      </main>
      <Footer />
    </>
  );
}
