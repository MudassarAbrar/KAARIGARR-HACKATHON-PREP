'use client';

export default function ServicesSidebar() {
  return (
    <aside className="w-full lg:w-64 space-y-10">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 font-display">Categories</h3>
        <div className="space-y-3 font-display">
          {['Woodworking', 'Electrical', 'Masonry', 'Landscaping', 'Plumbing'].map((category, index) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input 
                defaultChecked={index === 0} 
                className="rounded border-slate-300 text-primary focus:ring-primary" 
                type="checkbox"
              />
              <span className="text-sm group-hover:text-primary transition-colors text-slate-600 dark:text-slate-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-display">Price Range</h3>
            <span className="text-xs font-medium text-primary font-display">$10 - $250+</span>
        </div>
        <div className="relative h-1 bg-slate-200 dark:bg-slate-800 rounded-full">
            <div className="absolute h-full w-2/3 bg-primary rounded-full left-1/4"></div>
            <div className="absolute -top-1.5 left-1/4 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-pointer"></div>
            <div className="absolute -top-1.5 right-1/4 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-pointer"></div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 font-display">Rating</h3>
        <div className="space-y-3 text-sm font-display">
          <label className="flex items-center gap-3 cursor-pointer">
            <input className="text-primary focus:ring-primary" name="rating" type="radio"/>
            <span className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-icons-round text-sm">star</span>
              ))}
              <span className="ml-2 text-slate-600 dark:text-slate-400">4.5 & Up</span>
            </span>
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium font-display text-slate-700 dark:text-slate-200">Available Now</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input className="sr-only peer" type="checkbox" />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </div>
        </label>
      </div>
    </aside>
  );
}
