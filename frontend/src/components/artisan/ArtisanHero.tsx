'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ArtisanHeroProps {
  artisan: {
    name: string;
    role: string;
    rating: number;
    reviews: number;
    location: string;
    avatar: string;
  };
}

export default function ArtisanHero({ artisan }: ArtisanHeroProps) {
  return (
    <section className="relative rounded-xl overflow-hidden mb-24 max-w-7xl mx-auto">
      <div className="h-[400px] w-full overflow-hidden relative">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHXcwsDT3ufrh9WgKIhrhCLULyyl9S9kYYqD3Ton_m0-maDS4CyX8OfO9uOCzslQ9YopyKMhkVd9Hq5kDcrNk4zHDGApqCF7BlxLtCnCTQyjh0IAILVaQzTzdVlQK_NDtgH7pRiWIeDPY_D-UgU5XS5mNP55cJdb6-nS1X2sLutN7k-ucOvbJZ0j8Px1Zcggb9iSY3fbm3BPVv6WH9F1ZhecczvHJz7iq5rEXfHSbqnoiT8pw9w_t3x6MbrInyginPaaqPDUfCl0O6"
          alt={`${artisan.name} workspace`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      </div>

      {/* Floating Profile Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -bottom-2 md:-bottom-16 left-4 right-4 md:left-12 md:right-12 bg-white dark:bg-background-dark p-6 md:p-8 rounded-xl shadow-2xl flex flex-col md:flex-row items-center md:items-end justify-between border border-slate-100 dark:border-slate-800"
      >
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 -mt-24 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-white dark:border-background-dark overflow-hidden shadow-lg relative">
              <Image
                src={artisan.avatar}
                alt={artisan.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-primary text-white p-1.5 rounded-full shadow-md flex items-center justify-center">
              <span className="material-icons-outlined text-sm">verified</span>
            </div>
          </div>
          
          <div className="text-center md:text-left pb-4">
            <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">{artisan.name}</h1>
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest font-display">Expert</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-2 font-display">{artisan.role}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-display">
              <div className="flex items-center text-amber-500">
                <span className="material-icons-outlined text-lg">star</span>
                <span className="font-bold ml-1">{artisan.rating}</span>
                <span className="text-slate-400 ml-1 font-normal">({artisan.reviews} Reviews)</span>
              </div>
              <div className="flex items-center text-slate-400">
                <span className="material-icons-outlined text-lg">location_on</span>
                <span>{artisan.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pb-4 mt-6 md:mt-0 w-full md:w-auto">
          <button className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-3 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 font-display">
            <span className="material-icons-outlined">chat_bubble_outline</span>
            Message
          </button>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 font-display">
            Request Service
          </button>
        </div>
      </motion.div>
    </section>
  );
}
