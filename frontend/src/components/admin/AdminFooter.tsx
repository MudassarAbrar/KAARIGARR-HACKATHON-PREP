import Link from 'next/link';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="px-10 py-6 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] flex justify-between items-center uppercase tracking-widest font-bold font-display">
      <p>© {currentYear} Karigar Technologies. All Rights Reserved.</p>
      <div className="flex gap-6">
        <Link className="hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link>
        <Link className="hover:text-primary transition-colors" href="/admin/settings">Audit Logs</Link>
        <Link className="hover:text-primary transition-colors" href="/help">Support</Link>
      </div>
    </footer>
  );
}
