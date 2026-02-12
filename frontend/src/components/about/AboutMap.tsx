'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutMap() {
  return (
    <section className="py-32 px-6 bg-white dark:bg-charcoal text-charcoal dark:text-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-light uppercase tracking-widest mb-4 font-serif"
        >
          Find us across the city
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-charcoal/60 dark:text-white/60 font-display"
        >
          Expanding our footprint to serve more communities every day.
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto h-[400px] rounded-2xl overflow-hidden grayscale brightness-90 relative shadow-2xl"
      >
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9t5AzyalalsTOsoSj1nd0hZ_XecDqxQt0TqAdJ_UfKj25Xj9YzCtA7lb4YOAV9YTjWQRTndnHeususynLYL7maof4VxDgyAH6FDVU8_ZqMHqfUk_KwHSbOMRJJAGRKpLsXMpCHEdhAVijQZz9T9sA7C3x2P-WQAjAQr5QUcCueeS0IFxK7xo57wuN7eeNdHKNPX9I_XRzrHdybROD4lOsAKH1jLkAFQ-oEaEfTJ3BjGc5qe5aRDxI7uCh7F3fpO3Yy_H_-7mEd0PL"
          alt="Service Area Map"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
      </motion.div>
    </section>
  );
}
