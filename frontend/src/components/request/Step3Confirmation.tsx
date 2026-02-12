'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Step3Confirmation() {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-background-light/95 dark:bg-background-dark/95 z-50 flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
          <span className="material-icons-outlined text-primary text-5xl">done_all</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold uppercase tracking-widest font-display text-slate-900 dark:text-white">Request Confirmed</h2>
          <p className="text-slate-500 font-display">Your artisan is being notified. You will receive a confirmation within 15 minutes.</p>
        </div>
        <Link href="/dashboard" className="block w-full py-4 bg-primary text-white rounded-lg font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20 font-display">
            Track Status
        </Link>
      </div>
    </motion.div>
  );
}
