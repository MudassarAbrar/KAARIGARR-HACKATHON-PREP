export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded flex-1"></div>
            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
