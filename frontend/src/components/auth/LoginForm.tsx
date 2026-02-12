'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Default to customer role for login simulation
    await login(formData.email, 'customer');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-transparent border ${errors.email ? 'border-red-500 hover:border-red-600' : 'border-slate-200 dark:border-slate-800 focus:border-primary'} focus:ring-0 rounded-lg py-4 px-4 text-slate-800 dark:text-slate-200 placeholder:text-slate-300 transition-all font-light`}
            placeholder="architect@karigar.com"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Password
            </label>
            <Link
              href="/auth/reset-password"
              className="text-xs text-slate-400 hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className={`w-full bg-transparent border ${errors.password ? 'border-red-500 hover:border-red-600' : 'border-slate-200 dark:border-slate-800 focus:border-primary'} focus:ring-0 rounded-lg py-4 px-4 text-slate-800 dark:text-slate-200 placeholder:text-slate-300 transition-all font-light`}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
