import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Service | Karigar Marketplace',
  description: 'Submit your service request and connect with verified local artisans.',
};

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
