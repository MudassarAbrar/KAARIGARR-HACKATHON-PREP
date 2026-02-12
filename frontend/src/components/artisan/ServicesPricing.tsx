'use client';

const services = [
  { title: "Custom Furniture", sub: "Bespoke design & build", price: "Starts ₹15k" },
  { title: "Antique Restoration", sub: "Historical accuracy", price: "₹800/hr" },
  { title: "Wood Consultation", sub: "Material & design advice", price: "₹1,500" },
  { title: "Repair & Refinish", sub: "Minor fixes & polishing", price: "₹500/hr" },
];

export default function ServicesPricing({ artisan }: { artisan: any }) {
  // console.log(artisan); // Suppress unused warning
  return (
    <section className="bg-white dark:bg-background-dark p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white font-serif">Services & Pricing</h3>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className={`flex justify-between items-center py-3 ${index !== services.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
            <div>
              <p className="font-medium text-slate-900 dark:text-white font-display">{service.title}</p>
              <p className="text-xs text-slate-400 italic font-display">{service.sub}</p>
            </div>
            <span className="text-primary font-bold font-display">{service.price}</span>
          </div>
        ))}
      </div>
      <button className="w-full bg-primary/10 text-primary py-3 rounded-full font-bold mt-8 hover:bg-primary/20 transition-all uppercase tracking-widest text-xs font-display">
        View Full Price List
      </button>
    </section>
  );
}
