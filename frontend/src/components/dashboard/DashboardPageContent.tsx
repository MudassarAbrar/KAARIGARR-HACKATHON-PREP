'use client';

import QuickStats from '@/components/dashboard/QuickStats';
import ActiveRequests from '@/components/dashboard/ActiveRequests';
import PromoBanner from '@/components/dashboard/PromoBanner';
import UpcomingCalendar from '@/components/dashboard/UpcomingCalendar';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { motion } from 'framer-motion';

export default function DashboardPageContent() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <QuickStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Active Service Requests & Banner */}
        <div className="xl:col-span-2 space-y-6">
            <ActiveRequests />
            <PromoBanner />
        </div>
        
        {/* Side Column: Activity & Calendar */}
        <div className="space-y-8">
            <UpcomingCalendar />
            <RecentActivity />
        </div>
      </div>
    </motion.div>
  );
}
