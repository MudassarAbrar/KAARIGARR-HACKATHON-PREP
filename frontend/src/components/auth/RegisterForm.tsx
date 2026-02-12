'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterForm() {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'provider',
  });

  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    await register(formData.name, formData.email, formData.role);
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
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-transparent border ${errors.name ? 'border-red-500 hover:border-red-600' : 'border-slate-200 dark:border-slate-800 focus:border-primary'} focus:ring-0 rounded-lg py-4 px-4 text-slate-800 dark:text-slate-200 placeholder:text-slate-300 transition-all font-light`}
            placeholder="John Doe"
            autoComplete="name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
          >
            Email Address
          </label>
          <input
            id="register-email"
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
          <label
            htmlFor="register-password"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
          >
            Password
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className={`w-full bg-transparent border ${errors.password ? 'border-red-500 hover:border-red-600' : 'border-slate-200 dark:border-slate-800 focus:border-primary'} focus:ring-0 rounded-lg py-4 px-4 text-slate-800 dark:text-slate-200 placeholder:text-slate-300 transition-all font-light`}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full bg-transparent border ${errors.confirmPassword ? 'border-red-500 hover:border-red-600' : 'border-slate-200 dark:border-slate-800 focus:border-primary'} focus:ring-0 rounded-lg py-4 px-4 text-slate-800 dark:text-slate-200 placeholder:text-slate-300 transition-all font-light`}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
        </div>

        {/* Role Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            I want to join as a
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'customer' })}
              className={`flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                formData.role === 'customer'
                  ? 'border-2 border-primary bg-primary/5 text-primary'
                  : 'border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary/50'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'provider' })}
              className={`flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                formData.role === 'provider'
                  ? 'border-2 border-primary bg-primary/5 text-primary'
                  : 'border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary/50'
              }`}
            >
              Provider
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-xs text-center text-slate-500">
        By registering, you agree to our{' '}
        <a href="/terms" className="text-primary hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
