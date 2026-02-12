'use client';

import Image from 'next/image';
import Link from 'next/link';

const providers = [
  {
    name: 'Julian S.',
    title: 'Cabinet Specialist',
    rating: '4.8',
    location: 'Upper East Side, 1.2 miles',
    rate: '$38',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8vuttPovskyl6klVLNj9PoLG8JxLNXjowCWHVNQ_LIEczPJprRCHFLwvVzis6EYH3VJx2Yi27U7x8Y-cfzQ7ntBgUt-OuiNGoIjJjtVwGqA1p8TPexRk8lLQ7W_gzvrrhPC05mBh_wXGy7uscvp6jpmmPo5Z0O0qDQtQj5p_zjqBvE9FXTc0VZDkgy3cDQg3RfHew0tiMs7p9TSE7TkdW8MnBCJwA_kLJ6amthdYXDdwYyx7eJSZtGSh2WWGfpzSMR5jAbe8-MTqh',
    verified: true
  },
  {
    name: 'Amara L.',
    title: 'Smart Home Electric',
    rating: '4.9',
    location: 'Chelsea District, 0.8 miles',
    rate: '$62',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp3xi0IsGWLYUUcoh2jb756-RmYHiU9Ny6bNQEhPp-i4nWlW5Ml8SBW8m4LjG6yiUWO915Nvs9F8QdUvGfM8M9pPhDbMvSWq3VtwcAFH0rIo8kA8a1FN9BlsmOk9WH5giiqJgPv4RW9iq_TghDF2DCeZUV9LtRFv7kQnFJzY1Qa_d_zLutOQ4PpDyzjkg4LUHn3FXz_mYpx_fu0MGkFkKe3ORAYyhRKACaAxoPwWGfcAQ2ExSznAATl-2MAOx_SqbgVD8Cj0auW7Du',
    verified: true
  },
  {
    name: 'Robert K.',
    title: 'Masonry Artist',
    rating: '4.7',
    location: 'Brooklyn Heights, 2.4 miles',
    rate: '$42',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAeuGTMkDpKf-eyv55tTvRIeV6nM3m1aLW4V7-J6owQviw5XG010Z38aiUeVC7gTk2vs5RzZe05DTAIiWDUSkv9Cd6I62S9ch6BaQIFrgDBsJVh6NZy19ckEGhmPTIhDvkxU_0CxSTYBsGUuDH_wa8idh-uBOAU7IVZOCvh04lKA06dVy7TCyAb9pJBANy5jCpfbD2guHA1Fe1PoGDOE2H8M-tvq5SX6Lcd7god_hlHsEouVBkSMzfrYBznYUNeyr6cJhDO2mXE5tg',
    badge: 'HIGHLY RATED'
  },
  {
    name: 'Simon T.',
    title: 'Kitchen & Bath Plumbing',
    rating: '4.9',
    location: 'SoHo District, 1.5 miles',
    rate: '$50',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALTUU8EUgMTxAYmdLIFRBiKMNA2tQpw3sCQNhxtfPCMYkdAhNW59d9lEs3uN2yG1kC1za0dmkigCyNdEXIo5uSCxUeJcoWo-sp6dcdXbXlQ6BtKiKWBPLpfhOSEdoIojmkZCLFqB-6h8v9UHP8K6MyttA42ITHH-sJF70rvIPmANeYN8eYjSsw61Z5DhYgIm_vEQrUgGsD_JWX377iILxCHlsOBpxS4iKhv50zhQKANEygE4EmUps5a-ciK301Y7uSgzdhvt7NHVHQ'
  },
  {
    name: 'Clara D.',
    title: 'Premium Interior Painter',
    rating: '4.8',
    location: 'Tribeca, 2.1 miles',
    rate: '$35',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDesHT44B5YM8_6t6xdhrrRDG7fFQxax6RXoGRDPb-F_ejhSxLwHIT_yFPTcq_4KqZv3id4lrxBScMquE1leU-0k4EbR48yrkNGnq1Jio_vn43AAIWknfjyJJefOS_1C-S4lS3Fnk-tKXM-C2qW0DfpumzHPnraJx9j8s_bdTZ6vTmfrrhr99dS07SCwoHXykSzE2LDs7-XqJ33J09a148JSg57FoWM6fjBpdN6hiC04EhDojHB9RBmFte3B-O_wWAfrSSez_F22kt1',
    verified: true
  },
  {
    name: 'Victor M.',
    title: 'Hardscape Designer',
    rating: '5.0',
    location: 'Queens Park, 3.7 miles',
    rate: '$75',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQSV2Mq5Wa32MsnA7QbA-l0EENFe6kEZ3lLWoSuIVVQZYZAYK5RrrwCLwNQbQ7ej4gY6nwt6VuXaOfNlJRz_5K22xfEd6fyocXPua9sfnJlsamSldQgyxAchTO3Gbtl-MSfygTmSXkqAFkL2Gyg2WBNd-oCeZlyXoNhMrL4UnGSlUusDYsXqVc_hlokSYp4urEOXtwglRklqyLZWKVSf5D1hb9nrz9sRpC_0MkKXycbUlkLmxs1H46TbI7nOStL7PtMmHdcFTimi4b'
  }
];

export default function ArtisanGrid() {
  return (
    <div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-display">Showing <span className="font-semibold text-slate-900 dark:text-white">24</span> professional artisans near you</p>
            <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-display">Sort By:</span>
            <div className="relative">
                <select className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 pr-10 text-sm focus:ring-primary focus:border-primary font-display text-slate-800 dark:text-slate-200">
                    <option>Recommended</option>
                    <option>Highest Rated</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Closest Distance</option>
                </select>
                <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {providers.map((provider, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group">
                    <div className="relative h-48">
                        <Image src={provider.image} alt={provider.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 flex gap-2">
                            {provider.verified && (
                                <span className="bg-primary text-slate-900 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg shadow-primary/30 font-display">
                                    <span className="material-icons-round text-[12px]">verified</span> VERIFIED
                                </span>
                            )}
                             {provider.badge && (
                                <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg font-display">
                                    {provider.badge}
                                </span>
                            )}
                        </div>
                        <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                            <span className="material-icons text-base">favorite_border</span>
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-lg font-display text-slate-900 dark:text-white">{provider.name}</h4>
                                <p className="text-xs text-primary font-bold uppercase tracking-wider font-display">{provider.title}</p>
                            </div>
                            <div className="flex items-center text-amber-400">
                                <span className="material-icons-round text-sm">star</span>
                                <span className="text-xs font-bold ml-1 text-slate-800 dark:text-white font-display">{provider.rating}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 mb-6 text-sm font-display">
                            <span className="material-icons-round text-base">location_on</span>
                            <span>{provider.location}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                            <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Rate</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-white font-display">{provider.rate}<span className="text-sm font-normal text-slate-400">/hr</span></span>
                            </div>
                            <Link href={`/artisan/1`} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary dark:hover:bg-primary dark:hover:text-slate-900 transition-all font-display">
                                View Profile
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-20 flex justify-center">
            <nav className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-all">
                    <span className="material-icons text-lg">chevron_left</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-slate-900 font-bold font-display shadow-lg shadow-primary/20">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all font-display">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all font-display">3</button>
                <span className="px-2 text-slate-400 font-display">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all font-display">12</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-all">
                    <span className="material-icons text-lg">chevron_right</span>
                </button>
            </nav>
        </div>
    </div>
  );
}
