'use client';

import KPICards from '@/components/admin/KPICards';
import VerificationQueue from '@/components/admin/VerificationQueue';
import AnalyticsModule from '@/components/admin/AnalyticsModule';
import RecentActivity from '@/components/admin/RecentActivity';
import PlatformHealth from '@/components/admin/PlatformHealth';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      <KPICards />
      
      <div className="grid grid-cols-12 gap-10">
        {/* Left Section: Queue & Analytics */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <VerificationQueue />
          <AnalyticsModule />
        </div>
        
        {/* Right Section: Activity Feed */}
        <div className="col-span-12 lg:col-span-4">
          <RecentActivity />
        </div>
      </div>
      
      <PlatformHealth />
    </motion.div>
  );
}
