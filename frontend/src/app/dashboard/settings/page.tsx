'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-4">Notifications</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-display">Email notifications</span>
              <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
            </label>
          </div>
          <div>
            <h3 className="font-bold mb-4">Privacy</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-display">Show profile publicly</span>
              <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
