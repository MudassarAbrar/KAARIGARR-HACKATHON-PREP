'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <h1 className="text-4xl font-display font-light uppercase tracking-widest mb-8 text-center no-underline">Terms of Service</h1>
            <p>Welcome to Karigar. By using our services, you agree to the following terms...</p>
            <h3>1. Acceptance of Terms</h3>
            <p>Terms apply to all visitors, users, and others who access or use the Service.</p>
            <h3>2. Changes to Terms</h3>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>
            {/* Add more placeholder content as needed */}
        </div>
      </main>
      <Footer />
    </>
  );
}
