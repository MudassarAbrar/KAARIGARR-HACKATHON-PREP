export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Search for Service',
      description: 'Browse through our extensive catalog of skilled artisans and select the service you need.',
    },
    {
      number: '02',
      title: 'Book an Expert',
      description: 'Choose a verified provider based on ratings, reviews, and proximity to your location.',
    },
    {
      number: '03',
      title: 'Get it Done',
      description: 'Relax while our professionals handle the task. Pay securely only after satisfaction.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background-light dark:bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16 animate-slide-in-left">
          <h2 className="text-4xl font-bold mb-4">Simple Process, Quality Results</h2>
          <p className="text-slate-500">
            We've streamlined the way you find and hire local experts.
            Professional help is just a few clicks away.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 z-0"></div>
          {steps.map((step, index) => (
            <div key={step.number} className="relative z-10 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-16 h-16 bg-white dark:bg-background-dark border-4 border-primary rounded-full flex items-center justify-center mb-6 shadow-xl">
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
