'use client';

const days = [
    { label: 'MON', date: 11 },
    { label: 'TUE', date: 12, active: true },
    { label: 'WED', date: 13 },
    { label: 'THU', date: 14 },
    { label: 'FRI', date: 15 },
    { label: 'SAT', date: 16 },
    { label: 'SUN', date: 17 },
];

export default function WeeklySchedule() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 font-serif text-slate-900 dark:text-white">Weekly Schedule</h2>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map((day, i) => (
                <div key={i} className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold mb-1 font-display">{day.label}</p>
                    <div className={`w-full aspect-square flex items-center justify-center rounded-lg text-sm font-bold font-display ${
                        day.active 
                        ? 'bg-primary text-slate-900 shadow-md' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                        {day.date}
                    </div>
                </div>
            ))}
        </div>
        <div className="space-y-3 mt-6">
          <div className="flex gap-4 items-start pl-3 border-l-4 border-primary">
            <div className="pt-0.5">
              <p className="text-sm font-bold text-slate-900 dark:text-white font-display">09:00 - 11:30</p>
              <p className="text-xs text-slate-500 font-display">Service: Door Refurbishing</p>
            </div>
          </div>
          <div className="flex gap-4 items-start pl-3 border-l-4 border-slate-200 dark:border-slate-700">
            <div className="pt-0.5">
              <p className="text-sm font-bold text-slate-900 dark:text-white font-display">13:00 - 15:00</p>
              <p className="text-xs text-slate-500 font-display">Service: Site Survey - HSR Layout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
