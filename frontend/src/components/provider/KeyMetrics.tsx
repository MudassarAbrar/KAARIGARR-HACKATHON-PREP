'use client';

import { motion } from 'framer-motion';

const metrics = [
  {
    label: 'Total Earnings',
    value: '₹48,250',
    trend: '12%',
    trendIcon: 'trending_up',
    trendColor: 'text-emerald-500',
  },
  {
    label: 'Pending Requests',
    value: '05',
    badge: 'URGENT',
    badgeColor: 'bg-primary/20 text-primary',
  },
  {
    label: 'Completed Jobs',
    value: '124',
    subtext: 'Lifetime',
  },
  {
    label: 'Average Rating',
    value: '4.9',
    icon: 'star',
    iconColor: 'text-amber-400',
    subtext: '98 Reviews',
  },
];

export default function KeyMetrics() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium font-display">{metric.label}</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-extrabold flex items-center gap-1 font-display text-slate-900 dark:text-white">
                {metric.value} 
                {metric.icon && <span className={`material-icons-round text-xl ${metric.iconColor}`}>{metric.icon}</span>}
            </h3>
            
            {metric.trend && (
              <span className={`${metric.trendColor} text-xs font-bold flex items-center mb-1 font-display`}>
                <span className="material-icons-round text-sm mr-1">{metric.trendIcon}</span> {metric.trend}
              </span>
            )}
            
            {metric.badge && (
              <span className={`${metric.badgeColor} px-2 py-0.5 rounded text-[10px] font-bold tracking-wider mb-1 font-display`}>{metric.badge}</span>
            )}
            
            {metric.subtext && (
              <span className="text-slate-400 dark:text-slate-500 text-xs font-medium mb-1 font-display">{metric.subtext}</span>
            )}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
