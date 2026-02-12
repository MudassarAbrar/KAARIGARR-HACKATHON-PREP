'use client';

import ProviderHeader from '@/components/provider/ProviderHeader';
import KeyMetrics from '@/components/provider/KeyMetrics';
import IncomingRequests from '@/components/provider/IncomingRequests';
import PerformanceAnalytics from '@/components/provider/PerformanceAnalytics';
import WeeklySchedule from '@/components/provider/WeeklySchedule';
import RecentReviews from '@/components/provider/RecentReviews';
import StatusToggle from '@/components/provider/StatusToggle';
import { motion } from 'framer-motion';

export default function ProviderDashboardPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <ProviderHeader />
      <KeyMetrics />
      
      <div className="grid grid-cols-12 gap-8">
        {/* Left Col: Requests & Analytics */}
        <section className="col-span-12 lg:col-span-7 space-y-10">
             <IncomingRequests />
             <PerformanceAnalytics />
        </section>

        {/* Right Col: Schedule, Reviews, Status */}
        <section className="col-span-12 lg:col-span-5 space-y-8">
             <WeeklySchedule />
             <RecentReviews />
             <StatusToggle />
        </section>
      </div>
    </motion.div>
  );
}
