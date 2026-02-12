'use client';

const activities = [
  {
    title: 'Service Fulfilled',
    desc: 'Kitchen Plumber finalized the installation.',
    time: '2 hours ago',
    type: 'success',
    color: 'bg-primary'
  },
  {
    title: 'Review Posted',
    desc: 'You rated David Miller with 5 stars.',
    time: 'Yesterday',
    type: 'neutral',
    color: 'bg-slate-300'
  },
  {
    title: 'Payment Confirmed',
    desc: 'Transaction #KAR-2931 completed.',
    time: 'Oct 24, 2023',
    type: 'neutral',
    color: 'bg-slate-300'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h4 className="font-bold text-slate-900 dark:text-white mb-6 font-display">Recent Activity</h4>
      <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-0 before:w-[1px] before:bg-slate-100 dark:before:bg-slate-700">
        {activities.map((activity, index) => (
            <div key={index} className="relative pl-8">
            <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-white dark:border-slate-800 ${activity.color}`}></div>
            <p className="text-xs font-bold text-slate-900 dark:text-white font-display">{activity.title}</p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-display">{activity.desc}</p>
            <span className="text-[10px] text-slate-400 block mt-1 uppercase font-semibold font-display">{activity.time}</span>
            </div>
        ))}
      </div>
    </div>
  );
}
