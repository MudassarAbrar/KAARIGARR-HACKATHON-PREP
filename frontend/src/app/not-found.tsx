export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold font-display text-primary">404</h1>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-display">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <a
          href="/"
          className="inline-block bg-primary text-slate-900 font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20 font-display"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
