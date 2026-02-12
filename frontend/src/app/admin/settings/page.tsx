'use client';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleToggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    // saveSettings({ maintenanceMode: !maintenanceMode });
  };

  const handleToggleEmail = () => {
    setEmailAlerts(!emailAlerts);
    // saveSettings({ emailAlerts: !emailAlerts });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Admin Settings</h1>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-4">Platform Settings</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-display">Maintenance mode</span>
              <input 
                type="checkbox" 
                checked={maintenanceMode} 
                onChange={handleToggleMaintenance}
                className="rounded border-slate-300 text-primary focus:ring-primary" 
              />
            </label>
          </div>
          <div>
            <h3 className="font-bold mb-4">Notifications</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-display">Email alerts for new users</span>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={handleToggleEmail}
                className="rounded border-slate-300 text-primary focus:ring-primary" 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
