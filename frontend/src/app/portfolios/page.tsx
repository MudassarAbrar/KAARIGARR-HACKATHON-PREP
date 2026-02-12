'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';

export default function PortfoliosPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest mb-6">
                Our Portfolios
            </h1>
            <p className="text-slate-500 font-display text-lg mb-12 max-w-2xl mx-auto">
                Discover the architectural mastery of our top-rated artisans.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800 h-64 flex items-center justify-center">
                        <span className="text-slate-400 font-display">Portfolio Item {item}</span>
                    </div>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
