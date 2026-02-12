'use client';

import { motion } from 'framer-motion';

export default function JoinCommunity() {
  return (
    <section className="py-32 px-6 bg-charcoal text-white overflow-hidden relative">
      {/* Background Shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 skew-x-12 transform translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extralight uppercase tracking-widest mb-8 font-serif"
        >
          Join the Community
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto mb-12 text-lg font-display font-light"
        >
          Whether you are a master of your craft or looking for exceptional service, Karigar is the architectural bridge for your needs.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <button className="bg-primary hover:bg-white hover:text-primary text-charcoal px-10 py-4 rounded-lg font-bold uppercase tracking-widest transition-all w-full sm:w-auto shadow-lg hover:shadow-primary/20 font-display">
            Find an Artisan
          </button>
          <button className="border border-white/20 hover:border-primary px-10 py-4 rounded-lg font-bold uppercase tracking-widest transition-all w-full sm:w-auto font-display hover:text-primary hover:bg-white/5">
            Become a Provider
          </button>
        </motion.div>
      </div>
    </section>
  );
}
