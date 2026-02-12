'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const requests = [
  {
    id: 'REQ-8821',
    service: 'Cabinet Refurbishing',
    icon: 'carpenter',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    artisan: 'David Miller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGRtArMhWEIrX6Q3nza21El5b5Cfhle5X5oY70dhEX2-8auIY8IwDr8ORLZAzHkfkym0RrLdeEY8z_3fW3ZuD32jDcPeiIXW2Y72DULdf-RBsHejV21MVqFoDO3G3RFmYN2cpPeWSKFXLB9kYj_y542_JKvfd0-Xgfopjhha6__4nWzBt76f55nf_W7HJYxcnfl1BIVco4KMVQI1uP7GmjAAlpWrRmp0gkZ1ex9oG2nhe0V-qBag21BVeJU4JenrUD97Ju8BzghIpr',
    status: 'In Progress',
    statusColor: 'bg-primary/10 text-primary',
  },
  {
    id: 'REQ-8945',
    service: 'Interior Wall Painting',
    icon: 'format_paint',
    iconBg: 'bg-slate-100 dark:bg-slate-700',
    iconColor: 'text-slate-500',
    artisan: null,
    status: 'Assigning',
    statusColor: 'bg-amber-500/10 text-amber-500',
  },
  {
    id: 'REQ-9012',
    service: 'Smart Home Setup',
    icon: 'electrical_services',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    artisan: 'Elena Rodriguez',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ikTrMwPsrSK0P0r1IEDunAKzI0_anpnzlAbDrhcRAQ3hcB8U4FjTrCdEULq-jn3kc5nNj_lIZCmMDXozt8ZKfsG1KZdNYtgaybwbs06aQIt0AfilM6R8NQnEpQ5b8l9YHX7q2Mg61Mb7nUTy4TKbBwgJgX_UV0NPk0BZBoi7UnJIcV4t6X5DkoPO9PouXZMbMjmS_b08w11-N8vML-1q3TDW9YiEuEbTfE_XeW31fS0GGEfK4cJJZj69XLyDk7fI7AMAohuJiHNV',
    status: 'Scheduled',
    statusColor: 'bg-indigo-500/10 text-indigo-500',
  },
];

export default function ActiveRequests() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <h4 className="font-bold text-slate-900 dark:text-white font-display">Active Service Requests</h4>
        <button className="text-sm text-primary font-semibold hover:underline font-display">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-display">Service Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-display">Artisan</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-display">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider font-display">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {requests.map((request, index) => (
              <motion.tr 
                key={request.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors whitespace-nowrap"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${request.iconBg} rounded flex items-center justify-center ${request.iconColor}`}>
                      <span className="material-icons-outlined">{request.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white font-display">{request.service}</p>
                      <p className="text-xs text-slate-500 font-display">{request.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  {request.artisan ? (
                    <div className="flex items-center gap-2">
                      <Image 
                        src={request.image || ''} 
                        alt={request.artisan} 
                        width={24} 
                        height={24} 
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium font-display">{request.artisan}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-300">SM</div>
                       <span className="text-sm font-medium text-slate-500 font-display">Searching...</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide font-display ${request.statusColor}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-icons-outlined">arrow_forward</span>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
