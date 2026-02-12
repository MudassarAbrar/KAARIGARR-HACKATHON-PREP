'use client';

import { useState } from 'react';
import RequestHeader from '@/components/request/RequestHeader';
import Step1Category from '@/components/request/Step1Category';
import Step2Logistics from '@/components/request/Step2Logistics';
import Step3Confirmation from '@/components/request/Step3Confirmation';
import RequestSidebar from '@/components/request/RequestSidebar';
import { motion } from 'framer-motion';

export default function RequestServicePage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [logisticsData, setLogisticsData] = useState({
    address: '124 Arcoria Boulevard, Apt 4B',
    window: 'MORNING'
  });

  const handleCategorySelect = (id: string) => {
      setSelectedCategory(id);
      if(step === 1) setStep(2);
  };

  const handleLogisticsUpdate = (key: string, value: string) => {
    setLogisticsData(prev => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
      if(step > 1) setStep(step - 1);
  };

  const handleContinue = () => {
      if(step === 2) {
          if (!logisticsData.address.trim()) {
            alert('Please enter a valid address');
            return;
          }
          setStep(3);
      }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-800 dark:text-slate-100 pb-20 relative">
      {step === 3 && <Step3Confirmation />}
      
      <RequestHeader step={step} />
      
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-light uppercase tracking-[0.5em] text-slate-900 dark:text-white mb-4">
                R e q u e s t&nbsp;&nbsp;a&nbsp;&nbsp;S e r v i c e
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
                Precision-driven hyperlocal services for the modern architectural lifestyle. Select your category to begin.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-8 space-y-12">
                <Step1Category onSelect={handleCategorySelect} selectedCategory={selectedCategory} />
                <Step2Logistics 
                  isActive={step >= 2} 
                  data={logisticsData} 
                  onUpdate={handleLogisticsUpdate} 
                />

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-8">
                    <button 
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`px-8 py-3 text-xs uppercase tracking-widest font-bold text-slate-400 transition-colors ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        Back
                    </button>
                    <button 
                        onClick={handleContinue}
                        disabled={!selectedCategory}
                        className="px-12 py-4 bg-primary text-white rounded-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all font-bold uppercase tracking-widest text-sm disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                    >
                        Continue
                    </button>
                </div>
            </div>

            {/* Right Column: Sidebar */}
            <RequestSidebar selectedCategory={selectedCategory} />
        </div>
      </main>
    </div>
  );
}
