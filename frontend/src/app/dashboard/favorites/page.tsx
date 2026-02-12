'use client';

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Favorites</h1>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 font-display">No favorites saved yet.</p>
      </div>
    </div>
  );
}
