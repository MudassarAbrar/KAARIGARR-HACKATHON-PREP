'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const portfolioItems = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCskFdDLCHS_YvLg7M-JQEL8lYEQ6ZKc8laGWPRtUq3yY5a-Qs-8Ursh2XmFs0zgRPc2Ljir2hXwGvoMiiNYyHaMb6MqqviFCQcyhZzG8GYl9rqYdg3XSKJwU4Mh31MSMd1Io4UtaPQNFkdLx1NXEc0pY8Q1bTxD7FJ3gGRccbE9PC1FfbDkAamWvAob4sj1YqHlwNZzQRh9WBe8G9BCOdgtvwOx2batAMvOcCKxyRJdVAVuBTNePZ_hngfeOvAzxH8kMk8SILjCL_9",
    alt: "Modern wooden dining table with minimalist chairs",
    title: "Modern Teak Dining Set",
    className: "row-span-2 col-span-1 md:col-span-1" // Corrected implementation of masonry via CSS classes or manual sizing
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk3xKT5Oq5hA0r1Xm83bbYQ8TNKTZhApLt8Yp5rALWrUoZHrR3J2sDzplQouvABvSGg_eDSqNOMuQjIKlNbVtsQESeKBcag00EM4MwUu0YIeOm8sNUU_rvytEUtXJhowEDIQFWUdtlV0jPgqAAc4T9oA_acRaDHd6I21mzvJYCDdF3VhUnlQnRzuzaXqQ9QGgvfAVG2IQd0v0qzD6h7DwCAXV9gsHsNsSm06eJ4rMkxZdelGVWrQxcDR8TiXKXWlMydqGmc8FE1oO8",
    alt: "Intricate wooden carving details on a cabinet door",
    title: null,
    className: "col-span-1"
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9poG-HPBR6GgPR1mqEWEm6GIyr-3NtAF_WJxxkSxdpxH5r18TWvgNsw3377jQRdm4-jhu85cedYF9slWSlQ3C1ikm2XcKQjcdbWMmb7Kmq0fcrq0Kkpo66XTM1SHEcggN8nQyGzkjb4zd1LMY0SrJWEmWutV655bbOR28OKTHT5MhyN-VzDl40K9piNMehjtrKHn1CsGSpEn15axwJpP_7kuGW1SSRRC_2htGDeLTLKZycD4jbpEyhc7iLRbmVw5FPKOmJ39MYhGI",
    alt: "Artisan workshop with various woodworking tools",
    title: null,
    className: "col-span-1"
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsEnJPlMn0WyNAOorvqp5QKSyfag_m6rZW63sTKZ7r7VmjFdZtDGfyYWmcV3OYs8vNZ6ny1tBbbHm4BY2UnIwKWpYLlxwyX942jHNLPilR_-V58vmK3-_WoeAk91xWD7rUS_85HMj5W59G1POgwUTpeZwlhHVtZRmzLC0eOCqeQWB73KlVkMY2ak4SbSVY_53NxoBtSbLuRPEZv7H9rHMh2SEUw4-VRdzkouYXACwfoENURFNx3Dds_U1_2uKrUVfalujIo8r6TtFO",
    alt: "Bespoke library wall with built-in wooden bookshelves",
    title: "Custom Library Installation",
    className: "col-span-1 md:col-span-2"
  }
];

export default function AboutPortfolio({ artisan }: { artisan: any }) {
  return (
    <div className="space-y-16">
      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 font-serif text-slate-900 dark:text-white">
          <span className="w-8 h-1 bg-primary rounded-full"></span>
          About {artisan.name}
        </h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-4 font-display font-light">
          <p>With over a decade of experience in fine woodworking, I specialize in creating bespoke furniture pieces that blend traditional Indian craftsmanship with contemporary aesthetic. My work is defined by precision, structural integrity, and a deep respect for the materials I use.</p>
          <p>Whether it's restoring a vintage mahogany heirloom or designing a minimalist oak workspace from scratch, I approach every project with the same level of architectural rigor and artistic passion. My workshop in South Delhi is equipped with both traditional hand tools and modern precision machinery.</p>
        </div>
      </motion.section>

      {/* Portfolio Masonry */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 font-serif text-slate-900 dark:text-white">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Portfolio
          </h2>
          <button className="text-primary font-bold hover:underline flex items-center gap-1 font-display text-sm">
            View All <span className="material-icons-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden relative group ${item.className}`}
            >
              <Image 
                  src={item.src} 
                  alt={item.alt} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {item.title && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-medium font-display">{item.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
