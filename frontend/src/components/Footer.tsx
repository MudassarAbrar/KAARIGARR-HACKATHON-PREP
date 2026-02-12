import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-background-dark py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-8 bg-primary rounded flex items-center justify-center text-background-dark">
                <span className="material-icons text-sm">architecture</span>
              </span>
              KARIGAR
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Connecting artisans and customers through a modern, secure, and
              hyperlocal marketplace. Building trust in every service.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/karigarmarket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-icons text-lg">facebook</span>
              </a>
              <a
                href="https://instagram.com/karigarmarket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-icons text-lg">camera</span>
              </a>
              <a
                href="mailto:support@karigar.com"
                aria-label="Email us"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-icons text-lg">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-6">Quick Links</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/become-provider" className="hover:text-primary transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-primary transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Support</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary transition-colors">
                  Safety Tips
                </Link>
              </li>
            </ul>
          </div>
            <h5 className="font-bold mb-6">Newsletter</h5>
            <p className="text-sm text-slate-500 mb-4">
              Subscribe to get updates on local services and seasonal offers.
            </p>
            <form className="relative">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                placeholder="Email address"
                type="email"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-primary px-4 rounded text-background-dark font-bold text-xs uppercase transition-all hover:opacity-90"
              >
                Join
              </button>
            </form>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Karigar Marketplace. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
