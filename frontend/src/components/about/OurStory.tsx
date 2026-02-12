'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OurStory() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-charcoal text-charcoal dark:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-primary/40 dark:border-primary/60 transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[500px]">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEM-TQdhUOroEkY72ri5raul0BKhPmnkVtWWW3XFlWD2AHQRI6E3B_kauvL_GlK3X6nwckMISDkZR5XNXhis-x4amN4YKuut04-UITZZIDinpkDvhwixkfYrRyjMZ3NDj_d84jpG-TN68bqDQxlmOTX8xSpBfMudH8AdkeR8FSY30ZCrg6M0eYTGyfmg8z42Evy_Z3tcKJmnX2x9AaDAIrpe-uFn4Ea-kVLAhHNFydPHfXEOGuhXb1mzUOh8cciXNV2ZSBjK5Ad9i2"
                  alt="Architectural precision of a modern workshop"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-primary/40 dark:border-primary/60 transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-light uppercase tracking-widest font-serif">Our Story</h2>
            <div className="space-y-6 text-charcoal/80 dark:text-white/80 leading-loose font-display font-light">
              <p>
                Karigar was born from a simple observation: the gap between high-demand specialized skills and the visibility of local artisans. We envisioned a platform where the architecture of commerce supports the foundation of craftsmanship.
              </p>
              <p>
                Named after the Persian word for "Artisan," Karigar is built on the principles of structural integrity and human connection. We curate a network of professionals who bring architectural precision to every task, whether it's restoration, installation, or bespoke creation.
              </p>
            </div>
            
            <div className="pt-4">
              <Link href="/#how-it-works" className="inline-flex items-center space-x-4 group">
                <span className="text-sm font-bold uppercase tracking-widest group-hover:text-primary transition-colors font-display">Learn about our process</span>
                <span className="material-icons text-primary group-hover:translate-x-2 transition-transform">east</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
