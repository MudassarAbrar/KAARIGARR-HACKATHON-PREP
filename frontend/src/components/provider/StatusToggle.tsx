'use client';

export default function StatusToggle() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 dark:bg-primary/5 text-white border border-slate-800 overflow-hidden relative group">
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-lg font-display">Active Status</h4>
          <p className="text-xs text-slate-400 font-display">You are currently visible to clients</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input defaultChecked className="sr-only peer" type="checkbox"/>
          <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors"></div>
        </label>
      </div>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  );
}
