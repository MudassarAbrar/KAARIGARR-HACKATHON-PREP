'use client';

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">My Requests</h1>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 font-display">No active requests found.</p>
      </div>
    </div>
  );
}
