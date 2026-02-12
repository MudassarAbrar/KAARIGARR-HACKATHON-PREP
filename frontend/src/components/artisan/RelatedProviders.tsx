'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const relatedProviders = [
  {
    name: "Sarah Jenkins",
    role: "Upholstery Specialist",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA10KfqU3R8wHHAnGC8IKlfO6W1dq0IAI8SlJJdECtxmq4CWWw4mj5qSG334vwQkIoG6ACWNkK3xDClcFEcJvzf1YPbwpFw5bfZDN77dQAdB7mCxOEpEK-6nJwhRnIyVSlF01A1ngS4LPCgMq2ohsV5SS2szszm11XyOEtHexKrOPn0rKgLqmiPYgWxu2PZOhk6SdboQuesV9ImCV795-u6vwHikuLch9EhXmFfdhH_xusgcCv9m_PUi4h1BPzitPNFCHAAeK7KNzbw"
  },
  {
    name: "Rajesh Kumar",
    role: "Metal Artisan",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPZTX6d4HD3B4LMWs9eSzoIyaR2UBP-Ck9JnEfx8qXr5qo1ohMz5o5B53iOVw7VrLEgjamlaoqR4J6bQ2q4cfa6Xkp0y15Yv0yHNHdW5AmNBatOIytB0oH_FX2Z9gCnxCBwURUikGh0s2zsnKn_vk5IRKraznfA6JK8KvP1eB32MFZCaOUPZ6RJpecPDftzO6R3ckcZXqDktQZDBvVyz9LwoHb_qltg8yddYkJ_vO-P9-JQSUsK0V1V0AJD_ZV4_MsiYnK8jIZ8yPz"
  },
  {
    name: "Lena Varma",
    role: "Ceramic Artist",
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBmiuUFgXUtPr0i5sl7nzDB7rUCGvpsoACSsiZZBO5c10DXqTJjhWPkR8hwWdTMlEpBXb-y7aAJKVwz2lgx7AIKxLPwCL8KjWTn750Z56LeOczIYYo9SCTIinrFbMVbRjX8KzJX4uRiijLGmMBl_omrWZNF1BYpfA3W_Knw5Qlz5bv99C88m70RxVuSNQkXVCYfH0f74Dnqh166aePJY7-J8UxKz4l7V-9Th-M-AYelQAt8d2twcPlOWRK_gdW7And5TRCrzpluBg9"
  },
  {
    name: "John Doe",
    role: "Master Glassblower",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZkP5rAMWZOWBxwWuQgBx9TgIDvYSVMikv-HOxFTrg31o04alP2BhEkyrSlN9MOxwxKKI1k9q7SH34lcTbB3AWlD3VEYrEmw-ZTnhHEx2s-Mc1Dw-e1eKxboWLCZETJOdTx33auVPnSmw9wivwHXsrB0OpaCN5J6ayK4Iqyc3YQqn3woyG2fy9zoCvJRqC8cmFXu4zFTsSIcdyoVxlgBo4r9nEvD3U_gObOE-OwLH4Hh51S4i8eFC9RwmxH8IlThUflqSQoPQ0_oJ0"
  }
];

export default function RelatedProviders({ currentArtisanId }: { currentArtisanId: string }) {
  // console.log(currentArtisanId); // Suppress unused warning
  return (
    <section className="mt-24 pb-20 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white font-serif">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {relatedProviders.map((provider, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white dark:bg-background-dark rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="h-40 overflow-hidden relative">
              <Image 
                src={provider.image} 
                alt={provider.name} 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 px-2 py-1 rounded text-xs font-bold text-slate-900 dark:text-white flex items-center shadow-sm">
                <span className="material-icons-outlined text-xs text-amber-500 mr-1">star</span> {provider.rating}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-slate-900 dark:text-white font-display">{provider.name}</h4>
              <p className="text-xs text-slate-500 mb-4 font-display">{provider.role}</p>
              <button className="w-full py-2 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-display">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
