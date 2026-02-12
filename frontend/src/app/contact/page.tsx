'use client';

import PremiumNavigation from '@/components/PremiumNavigation';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <PremiumNavigation />
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-light uppercase tracking-widest mb-6">
                Get in Touch
            </h1>
            <p className="text-slate-500 font-display text-lg mb-12">
                Have a question or need support? We're here to help.
            </p>
            
             <form 
                onSubmit={(e) => { e.preventDefault(); console.log('Message sent!'); }}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 text-left space-y-6"
             >
                <div>
                    <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Name</label>
                    <input id="name" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
                    <input id="email" type="email" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Message</label>
                    <textarea id="message" rows={4} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-opacity-90 transition-opacity">
                    Send Message
                </button>
            </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
