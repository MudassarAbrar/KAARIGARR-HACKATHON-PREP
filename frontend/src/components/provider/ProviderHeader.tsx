'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function ProviderHeader() {
  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">Welcome back, Rahul</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-display">Here's what's happening with your services today.</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-display text-slate-700 dark:text-slate-300">
          <span className="material-icons-round text-lg">event_available</span>
          Update Availability
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-slate-900 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all font-display">
          <span className="material-icons-round text-lg">add</span>
          Manage Services
        </button>
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2"></div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative hover:text-primary transition-colors">
            <span className="material-icons-round">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
