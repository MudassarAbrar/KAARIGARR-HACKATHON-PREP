'use client';

export default function RequestHeader({ step }: { step: number }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-icons-outlined text-white text-xl">architecture</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight uppercase font-display text-slate-900 dark:text-white">Karigar</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-slate-400 mb-1 font-display">Step {step} of 3</span>
          <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
