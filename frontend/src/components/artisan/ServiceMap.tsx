'use client';

import Image from 'next/image';

export default function ServiceMap({ artisan }: { artisan: any }) {
  return (
    <section className="bg-white dark:bg-background-dark p-8 rounded-xl border border-slate-100 dark:border-slate-800">
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white font-serif">{artisan.name}'s Service Area</h3>
      <div className="h-48 w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSPMh6lOtiOOVjRkjWogMk8s31MfIKILpb2RWfGrix7uxjyitwjOAdrPqcB2mBZISHMCyXmEumuvNSc8CRm-fxtrJuG6YRKSCFcFzMYu7SNiEKOzR-2PxfTBUjsHqjdfoigq3pAYzXaDAs518yAO7t5Ve2c2Oyq0uJyQYG7mTyqpxAESgKZCyg6HDZZ1K-kTb9wNPBeRK_nJlpy45-pL-5p43BPvBtQO2zeEA-xyoTHNvBL1IIGIloa1DXXx91OztvSBtrC8nczXJM"
          alt="Map view showing South Delhi service coverage area"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-4 flex items-center gap-2 font-display">
        <span className="material-icons-outlined text-primary text-sm">info</span>
        Servicing 20km radius from South Delhi
      </p>
    </section>
  );
}
