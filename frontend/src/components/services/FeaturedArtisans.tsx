'use client';

import Image from 'next/image';
import Link from 'next/link';

const featuredArtisans = [
  {
    name: 'Marco Van Buren',
    role: 'Master Woodworker',
    rating: '4.9',
    reviews: '124',
    rate: '$45',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJx6xDFOEkobIpWqx0NmN3KrhRJHezgqAwdU9jSSa85UwIs-zGwAF-wTFJxbIXOhKAsLO2v7RprOaBk4mN8tC9KSYQ3gc-71xwTE5ctTRjr_OxH24TcAiljJIl83h703m6n6qGE8a2QuMU6u555F_HuTF397EDEpUAOsM24wlisY2AyBN347WJxIxtc7klxS7wQN4K5DhR3vCWt79K1-9_Esrl2ifgz0QWSfoMdOSEfazWnXPP9w0JjtZy9X9TxUKJ2agSEwl2RsXs'
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Electrician',
    rating: '5.0',
    reviews: '89',
    rate: '$55',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkWcShKd84I9k9gFj-Pza-g-FiWppNdctq-L9DbkAvbY37MaOsd7WmkVaH66WesXRjn0qAMoJ7YZ5tyYOrb9r9dBSO3FWeLK7K1OkFd6wrFUtWy302xkGbZWufzcstK4I0QVpGLzxGqqRjlxmuhJJ3HYI-pPHlJpIJ45tu3TqJzoaSNcrUKZCfmsWALeW5q_ygnHAM59xAUuxZHyz1aMXZL9dm9cCPeLmHU8-bnciYu5MryxC4Nia7LJUyAod8UCbtKVrMwozBJ7Wo'
  }
];

export default function FeaturedArtisans() {
  return (
    <section className="mb-12" aria-labelledby="featured-artisans-heading">
      <div className="flex items-center justify-between mb-8">
        <h2 id="featured-artisans-heading" className="text-xl font-medium font-display text-slate-900 dark:text-white">
          Featured Artisans
        </h2>
        <div className="flex gap-2" role="group" aria-label="Carousel navigation">
          <button 
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Previous featured artisans"
          >
            <span className="material-icons text-lg" aria-hidden="true">chevron_left</span>
          </button>
          <button 
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Next featured artisans"
          >
            <span className="material-icons text-lg" aria-hidden="true">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredArtisans.map((artisan, index) => (
          <article 
            key={index} 
            className="group flex bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-primary/20 hover:border-primary transition-all p-4 gap-6 relative focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
          >
            <Link 
              href="/artisan/1" 
              className="absolute inset-0 z-10 focus-visible:outline-none"
              aria-label={`View ${artisan.name}'s profile - ${artisan.role}, rated ${artisan.rating} stars`}
            >
              <span className="sr-only">View {artisan.name}'s profile</span>
            </Link>
            <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden relative">
              <Image 
                src={artisan.image} 
                alt={`Profile photo of ${artisan.name}, ${artisan.role}`}
                fill 
                className="object-cover" 
                sizes="128px"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded font-display">
                  Featured
                </span>
                <button 
                  className="z-20 text-slate-300 hover:text-red-500 cursor-pointer transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded"
                  aria-label={`Add ${artisan.name} to favorites`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="material-icons" aria-hidden="true">favorite_border</span>
                </button>
              </div>
              <h3 className="text-lg font-bold mt-1 font-display text-slate-900 dark:text-white">
                {artisan.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-display">
                {artisan.role}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center text-amber-400">
                  <span className="material-icons-round text-base" aria-hidden="true">star</span>
                  <span className="text-xs font-bold ml-1 text-slate-800 dark:text-white font-display">
                    {artisan.rating}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1 font-display">
                    ({artisan.reviews} reviews)
                  </span>
                </div>
                <div className="text-sm font-semibold text-primary font-display" aria-label={`Rate: ${artisan.rate} per hour`}>
                  {artisan.rate}/hr
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
