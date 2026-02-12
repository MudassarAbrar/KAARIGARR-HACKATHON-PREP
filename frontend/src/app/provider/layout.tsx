import ProviderSidebar from '@/components/provider/ProviderSidebar';
import { Manrope } from 'next/font/google';
import type { Metadata } from 'next';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Provider Dashboard | Karigar Marketplace',
  description: 'Manage your services, requests, and earnings.',
};

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display ${manrope.variable}`}>
        <ProviderSidebar />
        <main className="flex-1 lg:ml-64 p-8 min-h-screen">
            {children}
        </main>
    </div>
  );
}
