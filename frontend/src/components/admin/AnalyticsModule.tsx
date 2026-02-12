'use client';

const completionStats = [
  { label: 'Electrical Repairs', value: 82, color: 'bg-primary' },
  { label: 'Plumbing', value: 64, color: 'bg-primary/60' },
  { label: 'AC Servicing', value: 91, color: 'bg-primary' },
  { label: 'House Painting', value: 45, color: 'bg-primary/30' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export default function AnalyticsModule() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Revenue Trends */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-900 dark:text-white mb-6 font-display">Revenue Trends</h3>
        <div className="h-48 flex items-end justify-between gap-1">
            {[40, 65, 50, 85, 75, 95].map((height, i) => (
                <div key={i} className="w-full bg-slate-50 dark:bg-slate-800 rounded-t-lg relative group overflow-hidden transition-all duration-300 hover:scale-y-105 origin-bottom" style={{ height: `${height}%` }}>
                    <div className={`absolute inset-0 bg-primary opacity-${20 + (i * 10)} group-hover:opacity-60 transition-opacity`}></div>
                </div>
            ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1 font-display">
          {months.map(m => <span key={m}>{m}</span>)}
        </div>
      </div>

      {/* Service Completion */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-900 dark:text-white mb-6 font-display">Service Completion</h3>
        <div className="space-y-4">
          {completionStats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs font-bold font-display">
                <span className="text-slate-600 dark:text-slate-400">{stat.label}</span>
                <span className="text-primary">{stat.value}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${stat.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
