'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BecomeProviderPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest mb-6">
                Join as a Provider
            </h1>
            <p className="text-slate-500 font-display text-lg mb-12">
                Showcase your craft to thousands of customers looking for premium services.
            </p>
            <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl shadow-xl border border-dashed border-primary/30">
                <span className="material-icons text-6xl text-primary mb-4" aria-hidden="true">handyman</span>
                <h2 className="text-2xl font-bold mb-4">Start Your Journey</h2>
                <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                    Registration takes less than 5 minutes. Get verified and start earning.
                </p>
                <Link href="/auth?tab=register" className="inline-block bg-primary text-slate-900 font-bold uppercase tracking-widest px-8 py-4 rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    Register Now
                </Link>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
