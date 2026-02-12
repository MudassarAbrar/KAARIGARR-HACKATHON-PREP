'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Total Users',
    value: '24,592',
    trend: '+12%',
    trendColor: 'text-emerald-500',
    icon: 'group',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500',
  },
  {
    label: 'Active Providers',
    value: '1,482',
    subVal: '8.2k total',
    icon: 'engineering',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    label: 'Pending Verifications',
    value: '24',
    alert: 'Action Required',
    icon: 'verified_user',
    iconBg: 'bg-orange-50 dark:bg-orange-900/20 text-orange-500',
    border: 'border-2 border-primary/20',
  },
  {
    label: 'Monthly Revenue',
    value: '$42,910',
    trend: '+4.5%',
    trendColor: 'text-emerald-500',
    icon: 'payments',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500',
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${
            stat.border || 'border border-slate-100 dark:border-slate-800'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className={`p-2 rounded-lg material-icons ${stat.iconBg}`}>{stat.icon}</span>
            {stat.trend && (
              <span className={`text-xs font-bold flex items-center ${stat.trendColor}`}>{stat.trend}</span>
            )}
            {stat.subVal && (
               <span className="text-xs font-bold text-slate-400 flex items-center">{stat.subVal}</span>
            )}
            {stat.alert && (
               <span className="animate-pulse text-xs font-bold text-orange-500">{stat.alert}</span>
            )}
          </div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider font-display">{stat.label}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">{stat.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
