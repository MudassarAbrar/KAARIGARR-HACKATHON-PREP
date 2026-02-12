'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';

export default function SafetyPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
             <h1 className="text-4xl font-display font-light uppercase tracking-widest mb-12 text-center">Safety Guidelines</h1>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-primary">
                    <h3 className="font-bold text-lg mb-2">Verified Professionals</h3>
                    <p className="text-slate-500 text-sm">Always ensure you are booking a verified provider with the blue checkmark.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-amber-500">
                    <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
                    <p className="text-slate-500 text-sm">Never transfer money outside the Karigar platform to ensure buyer protection.</p>
                </div>
             </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
