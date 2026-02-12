'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-display">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:inset-0
      `}>
         <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar flex flex-col h-screen">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-4 md:p-10 space-y-8 max-w-7xl mx-auto w-full flex-1 overflow-y-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
