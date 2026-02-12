'use client';

export default function PerformanceAnalytics() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // Simplified heights for bars to match image visually
  const barHeights = ['40%', '60%', '45%', '85%', '55%', '70%', '50%'];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Performance Analytics</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-display text-slate-800 dark:text-slate-200">Week</button>
          <button className="px-3 py-1 text-xs font-bold text-slate-400 font-display hover:text-slate-600 dark:hover:text-slate-300">Month</button>
        </div>
      </div>
      <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-end px-6 pb-10 justify-between">
            {barHeights.map((height, i) => (
                <div key={i} className={`w-8 sm:w-12 rounded-t-lg transition-all duration-500 ${i === 3 ? 'bg-primary relative' : 'bg-primary/20'}`} style={{ height }}>
                     {i === 3 && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold font-display">₹12.4k</div>
                     )}
                </div>
            ))}
        </div>
        <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
            {days.map(day => <span key={day}>{day}</span>)}
        </div>
      </div>
    </div>
  );
}
