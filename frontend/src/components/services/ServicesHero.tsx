'use client';

export default function ServicesHero() {
  return (
    <header className="relative py-24 border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Hero Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
         <div className="absolute inset-0" 
              style={{
                  backgroundColor: 'var(--background-light)',
                  backgroundImage: 'radial-gradient(#13daec 0.5px, transparent 0.5px)',
                  backgroundSize: '24px 24px'
              }}
         ></div>
         <div className="absolute inset-0 dark:block hidden" 
              style={{
                  backgroundColor: '#102022',
                  backgroundImage: 'radial-gradient(rgba(19, 218, 236, 0.15) 0.5px, transparent 0.5px)',
                  backgroundSize: '24px 24px'
              }}
         ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-[0.8em] mb-4 text-slate-900 dark:text-white font-display">
            O u r &nbsp; S e r v i c e s
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-display">
            Discover master artisans and skilled professionals for your architectural and domestic needs.
        </p>
      </div>
    </header>
  );
}
