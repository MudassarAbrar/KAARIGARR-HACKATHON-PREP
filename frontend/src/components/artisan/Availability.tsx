'use client';

export default function Availability({ artisan }: { artisan: any }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <section className="bg-white dark:bg-background-dark p-8 rounded-xl border border-slate-100 dark:border-slate-800">
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white font-serif">{artisan.name}'s Availability</h3>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={day} className={`flex flex-col items-center gap-2 ${index > 4 ? 'opacity-30' : ''}`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-display">{day}</span>
            {index <= 4 ? (
               <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-xs font-bold text-primary font-display">●</div>
            ) : (
               <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 border border-transparent"></div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-6 text-center italic font-display">Usually booked 2 weeks in advance</p>
    </section>
  );
}
