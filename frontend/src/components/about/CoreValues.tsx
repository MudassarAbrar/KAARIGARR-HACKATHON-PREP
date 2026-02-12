'use client';

import { motion } from 'framer-motion';

const values = [
  {
    icon: 'verified_user',
    title: 'Verified Professionals',
    description: 'Rigorous background checks and portfolio reviews ensure only the finest talent enters our network.',
  },
  {
    icon: 'payments',
    title: 'Transparent Pricing',
    description: 'No hidden fees or unexpected costs. We believe in honest value for exceptional craftsmanship.',
  },
  {
    icon: 'workspace_premium',
    title: 'Quality Assurance',
    description: 'Every project is backed by our quality guarantee, ensuring the results meet architectural standards.',
  },
  {
    icon: 'location_on',
    title: 'Local Focus',
    description: 'Empowering neighborhood economies by keeping specialized talent within the local ecosystem.',
  },
];

export default function CoreValues() {
  return (
    <section className="py-32 px-6 bg-cream dark:bg-background-dark text-charcoal dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-light uppercase tracking-widest mb-4 font-serif"
          >
            The Foundation of Trust
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-charcoal/60 dark:text-white/60 max-w-xl mx-auto font-display"
          >
            Built on four pillars of service excellence and local commitment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-charcoal p-10 rounded-xl border border-charcoal/5 dark:border-white/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 group shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span className="material-icons text-4xl text-primary/40 group-hover:text-primary transition-colors mb-8 block">
                {value.icon}
              </span>
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider font-display">
                {value.title}
              </h3>
              <p className="text-sm text-charcoal/60 dark:text-white/60 leading-relaxed font-display">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
