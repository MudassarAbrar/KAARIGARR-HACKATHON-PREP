'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';

import { useState } from 'react';

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: 'How to verify my account?', answer: 'Go to Settings > Verification and upload your ID documents. Verification usually takes 24-48 hours.' },
    { question: 'Payment security', answer: 'We use Stripe for secure payments. Your card details are never stored on our servers.' },
    { question: 'Booking a service', answer: 'Browse artisans, select a service, choose a time slot, and confirm your booking with payment.' },
    { question: 'Cancellation policy', answer: 'You can cancel up to 24 hours before the appointment for a full refund.' }
  ];

  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display font-light uppercase tracking-widest mb-12 text-center">Help Center</h1>
            <div className="grid gap-6">
                {faqs.map((faq, i) => (
                    <div 
                      key={i} 
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <button className="w-full text-left font-bold text-lg mb-2 flex justify-between items-center bg-transparent focus:outline-none" aria-expanded={openIndex === i}>
                            {faq.question}
                            <span className={`material-icons text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        {openIndex === i && (
                          <div className="mt-4 text-slate-600 dark:text-slate-400 font-display leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                            {faq.answer}
                          </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
