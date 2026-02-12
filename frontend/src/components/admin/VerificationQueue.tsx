'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const queueItems = [
  {
    name: 'Arjun Singh',
    id: '#92831',
    role: 'Plumber',
    exp: '8 Years Experience',
    location: 'Mumbai, MH',
    roleColor: 'bg-blue-100 text-blue-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJl3FHBuzL2HwikhQ6EYNOOCAjoMq26OH9-C7YYpPkyx3ERS1v9lUBxbPLcCVv0MyGV0NFj2gSn7KmtZEAMHITTCQcc1U_vHmDokhD9f4w-HFb9Gbxo9rCR31dRXveqasaAb0Cb9UqXvN8X_KZE64DEtYnrcAQcUgwf25I9i3lSzCRUSD5W8A6qLF0zO0eZiZTkQ_fif0oGPodYsa33_As-g3AUhEQjlTzF_Q11SIOeEB40bV62v4WzocooIeF50pkgbPxYJarup2P'
  },
  {
    name: 'Priya Sharma',
    id: '#92835',
    role: 'Electrician',
    exp: '5 Years Experience',
    location: 'Bangalore, KA',
    roleColor: 'bg-amber-100 text-amber-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNGsYx3cNa_0EXYD9Q8xTyTLa9SJrT9QCb7VafS0viKL0e3ZYegvkAU_yT4iY3tXGK8q1d181y-gjt3MtKn41uazi7WmEvoC6VMKgnqXHSO6l-D_QeBxn8ek0eVnzF9Me5N2b-zMcBAr4SUePW3Umj7W5qloGbmUHpwcJAKfGapB9_jf6go_hXQjCo2T9gDMmYVoDhtPCh3objEpSd6HXMvrOOzEci7W2Ua1WjdEE7fVa2F-fYevkSd1wrcZEcRuo_Ow3jnHo0bmHL'
  },
  {
    name: 'Vikram Rathore',
    id: '#92839',
    role: 'Carpentry',
    exp: '12 Years Experience',
    location: 'Jaipur, RJ',
    roleColor: 'bg-stone-100 text-stone-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_8nm_0K2YGbaTaIuklaAHOqJ5nUt6O3pPmAmrDPfck8K5iMha8Kc-ybz7XWCTazkt_xAKHbXiNu_7N9XcxOtGAw1XsCQFfmRTAfskt9T24M5OX0VZ8SXHz4n0yxiCHk5myFQJNXApQgF3PiqlMJIUNODEzwbUgRcE0PhU6wFjSSz-orr8_OM3SlAb-jpewkkq_zgHnEkAyaHl_y7Lr1XO-DPOPPFPRxbIOVyLLXxHnKmsuS-_pj8t1aQHuRI-MX7B0I3d_CKGwcCX'
  }
];

export default function VerificationQueue() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white font-display">Provider Verification Queue</h3>
        <a className="text-xs font-bold text-primary hover:underline font-display" href="#">View All</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-bold uppercase tracking-widest font-display">
            <tr>
              <th className="px-6 py-4">Provider Info</th>
              <th className="px-6 py-4">Trade & Exp.</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {queueItems.map((item, index) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors whitespace-nowrap"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                       <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white font-display">{item.name}</p>
                      <p className="text-xs text-slate-500 font-display">ID: {item.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold w-fit font-display ${item.roleColor}`}>{item.role}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-display">{item.exp}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-display">{item.location}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all font-display">Approve</button>
                  <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-bold rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all font-display">Reject</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
