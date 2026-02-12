'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'carpentry', icon: 'carpenter', label: 'Carpentry' },
  { id: 'electrical', icon: 'bolt', label: 'Electrical' },
  { id: 'painting', icon: 'format_paint', label: 'Painting' },
  { id: 'plumbing', icon: 'plumbing', label: 'Plumbing' },
  { id: 'masonry', icon: 'foundation', label: 'Masonry' },
  { id: 'others', icon: 'more_horiz', label: 'Others' },
];

export default function Step1Category({ onSelect, selectedCategory }: { onSelect: (id: string) => void, selectedCategory: string | null }) {
  return (
    <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900/50 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary text-sm font-bold font-display">01</span>
        <h2 className="text-xl font-semibold font-display text-slate-900 dark:text-white">Service Classification</h2>
      </div>
      
      {/* Searchable Input */}
      <div className="relative mb-8">
        <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input 
            className="w-full pl-12 pr-4 py-4 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm font-display text-slate-900 dark:text-white placeholder-slate-400" 
            placeholder="Search for a specific task (e.g. Italian Marble Polishing)" 
            type="text"
        />
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
            <button 
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all group ${
                    selectedCategory === cat.id 
                    ? 'border-2 border-primary bg-primary/5' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-primary bg-white dark:bg-transparent'
                }`}
            >
                <span className={`material-icons-outlined text-3xl group-hover:scale-110 transition-transform ${
                    selectedCategory === cat.id ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
                }`}>{cat.icon}</span>
                <span className={`text-xs uppercase tracking-widest font-bold font-display ${
                    selectedCategory === cat.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                }`}>{cat.label}</span>
            </button>
        ))}
      </div>
    </motion.section>
  );
}
