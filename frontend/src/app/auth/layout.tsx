import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login or Register | Karigar Marketplace',
  description: 'Sign in to your Karigar account or join as a customer or service provider.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
