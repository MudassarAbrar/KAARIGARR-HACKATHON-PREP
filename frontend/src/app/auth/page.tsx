'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import SocialAuth from '@/components/auth/SocialAuth';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel: Architectural Brand Showcase */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-7/12 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvPwRWJF1EriBcoyODDG-XG5GNgunbzPhWQjj7GnXFJWHj-iuRKxFgHDnvrjt8UpT5s___Kq6odEBIMqloaH9Bm6ZJJPN8zF7eKCNqQ4aadGdYI7H_VPwkUWBXukrPPNldpXWBUTNU3UGChe3e2a1tqgzIstuXrWvBuabBzj6O5BdLxJQiXFGaqmMEf31B3Csv8MY7Kmk2hj8wa7AGEPdS1QUDMfewfrCrHTUO3O_n3XBFyXIgSCroxfkgPTPXvzh26SUeTWQx4ksV"
            alt="Modern artisan workshop"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        {/* Teal Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-background-dark/90 via-background-dark/40 to-primary/20"></div>
        
        <div className="relative z-20 flex flex-col justify-between p-16 w-full">
          <div>
            <h1 className="text-4xl font-extralight tracking-[0.6em] text-white uppercase mb-4">
              Karigar
            </h1>
            <div className="h-px w-24 bg-primary/60"></div>
          </div>
          
          <div className="max-w-md">
            <p className="text-6xl font-light text-white leading-tight mb-6">
              Excellence in every <span className="text-primary italic">craft.</span>
            </p>
            <p className="text-lg text-slate-300 font-light tracking-wide leading-relaxed">
              Connect with the most skilled artisans in your neighborhood. Secure, verified, and premium hyperlocal services.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-white/50 text-sm tracking-widest uppercase">
            <span>Precision</span>
            <span className="w-1 h-1 rounded-full bg-primary"></span>
            <span>Trust</span>
            <span className="w-1 h-1 rounded-full bg-primary"></span>
            <span>Quality</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Authentication Forms */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16 bg-white dark:bg-background-dark/50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-12">
            <h1 className="text-3xl font-extralight tracking-[0.4em] text-slate-900 dark:text-white uppercase mb-2">
              Karigar
            </h1>
            <div className="h-px w-16 bg-primary"></div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center space-x-8 mb-12 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-4 text-sm font-semibold tracking-widest uppercase transition-colors ${
                activeTab === 'login'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`pb-4 text-sm font-semibold tracking-widest uppercase transition-colors ${
                activeTab === 'register'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          <div className="space-y-8">
            {activeTab === 'login' ? (
              <>
                <div className="space-y-2">
                  <h2 className="text-3xl font-light text-slate-900 dark:text-white">
                    Welcome back
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-light">
                    Access your secure Karigar dashboard.
                  </p>
                </div>
                <LoginForm />
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="text-3xl font-light text-slate-900 dark:text-white">
                    Join Karigar
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-light">
                    Create your account to get started.
                  </p>
                </div>
                <RegisterForm />
              </>
            )}

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">
                or continue with
              </span>
              <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
            </div>

            {/* Social Login */}
            <SocialAuth />
          </div>

          {/* Footer Text */}
          <div className="mt-16 text-center">
            <p className="text-xs text-slate-400 font-light tracking-widest uppercase">
              Architectural Precision. Hyperlocal Speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
