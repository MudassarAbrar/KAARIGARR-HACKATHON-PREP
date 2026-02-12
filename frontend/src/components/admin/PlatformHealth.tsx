'use client';

export default function PlatformHealth() {
  return (
    <div className="bg-slate-900 dark:bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
      <div className="max-w-md">
        <h4 className="text-xl font-bold mb-2 font-display">Platform Performance Index</h4>
        <p className="text-slate-400 text-sm font-display">Currently operating at 98.4% efficiency. All hyperlocal nodes in Mumbai and Bangalore are fully operational.</p>
      </div>
      <div className="flex gap-12 items-center">
        <div className="text-center">
          <p className="text-primary font-black text-3xl font-display">4.9/5</p>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1 font-display">Avg Provider Rating</p>
        </div>
        <div className="text-center">
          <p className="text-emerald-400 font-black text-3xl font-display">22m</p>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1 font-display">Avg Response Time</p>
        </div>
        <div className="text-center">
          <p className="text-blue-400 font-black text-3xl font-display">94%</p>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1 font-display">Retention Rate</p>
        </div>
      </div>
    </div>
  );
}
