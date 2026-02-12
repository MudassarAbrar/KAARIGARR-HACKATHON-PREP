'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <h1 className="text-4xl font-display font-light uppercase tracking-widest mb-8 text-center no-underline">Privacy Policy</h1>
            <p>Your privacy is important to us. It is Karigar's policy to respect your privacy regarding any information we may collect from you across our website.</p>
            <h3>1. Information We Collect</h3>
            <p>We ask for personal information only when we truly need it to provide a service to you.</p>
            {/* Add more placeholder content as needed */}
        </div>
      </main>
      <Footer />
    </>
  );
}
