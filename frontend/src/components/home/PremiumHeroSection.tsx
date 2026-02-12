'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function PremiumHeroSection() {
  return (
    <main className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-cream dark:bg-background-dark grid-pattern">
      {/* Background Shapes */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 right-0 w-1/3 h-full bg-charcoal/[0.02] dark:bg-white/[0.02] -skew-x-12 transform translate-x-20 pointer-events-none"
      />

      <div className="container mx-auto px-8 grid grid-cols-12 items-center gap-8 relative z-10">
        {/* Left Typography Column */}
        <div className="col-span-12 lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-0"
          >
            <span className="inline-block text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 bg-primary/10 px-3 py-1 rounded">
              Architectural Excellence
            </span>
            <h1 className="text-7xl md:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[1.1] flex flex-col font-display">
              <span className="text-charcoal dark:text-white">SKILLED</span>
              <span className="text-charcoal/30 dark:text-white/30">WORKERS</span>
              <span className="text-charcoal dark:text-white">PLATFORM</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-12 max-w-lg"
          >
            <p className="text-lg text-charcoal/80 dark:text-white/80 leading-relaxed font-light font-display">
              Connecting master craftsmanship with visionary architectural projects. Our curated network of artisans brings high-end precision to every build.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services">
                <button className="bg-charcoal dark:bg-white dark:text-charcoal text-white px-10 py-5 rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl font-display">
                  Hire Talent
                </button>
              </Link>
              <Link href="/about">
                <button className="border border-charcoal/20 dark:border-white/20 px-10 py-5 rounded-lg font-bold text-sm tracking-widest uppercase hover:border-primary hover:text-primary hover:bg-primary/5 transition-all font-display">
                  About Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Visual Column */}
        <div className="col-span-12 lg:col-span-5 relative mt-20 lg:mt-0">
          {/* Floating Category Card 1: Mason */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-20 transform -translate-x-10 lg:-translate-x-20 translate-y-10"
          >
            <div className="bg-white dark:bg-charcoal p-4 rounded-xl shadow-2xl w-64 group hover:-translate-y-2 transition-transform duration-500 border border-charcoal/5 dark:border-white/5">
              <div className="relative h-72 w-full overflow-hidden rounded-lg mb-4">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8g_26istJws5J1xMDpknnC_if8voo3Lnq4pI1fAL0ZBWSTlvxRJerzjqHEvxJtZM2Hjlai4T6MFG1LSGgXcL6EBzQcDEb3_xUMGaROdBC6YCgrXH0t53m40uYAS0AsWNhi-_6pnzchfjg3PicxJEfn-AZDdts2A5oa-LSOrdPJGLUSlW1CfkSVyTKQagE8V4M7kr-DQrYjCwu3ReKm2VjHhwSybUqKB-CpdL3XWHa2U9U9X0ryCQutOENhIHmyhUhgG9gD0EN1tE"
                  alt="Masonry Work"
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-white font-bold tracking-widest text-xs uppercase font-display">Master Mason</span>
              </div>
              <div className="flex justify-between items-center px-1">
                <div>
                  <h3 className="font-bold text-sm font-display">Stone Finishing</h3>
                  <p className="text-[10px] text-charcoal/40 dark:text-white/40 uppercase tracking-tighter font-display">Premium Grade</p>
                </div>
                <span className="material-icons text-primary text-sm">verified</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Category Card 2: Carpenter */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-0 right-0 z-10 transform translate-x-4 -translate-y-20 lg:-translate-y-32"
          >
            <div className="bg-white dark:bg-charcoal p-4 rounded-xl shadow-2xl w-64 group hover:-translate-y-2 transition-transform duration-500 border border-charcoal/5 dark:border-white/5">
              <div className="relative h-80 w-full overflow-hidden rounded-lg mb-4">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMiKvgJVh7fsijWRWxeH1WQ2W5BRnnSBW_mZJUc_SYsdWgB2nc6LCNmQXQOyh3CDnqBJp3NX-Lv0nJhXrrW-XqpO0mLxJ_2ublbqcbshi3WqcrBvoIdSGMiAfLApBi-SMpURMCvMlmIEcdDH6o1v111HfZYyuZ6G1EkVOa3ccHwlUB9gPrIPSelJyIQBAz0RiiTdwKYipG0ShkTMx8YOmEtrcoRxkQTmweyDJ-oZN8xgWMMsVPnbb56oqmEFvAqw2RYR3CcijHlNI"
                  alt="Carpentry Work"
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-white font-bold tracking-widest text-xs uppercase font-display">Lead Carpenter</span>
              </div>
              <div className="flex justify-between items-center px-1">
                <div>
                  <h3 className="font-bold text-sm font-display">Custom Joinery</h3>
                  <p className="text-[10px] text-charcoal/40 dark:text-white/40 uppercase tracking-tighter font-display">Bespoke Interiors</p>
                </div>
                <span className="material-icons text-primary text-sm">verified</span>
              </div>
            </div>
          </motion.div>

          {/* Stats/Experience Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-0 right-0 bg-primary p-8 rounded-2xl shadow-2xl text-white z-30 transform translate-y-10"
          >
            <p className="text-4xl font-extrabold tracking-tighter font-display">15+</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-80 leading-tight font-display">Years of<br/>Excellence</p>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges Ribbon */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 w-full py-12 border-t border-charcoal/5 dark:border-white/5 bg-white/30 dark:bg-charcoal/30 backdrop-blur-sm hidden md:block"
      >
        <div className="container mx-auto px-8 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2">
            <span className="material-icons text-xl">architecture</span>
            <span className="font-bold tracking-widest text-xs uppercase font-display">Architectural Standards</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons text-xl">verified_user</span>
            <span className="font-bold tracking-widest text-xs uppercase font-display">Certified Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons text-xl">workspace_premium</span>
            <span className="font-bold tracking-widest text-xs uppercase font-display">Premium Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons text-xl">handyman</span>
            <span className="font-bold tracking-widest text-xs uppercase font-display">Master Craftsmen</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-32 left-8 hidden xl:flex flex-col items-center gap-4">
        <span 
          className="text-[10px] uppercase tracking-[0.4em] font-bold vertical-text rotate-180 font-display text-charcoal/60 dark:text-white/60" 
          style={{ writingMode: 'vertical-rl' }}
        >
          Discover More
        </span>
        <div className="w-px h-16 bg-charcoal/20 dark:bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </div>
    </main>
  );
}
