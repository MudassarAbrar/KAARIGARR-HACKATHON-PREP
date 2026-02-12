'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <h1 className="text-4xl font-display font-light uppercase tracking-widest mb-8 text-center no-underline">Cookie Policy</h1>
            
            <p className="mb-6 text-slate-600 dark:text-slate-400 font-display">
              We use cookies to improve your experience on our site, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.
            </p>

            <h3 className="text-xl font-bold mb-4 font-serif">What are cookies?</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400 font-display">
              Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences and understand how you interact with our platform.
            </p>

            <h3 className="text-xl font-bold mb-4 font-serif">Types of cookies we use</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600 dark:text-slate-400 font-display">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function correctly (e.g., authentication).</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (e.g., Google Analytics).</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements to you.</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 font-serif">Managing Cookies</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400 font-display">
              You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.
            </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
