'use client';

export default function PromoBanner() {
  return (
    <div className="relative bg-background-dark text-white rounded-xl overflow-hidden p-8 flex items-center shadow-xl">
      <div className="relative z-10 space-y-4 max-w-md">
        <h3 className="text-2xl font-light leading-snug font-serif">
          Expertise that <span className="text-primary font-bold">redefines</span> craftsmanship.
        </h3>
        <p className="text-slate-400 text-sm font-display">
          Upgrade to Karigar Pro for priority scheduling and architectural consultation for your custom projects.
        </p>
        <button className="bg-primary text-background-dark font-bold px-6 py-2 rounded-lg text-sm hover:scale-105 transition-transform font-display shadow-lg shadow-primary/20">
          Learn More
        </button>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-gradient-to-l from-primary to-transparent"></div>
      <span className="material-icons-outlined absolute right-8 top-1/2 -translate-y-1/2 text-[180px] text-primary/5 select-none pointer-events-none">
        architecture
      </span>
    </div>
  );
}
