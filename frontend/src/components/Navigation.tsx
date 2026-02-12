'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2"
          >
            <span className="w-8 h-8 bg-primary rounded flex items-center justify-center text-background-dark">
              <span className="material-icons text-sm">architecture</span>
            </span>
            KARIGAR
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth"
            className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth?tab=register"
            className="bg-primary text-background-dark font-bold text-sm px-6 py-2.5 rounded hover:opacity-90 transition-all"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-900 dark:text-white"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="material-icons">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800"
        >
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/about"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <Link
                href="/auth"
                className="block text-center text-sm font-medium px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded hover:border-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth?tab=register"
                className="block text-center bg-primary text-background-dark font-bold text-sm px-6 py-2.5 rounded hover:opacity-90 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
