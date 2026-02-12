'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { icon: 'assignment', label: 'My Requests', href: '/dashboard/requests' },
  { icon: 'favorite_border', label: 'Favorites', href: '/dashboard/favorites' },
  { icon: 'chat_bubble_outline', label: 'Messages', href: '/dashboard/messages' },
];

const accountItems = [
  { icon: 'person_outline', label: 'Profile', href: '/dashboard/profile' },
  { icon: 'settings', label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-icons-outlined text-white text-xl">architecture</span>
        </div>
        <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif">
          KARIGAR
        </Link>
      </div>

      {/* CTA */}
      <div className="px-6 mb-8">
        <Link href="/services">
          <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-icons-outlined text-sm">search</span>
            <span className="font-display text-sm">Find a Service</span>
          </motion.button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-display text-sm ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`material-icons-outlined ${isActive ? 'text-primary' : ''}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-8 pb-2 px-4 uppercase text-[10px] font-bold tracking-widest text-slate-400 font-display">
          Account
        </div>

        {accountItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-lg font-display text-sm"
          >
            <span className="material-icons-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2SWZhj1vN8Wv61pnWt8c1arhhnqOevj_lrtFKr6N-9Nw4MIi33EfNAOUyLa4gVWYs3Nx9_bdJqUi-M5F_S4ylnzmU1CwEiM9qMDlQHHIhbPx2J40lVx6PJxHB_2YgwHWSy-TMyZPs9hIhitbafh8A1-_dmvYLjf2aO3GsdM5gS-V5OoPJnBg-cw7S5eRQxn0llJuLnf1OA1EO9hBmHFmDBbJAIOiBQBwM5DfCrmO9cOvcfNXrKRp7oq95iQX3xyuEs7rgEhHiEEuV"
            alt="User"
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate font-display">Marcus Chen</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-display">Premium Member</p>
          </div>
          <span className="material-icons-outlined text-slate-400 text-sm">more_vert</span>
        </div>
      </div>
    </div>
  );
}
