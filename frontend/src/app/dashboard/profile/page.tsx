'use client';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Profile</h1>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
            <input id="fullName" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" defaultValue="Marcus Chen" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
            <input id="email" type="email" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" defaultValue="marcus@example.com" />
          </div>
          <button className="bg-primary text-white font-bold uppercase tracking-widest px-8 py-3 rounded-lg hover:brightness-110 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
