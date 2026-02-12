'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="pt-48 pb-32 px-6 bg-cream text-charcoal dark:bg-background-dark dark:text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-6 block font-display"
        >
          Est. 2024
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-[0.2em] md:tracking-[0.4em] mb-12 text-charcoal dark:text-white font-serif"
        >
          A b o u t  K a r i g a r
        </motion.h1>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-px bg-primary mx-auto mb-16"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed text-charcoal/70 dark:text-white/70 font-display">
            Connecting modern communities with the timeless precision of local craftsmanship through a refined hyperlocal marketplace.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
