'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuApCxb3vUj1g2BPuVpHYvFVTu7t8wG8JvR2tpErs8xJWWlDqp98LbzskrSqd9t5rfc5yUV6A64Nh9aWObf109m9Kkmx7cs0Q0hKjNCV5wcnLcrTXgRgO2XlNShxuoFsIoYtntBYRUcOFZFIq_j_1XyJdBKqTox2v4zJF9_bzSPC3K0IV2n8o_GS48zlRQ5AE9J6lgzXNkYBxCJf5GpFCrOL0Y93Q7yJ4vi3PJpcfZcRUXfzfspY0mznqh_ghQdn1l_9uqJP0FT8gEtJ"
          alt="Professional Artisan at work"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="hero-tracking text-xs uppercase font-light text-primary mb-4 block animate-fade-in">
            K A R I G A R
          </span>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Find Skilled Artisans <br />
            <span className="text-primary">Near You</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Connecting you with trusted local service providers for all your home and commercial needs. Experience quality craftsmanship at your doorstep.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button className="bg-primary hover:bg-primary/90 text-background-dark font-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
              Find a Service
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
            <button className="border border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:text-primary active:scale-95 px-8 py-4 rounded-lg font-bold transition-all">
              Become a Provider
            </button>
          </div>
          
          <div className="mt-16 flex items-center gap-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">500+</span>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Verified Providers</span>
            </div>
            
            <div className="h-10 w-px bg-slate-300 dark:bg-slate-700"></div>
            
            <div className="flex flex-col">
              <div className="flex text-primary" role="img" aria-label="Rating: 4.9 out of 5 stars">
                <span className="material-icons text-sm">star</span>
                <span className="material-icons text-sm">star</span>
                <span className="material-icons text-sm">star</span>
                <span className="material-icons text-sm">star</span>
                <span className="material-icons text-sm">star_half</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">4.9/5 AVG RATING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
