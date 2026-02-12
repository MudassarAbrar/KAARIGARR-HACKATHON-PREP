'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Total Requests',
    value: '24',
    trend: '+12% this month',
    trendIcon: 'trending_up',
    trendColor: 'text-emerald-500',
    icon: 'assignment',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    label: 'Pending Actions',
    value: '03',
    trend: 'Requires attention',
    trendIcon: 'schedule',
    trendColor: 'text-amber-500',
    icon: 'pending_actions',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
  {
    label: 'Completed Jobs',
    value: '21',
    trend: '98% satisfaction rate',
    trendIcon: 'verified',
    trendColor: 'text-emerald-500',
    icon: 'task_alt',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
  },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
        >
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 font-display">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white font-display">{stat.value}</h3>
            <p className={`text-xs font-medium mt-1 flex items-center gap-1 font-display ${stat.trendColor}`}>
              <span className="material-icons-outlined text-[14px]">{stat.trendIcon}</span> {stat.trend}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
            <span className="material-icons-outlined">{stat.icon}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
