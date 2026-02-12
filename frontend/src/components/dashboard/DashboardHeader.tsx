'use client';

import { motion } from 'framer-motion';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function DashboardHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-10 py-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 text-slate-500 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <span className="material-icons-outlined">menu</span>
          </button>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-display">Dashboard Overview</h2>
            <p className="hidden md:block text-sm text-slate-500 dark:text-slate-400 font-display">Welcome back, Marcus. Here's what's happening with your projects.</p>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input 
              className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-display transition-all" 
              placeholder="Search tasks, artisans..." 
              type="text"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2 text-slate-500 hover:text-primary transition-colors bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg relative hover:shadow-sm">
              <span className="material-icons-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
