import type { Metadata } from 'next';
import { Manrope, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import GoogleAnalytics from '@/components/GoogleAnalytics';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Karigar - Find Skilled Artisans Near You',
  description: 'Connecting you with trusted local service providers for all your home and commercial needs. Verified professionals for plumbing, electrical, carpentry, and more.',
  keywords: ['karigar', 'skilled workers', 'artisans', 'local services', 'home services'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};



import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${manrope.variable} ${inter.variable} ${playfair.variable} bg-background-light dark:bg-background-dark text-charcoal dark:text-white transition-colors duration-300`} suppressHydrationWarning>
        <ThemeProvider>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

