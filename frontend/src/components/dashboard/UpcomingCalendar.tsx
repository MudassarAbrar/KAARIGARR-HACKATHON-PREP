'use client';

export default function UpcomingCalendar() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // const dates = Array.from({ length: 15 }, (_, i) => 28 + i); // Simplified logic
  
  // Custom display logic for calendar dates
  const calendarCells = [
    { day: 28, inactive: true }, { day: 29, inactive: true }, { day: 30, inactive: true },
    { day: 1 }, { day: 2, today: true }, { day: 3 }, { day: 4 }, { day: 5 },
    { day: 6, active: true }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10, marked: true },
    { day: 11 }, { day: 12 }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-slate-900 dark:text-white font-display">Upcoming</h4>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 transition-colors">
            <span className="material-icons-outlined text-sm">chevron_left</span>
          </button>
          <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 transition-colors">
            <span className="material-icons-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {days.map((d, i) => (
          <span key={i} className="text-[10px] font-bold text-slate-400 font-display">{d}</span>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((cell, i) => (
          <div 
            key={i} 
            className={`
              aspect-square flex items-center justify-center text-xs font-display rounded-lg transition-all cursor-pointer
              ${cell.inactive ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}
              ${cell.today ? 'font-bold border border-primary/20 text-primary' : ''}
              ${cell.active ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary hover:text-white' : ''}
              ${cell.marked ? 'font-bold border border-amber-500/20 text-amber-500' : ''}
            `}
          >
            {cell.day}
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border-l-2 border-primary hover:translate-x-1 transition-transform cursor-pointer">
          <div className="text-center">
            <p className="text-xs font-bold text-primary font-display">OCT</p>
            <p className="text-lg font-black leading-none font-display">06</p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white font-display">Smart Setup</p>
            <p className="text-[10px] text-slate-500 font-display">09:00 AM - 12:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
