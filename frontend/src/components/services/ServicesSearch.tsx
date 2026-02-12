'use client';

export default function ServicesSearch() {
  return (
    <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
      <form 
        className="bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none p-2 flex flex-col md:flex-row items-center gap-2 border border-slate-100 dark:border-slate-800"
        role="search"
        aria-label="Search for services"
      >
        <div className="flex items-center flex-1 w-full px-4">
          <label htmlFor="service-search" className="sr-only">Search for services</label>
          <span className="material-icons text-slate-400 mr-3" aria-hidden="true">search</span>
          <input 
            id="service-search"
            name="service"
            className="w-full bg-transparent border-none focus:ring-0 py-4 text-slate-800 dark:text-white font-display placeholder-slate-400 focus-visible:outline-none" 
            placeholder="Search for plumbing, carpentry, masonry..." 
            type="search"
            aria-label="Search for services by keyword"
          />
        </div>
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
        <div className="flex items-center flex-1 w-full px-4">
          <label htmlFor="location-search" className="sr-only">Location</label>
          <span className="material-icons text-slate-400 mr-3" aria-hidden="true">location_on</span>
          <input 
            id="location-search"
            name="location"
            className="w-full bg-transparent border-none focus:ring-0 py-4 text-slate-800 dark:text-white font-display placeholder-slate-400 focus-visible:outline-none" 
            defaultValue="New Delhi" 
            placeholder="Enter neighborhood or city" 
            type="text"
            aria-label="Search location"
          />
        </div>
        <a 
          href="#artisans" 
          className="w-full md:w-auto bg-primary text-slate-900 px-10 py-4 rounded-lg font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 font-display uppercase tracking-wider text-sm shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Find artisans matching your search"
        >
            FIND ARTISANS
        </a>
      </form>
    </div>
  );
}
