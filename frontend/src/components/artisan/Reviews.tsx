'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const reviews = [
  {
    name: "Priya Kapoor",
    date: "2 weeks ago • Furniture Restoration",
    rating: 5,
    text: "Arjun restored an antique cabinet that has been in our family for three generations. His attention to detail and knowledge of wood types is remarkable. The finish is absolutely flawless.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd5fhSlLXmbegX6cGTdIgzFVd9mcwpZ7YKkafAVJq_ONt2PRriotNnG0eej-h97Y7YO0ziS5ZDmDqxE2vjoq3wUAFjKVbbCTZFByiI6kXgdJ5xiRUYT5K26X_VG6DyC9VOnIOANnAHNZFu_dBrEmrQ21WkPUqQyoFrMEE14uskJuu3eKX9VF3WFj6k_lFpxMzZTJ9WW8noM0jJD4MMyL-QnJ2mU9IDy9uOwcSS550yf9Y3argNEbALC2kAGXze_QtaR5Z_yaiBYW2G"
  },
  {
    name: "Vikram Mehta",
    date: "1 month ago • Custom Office Desk",
    rating: 4.5,
    text: "Excellent craftsmanship. Arjun designed a desk that fits perfectly in my home office nook. A bit of a wait due to his busy schedule, but worth it for the quality.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtSvlSNTkoCmCGJPS_iIYblOIQcvAxGisRD_PMDSrTQwS__IJyqVgi0qY9lVocDl9sCh6Sl69zrMC8aQVayHgi9IVfCds0C8iD7cZ-1eKQSsPbFKOKiJK0RoT1nMUT_jgyv0eagq9pQ95jGZAOXfsTmjwMeEhLpsDWwu4Rb2lEL8AL8Zs7frG6Bh-wYq7_38wrSOTwvGRmcUz8Ehv3tXrKqus4tRK3wSEjxkQlA0H2rimktTnNauzWrRmx4EBbP_I2hFqQ7GCIwzT-"
  }
];

export default function Reviews({ artisan }: { artisan: any }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 font-serif text-slate-900 dark:text-white">
        <span className="w-8 h-1 bg-primary rounded-full"></span>
        Recent Reviews for {artisan.name}
      </h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-background-dark p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image src={review.image} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white font-display">{review.name}</p>
                  <p className="text-xs text-slate-400 font-display">{review.date}</p>
                </div>
              </div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-icons-outlined text-sm">
                    {i < Math.floor(review.rating) ? 'star' : (i < review.rating ? 'star_half' : 'star_border')}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-display leading-relaxed italic">"{review.text}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
