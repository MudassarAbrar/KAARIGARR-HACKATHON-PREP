import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import { Manrope } from 'next/font/google';
import type { Metadata } from 'next';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Admin Dashboard | Karigar Marketplace',
  description: 'Karigar administrative control panel.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display ${manrope.variable}`}>
      <aside className="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800">
        <Sidebar />
      </aside>
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
                {children}
            </div>
            <AdminFooter />
        </div>
      </main>
    </div>
  );
}
