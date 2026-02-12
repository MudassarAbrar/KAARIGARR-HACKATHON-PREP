'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'dashboard', label: 'Overview', href: '/admin/dashboard' },
  { icon: 'people', label: 'Users', href: '/admin/users' },
  { icon: 'engineering', label: 'Providers', href: '/admin/providers' },
  { icon: 'assignment', label: 'Service Requests', href: '/admin/requests' },
  { icon: 'star_outline', label: 'Reviews', href: '/admin/reviews' },
  { icon: 'insights', label: 'Analytics', href: '/admin/analytics' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col h-full sticky top-0">
      <div className="p-8 flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-icons text-white text-sm">architecture</span>
        </div>
        <h1 className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white uppercase font-serif">Karigar</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-display text-sm ${
                isActive
                  ? 'bg-primary/5 text-primary border-r-4 border-primary'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className="material-icons text-[20px]">{item.icon}</span>
              <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all font-display text-sm"
        >
          <span className="material-icons text-[20px]">settings</span>
          <span className="font-medium">Settings</span>
        </Link>
        <div className="mt-4 px-4 py-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPN0x_41kwCdzoBK9gXcb992eyXaWGIkiXXiOLmRK0y6EFhlbKh_lHrS93o9_-87vHs0xW3P86bTnYOGVD6OxobO4V_UqueUWIgLk3moTa6wxYzodesRxzIz5akhURh-e9sksHattYrkC9vzDaMmkUs5LI3mS6FoHMRcjZKCZtNFkXLyxkl79r6jHtjhY9DRlhR4V4bd_HC1vU5J4ccdn9-kdsl2uWVDQ97IuBSH9zCS5nsnUGER3O3a7YIEA916tsX5o5Wi0CHLp5"
              alt="Admin Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">Marcus Chen</p>
            <p className="text-[10px] text-slate-500 truncate font-display">Senior Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
