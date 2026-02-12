'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function PremiumNavigation() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-cream/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-charcoal/5 dark:border-white/5"
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-primary">
          Karigar
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-10">
        <Link href="/services" className="text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors font-display">Services</Link>
        <Link href="/portfolios" className="text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors font-display">Portfolios</Link>
        <Link href="/about" className="text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors font-display">Company</Link>
        <Link href="/contact" className="text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors font-display">Inquiry</Link>
      </div>
      
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <Link href="/auth?tab=login">
          <button className="text-xs uppercase tracking-widest font-bold font-display hover:text-primary transition-colors">Login</button>
        </Link>
        <Link href="/auth?tab=register">
          <button className="bg-primary text-slate-900 px-6 py-2.5 rounded text-xs uppercase tracking-widest font-bold hover:bg-blue-400 transition-all shadow-lg shadow-primary/20 font-display">
            Join Now
          </button>
        </Link>
      </div>
    </motion.nav>
  );
}
