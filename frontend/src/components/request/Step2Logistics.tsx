'use client';

import { motion } from 'framer-motion';

export default function Step2Logistics({ 
  isActive,
  data,
  onUpdate
}: { 
  isActive: boolean;
  data: { address: string; window: string };
  onUpdate: (key: string, value: string) => void;
}) {
  return (
    <motion.section 
        className={`bg-white dark:bg-slate-900/50 p-8 rounded-xl border border-slate-200 dark:border-slate-800 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}
    >
      <div className="flex items-center gap-4 mb-8">
        <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold font-display ${isActive ? 'border-primary text-primary' : 'border-slate-300 text-slate-400'}`}>02</span>
        <h2 className="text-xl font-semibold font-display text-slate-900 dark:text-white">Schedule & Location</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-xs uppercase tracking-widest font-bold text-slate-500 font-display">Service Address</label>
          <div className="relative">
            <span className="material-icons-outlined absolute left-3 top-3 text-slate-400">place</span>
            <input 
                className="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm font-display text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" 
                type="text" 
                value={data.address}
                onChange={(e) => onUpdate('address', e.target.value)}
                placeholder="Enter your address"
            />
          </div>
          <div className="h-32 w-full rounded-lg overflow-hidden relative border border-slate-200 dark:border-slate-700">
            {/* Placeholder Map Image */}
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 font-display text-xs">
                Map Preview
            </div>
            <div className="absolute inset-0 bg-primary/10"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="text-xs uppercase tracking-widest font-bold text-slate-500 font-display">Preferred Window</label>
          <div className="grid grid-cols-2 gap-2">
            {['MORNING', 'AFTERNOON'].map((window) => (
              <button 
                key={window}
                onClick={() => onUpdate('window', window)}
                className={`py-3 px-4 rounded-lg text-xs font-semibold transition-colors font-display ${
                  data.window === window 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-background-light dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {window}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
