export default function ServicesSection() {
  const services = [
    { icon: 'plumbing', name: 'Plumbing', description: 'Leaks, installations & repairs' },
    { icon: 'bolt', name: 'Electrical', description: 'Wiring, fixtures & safety' },
    { icon: 'carpenter', name: 'Carpentry', description: 'Furniture & wood work' },
    { icon: 'format_paint', name: 'Painting', description: 'Interior & exterior finish' },
    { icon: 'cleaning_services', name: 'Cleaning', description: 'Deep cleaning & sanitizing' },
    { icon: 'yard', name: 'Gardening', description: 'Landscaping & maintenance' },
    { icon: 'foundation', name: 'Masonry', description: 'Brickwork & construction' },
    { icon: 'settings_input_component', name: 'Appliances', description: 'Repair & servicing' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="group p-8 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-slate-50 dark:bg-slate-900/50 animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="material-icons text-primary text-4xl mb-4 group-hover:scale-110 transition-transform block">
                {service.icon}
              </span>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{service.name}</h3>
              <p className="text-sm text-slate-500 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
