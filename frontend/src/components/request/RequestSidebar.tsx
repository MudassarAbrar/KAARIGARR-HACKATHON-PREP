'use client';

import Image from 'next/image';

export default function RequestSidebar({ selectedCategory }: { selectedCategory: string | null }) {
  const getCategoryName = () => {
      if(!selectedCategory) return 'Not selected';
      return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  };

  return (
    <div className="lg:col-span-4">
      <div className="sticky top-32 space-y-6">
        {/* Review Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-6 font-display">Order Summary</h3>
          <div className="space-y-4 mb-6">
            <div className={`flex justify-between items-start ${!selectedCategory ? 'opacity-30' : ''}`}>
              <div>
                <p className="text-sm font-bold font-display text-slate-900 dark:text-white">Service Category</p>
                <p className="text-xs text-slate-500 font-display">{getCategoryName()}</p>
              </div>
              {selectedCategory && <span className="material-icons-outlined text-primary text-sm">check_circle</span>}
            </div>
            <div className="flex justify-between items-start opacity-30">
              <div>
                <p className="text-sm font-bold font-display text-slate-900 dark:text-white">Schedule</p>
                <p className="text-xs text-slate-500 font-display">Not selected</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs text-slate-500 uppercase font-display">Estimated Range</span>
              <span className="text-xl font-extrabold text-primary font-display">{selectedCategory ? '$120 - $185' : '---'}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight font-display">
                Final quote will be provided by the artisan after the initial assessment.
            </p>
          </div>
        </div>

        {/* Suggested Artisans */}
        <div className="bg-background-light/50 dark:bg-slate-900/30 p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4 font-display">Top Rated Karigars</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                   <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYAHjlAtr5D7sZja3-fVhYnxldg1XyYBYp0LkBlMXIxCXKu-y6GzmLMd-Q1MG7dLpGDsevVIKiI8UxBT9VDWk8L-NgGyo3Tx3p7diG3gooEd1OP4v7rsa4uR0UQCnVqTphtdzGvsdMkopUlxoG6kaZ_lb0TTn8YlK-g8l93yd43DxU05nLmgH0QBXPj_4Z1oB_WI2WwYZMpX1h00GwKIDrpPGno1S9gPzvO2CQ8Sj-9clBL3UeDXa00qMG6Qqmh3ZSbY-Px0rs5Pyj" alt="Artisan 1" fill className="object-cover grayscale brightness-110" />
              </div>
              <div>
                <p className="text-xs font-bold font-display text-slate-900 dark:text-white">David S. <span className="text-primary ml-1">★ 4.9</span></p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-display">Master Carpenter • 12 yrs exp</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdB2XSP9zaT6Hdnod-ujQFejXAhWzcFraLBaV32njlJpZtdlLbAHrI2pTB9kNS0GBrnNJPSHQe9-O8WBi5U8va93wJdTJiqplHHiATDMRYi8GaBMFq-D2RkT1Wl5bB3ie_xWoQbn2ILEQCT-qdp7PnZw8n9RupRFJiifYyKHQI4UzoGxi2YeWY-Q6HSeVzD2siTkAP7gVOPSQ5B1SA3N7D8ws-CSaBGmDGIxdv2k1n_WVbYIA1DjgMMmm5r4XKc2472RakUh-6jT3B" alt="Artisan 2" fill className="object-cover grayscale brightness-110" />
              </div>
              <div>
                <p className="text-xs font-bold font-display text-slate-900 dark:text-white">Elena M. <span className="text-primary ml-1">★ 4.8</span></p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-display">Interior Specialist • 8 yrs exp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center gap-2 justify-center text-slate-400">
          <span className="material-icons-outlined text-sm">verified_user</span>
          <span className="text-[10px] uppercase tracking-widest font-display">Insured &amp; Verified Professionals</span>
        </div>
      </div>
    </div>
  );
}
