'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <span className="material-icons text-red-600 dark:text-red-400 text-4xl">error_outline</span>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-display">
            We're sorry for the inconvenience. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-primary text-slate-900 font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20 font-display"
          >
            Try Again
          </button>
          
          <a
            href="/"
            className="block w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:border-primary hover:text-primary transition-all font-display"
          >
            Go Home
          </a>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Error Details
            </summary>
            <pre className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
