import type { Metadata } from 'next';
import DashboardPageContent from '@/components/dashboard/DashboardPageContent';

export const metadata: Metadata = {
  title: 'Dashboard | Karigar Marketplace',
  description: 'Manage your service requests, messages, and profile.',
};

export default function DashboardPage() {
  return <DashboardPageContent />;
}
