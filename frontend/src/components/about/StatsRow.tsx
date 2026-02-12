'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Providers', value: '500+' },
  { label: 'Categories', value: '15' },
  { label: 'Completions', value: '10K+' },
  { label: 'Satisfaction', value: '98%' },
];

export default function StatsRow() {
  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/10 px-6 border-y border-primary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-5xl font-extralight text-primary mb-2 font-display">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/60 dark:text-white/60 font-display">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
