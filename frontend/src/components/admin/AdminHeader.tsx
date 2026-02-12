'use client';

export default function AdminHeader() {
  return (
    <header className="h-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-10 transition-colors duration-300">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Administrative Overview</h2>
        <p className="text-xs text-slate-500 font-display">Welcome back, Marcus. Here's what's happening today.</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer">
          <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">notifications</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white dark:border-background-dark rounded-full"></span>
        </div>
        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all font-display shadow-lg shadow-primary/20">
          <span className="material-icons text-sm">add</span>
          Generate Report
        </button>
      </div>
    </header>
  );
}
