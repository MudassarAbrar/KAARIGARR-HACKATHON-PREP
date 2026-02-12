'use client';

import Image from 'next/image';

export default function RecentReviews() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Recent Reviews</h2>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors">
            <span className="material-icons-round text-sm">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors">
            <span className="material-icons-round text-sm">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 italic text-slate-600 dark:text-slate-300 relative">
        <span className="material-icons-round text-primary/30 absolute top-4 left-4 text-4xl">format_quote</span>
        <div className="relative z-10">
          <p className="text-sm leading-relaxed mb-6 pl-4 font-display">"Rahul's attention to detail is truly architectural. He didn't just fix the shelf, he redesigned the mounting to be more durable. Highly recommended for premium woodworking!"</p>
          <div className="flex items-center gap-3 not-italic">
            <div className="w-8 h-8 rounded-full overflow-hidden relative">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbVVyQj553i0I8zkM1WAhiJf_tOw3cPHuIYoICzTaJ8MFd5V-pdLSupAL_RwlNYpph2MF_A5213mPr1W2jNkSLDPyeRhl51_xn-M7SUEfXs84HXX5Cq2PfZKeSV68QbUVTOuN_1B6-pbt17Wotl-b7dwVtKJhgeAlYzVAekEjpM-DVcgdko1u1fe7c6CdgJm689N1GN_cMe52r2fIi71osaltDc91J5fpNAbdGUWQkIGqWMumAYnqyM4xZul8xY9dtiSYvMOqpYdfE" alt="Client" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white font-display">Sneha Kapoor</p>
              <div className="flex text-amber-400 text-[10px]">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-icons-round text-xs">star</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
