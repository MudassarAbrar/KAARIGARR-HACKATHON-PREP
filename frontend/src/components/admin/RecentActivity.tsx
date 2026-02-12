'use client';

const activities = [
  {
    icon: 'person_add',
    iconColor: 'text-primary',
    iconBorder: 'border-primary',
    title: 'New Artisan Registered',
    desc: 'Rajesh K. applied for the Plumber role. Document verification pending.',
    time: '2 minutes ago'
  },
  {
    icon: 'task_alt',
    iconColor: 'text-slate-400',
    iconBorder: 'border-slate-200 dark:border-slate-700',
    title: 'Job #2041 Completed',
    desc: 'Electrician Anita Rao finished "Full Circuit Rewiring" for client Sarah M.',
    time: '45 minutes ago'
  },
  {
    icon: 'payment',
    iconColor: 'text-emerald-400',
    iconBorder: 'border-emerald-400',
    title: 'Payout Released',
    desc: '$450.00 released to 12 verified providers for weekly earnings.',
    time: '2 hours ago'
  },
  {
    icon: 'report_problem',
    iconColor: 'text-orange-400',
    iconBorder: 'border-orange-400',
    title: 'Dispute Raised',
    desc: 'Client Rahul V. raised a dispute regarding cleaning service quality.',
    time: '5 hours ago'
  },
  {
    icon: 'update',
    iconColor: 'text-slate-400',
    iconBorder: 'border-slate-200 dark:border-slate-700',
    title: 'System Maintenance',
    desc: 'Scheduled database optimization completed successfully.',
    time: 'Yesterday'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm h-full">
      <h3 className="font-bold text-slate-900 dark:text-white mb-8 flex items-center justify-between font-display">
        Recent Activity
        <span className="material-icons text-slate-300 text-sm">more_vert</span>
      </h3>
      <div className="relative space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100 dark:before:bg-slate-800">
        {activities.map((activity, index) => (
           <div key={index} className="relative pl-10">
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 flex items-center justify-center z-10 ${activity.iconBorder}`}>
              <span className={`material-icons text-[10px] ${activity.iconColor}`}>{activity.icon}</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white font-display">{activity.title}</p>
            <p className="text-xs text-slate-500 mt-1 font-display">{activity.desc}</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-2 uppercase tracking-tight font-display">{activity.time}</p>
          </div>
        ))}
      </div>
      <button className="w-full mt-10 py-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all uppercase tracking-widest font-display">
        Load More Activity
      </button>
    </div>
  );
}
