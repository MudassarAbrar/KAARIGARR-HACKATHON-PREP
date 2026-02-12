'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/provider/dashboard' },
  { icon: 'pending_actions', label: 'Service Requests', href: '/provider/requests' },
  { icon: 'handyman', label: 'My Services', href: '/provider/services' },
  { icon: 'calendar_today', label: 'Calendar', href: '/provider/calendar' },
  { icon: 'star_outline', label: 'Reviews', href: '/provider/reviews' },
  { icon: 'payments', label: 'Earnings', href: '/provider/earnings' },
];

export default function ProviderSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-all duration-300 flex flex-col">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-icons-round">architecture</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif">Karigar</span>
        </div>
      </div>
      
      <nav className="mt-4 px-4 space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-display text-sm font-semibold ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-icons-round">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD95oB9LnUdbi9w_DzsNGz78kfmKtf71XZHyI9k87vyVY2KSx7aYtksFUuvvCLIzpCzZc2Z2a_h0sRLWuOPa14-piJlEkXTcM62wH4jha67P90EaIiAID4X3Q18IU2WqiAmK_MwNYtVD6RLTs09tbN50Wx52yzUIKGQmcJlB_iDhprYbBVjPX5Sslbg1oXpIcsDxj98igkIdP82Z4s0xcs9s9fdmUPeK4_ZSpPNpEPD56UESMwehmXqmsA0XG3e6FiMIvW9vwUuVY-C"
                alt="Profile photo of a professional artisan"
                fill
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate font-display text-slate-900 dark:text-white">Rahul Sharma</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-display">Master Carpenter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
