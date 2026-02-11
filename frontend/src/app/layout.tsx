import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Karigar - Skilled Worker Platform',
  description: 'Connect with skilled workers and find opportunities',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
