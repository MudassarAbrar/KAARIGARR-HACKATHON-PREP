'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const requests = [
  {
    name: 'Arjun Mehta',
    time: '24 mins ago',
    service: 'Custom Wardrobe Repair & Polishing',
    location: 'Indiranagar, 2.4 km',
    schedule: 'Tomorrow, 10:00 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo8FOoNNcNCgtlcypV0IYJMTy17GuBq471U2yiXRbhtUL05p8q0LcPPwxq7jDqMQCpXy699KkA8PTxRDKW-XdT3IPtWy_3uCwM0WW0-ZdfxEuqQUjjE8-7fc1UbahEgOqs7PQQ5gWknXTvc5c7cAEiUuGWM-uan2A_q8RDohKOpA3lC_UlqvM1hABuVqKNsI3Su-x7mwirQ41gp8plRKvjX9aZb98kuWPSe6xytcu8sWoB7Pm_w5q3XIEB4NfEekDojG8hEdos4kYP',
  },
  {
    name: 'Priya Singh',
    time: '1 hour ago',
    service: 'Modular Kitchen Installation (Partial)',
    location: 'Koramangala, 4.8 km',
    schedule: '15 Oct, 09:30 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmPCuIwqlu1AlSo6fB76U4rQr12n9EFtdPuXlgqDd-Ct6g4RS-zFj9F0A08_i4ldEmc2b803WUWPCGUPS79CdFiMcdCN_ljiTt1PNvtSh4M3g56B8fbxbK4xRvDPSmFgUFpObrrlUQncM6JFamyFrds0CTtrvW7rtfNZ6bNODw6OTK8Hjk4RF11-LNjuoYxPCnb4fiStaMmRHd4p0lCblopcCHgWK_odmnGOKg3afiFVC-a0d0Yfk7dNpIOlzhSvbwiVfNdurn6ohU',
  },
];

export default function IncomingRequests() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Incoming Service Requests</h2>
        <Link className="text-primary text-sm font-bold hover:underline font-display" href="/provider/requests">View All</Link>
      </div>
      <div className="space-y-4">
        {requests.map((req, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 relative">
              <Image src={req.image} alt={req.name} fill className="object-cover" />
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white font-display">{req.name}</h4>
                <span className="text-xs font-bold text-slate-400 font-display">{req.time}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-display">{req.service}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs text-slate-500 font-display">
                  <span className="material-icons-round text-sm">location_on</span>
                  {req.location}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-display">
                  <span className="material-icons-round text-sm">schedule</span>
                  {req.schedule}
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-5 py-2 bg-primary text-slate-900 rounded-lg text-xs font-bold hover:brightness-110 font-display">Accept</button>
              <button className="flex-1 sm:flex-none px-5 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-all font-display">Reject</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
