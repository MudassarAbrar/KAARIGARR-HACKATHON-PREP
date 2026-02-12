'use client';

import { motion } from 'framer-motion';

const badges = [
  {
    icon: 'verified_user',
    title: 'Background Verified',
    subtitle: 'Safe and secure service',
  },
  {
    icon: 'workspace_premium',
    title: '5+ Years Experience',
    subtitle: 'Master of the craft',
  },
  {
    icon: 'task_alt',
    title: '98% Success Rate',
    subtitle: 'Consistently top-rated',
  },
  {
    icon: 'payments',
    title: 'Secure Payments',
    subtitle: 'Escrow protected billing',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 px-4 max-w-7xl mx-auto mt-24 md:mt-0">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors cursor-default"
        >
          <span className="material-icons-outlined text-primary text-3xl">{badge.icon}</span>
          <div>
            <p className="font-bold text-slate-900 dark:text-white leading-tight font-display text-sm md:text-base">{badge.title}</p>
            <p className="text-xs text-slate-500 font-display">{badge.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
