export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 dark:text-slate-400 font-display text-sm uppercase tracking-widest">
          Loading...
        </p>
      </div>
    </div>
  );
}
