import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Homeowner, Austin',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClogkgEc_TgWCgIycNQwTgkFv5Po0Wni9ZCZL46dcnxPVk8MnBt_MgpCjs4Ec5WE2e-ppAg0RY-MToC3b8pUlR4hGqIE2AjbBbdK9d0eUVcrgk9HU7DXuasArFJTEOyoit59Mlvuc8L8-P12bgJC6RykABdX2ZEdBdFCmuGCYfzhN0abEulZiQGyrnoQcXFnx8CxaGm34g-VMzjPcFcS46AmZuJdOQz4Mvf4-C2J1VHoTjLskDFpBz_JzzogGsajKOMJLJBTipi8Bo',
      quote: 'Karigar made finding a plumber so easy. The provider was verified, arrived on time, and the quality of work was exceptional. Highly recommended!',
    },
    {
      name: 'David Chen',
      role: 'Business Owner, New York',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5pvW9mNZdJL_vnzKqxF4MFN0x_HTstVYsHSlnwJLhRRQyGQT-0r36c2_80JkqtAe-JYjTAOX7la5pIiWuMznNM8N-4DvFCm1q8Ck0m6mJAswTSW18zAmm53aZ4qKX43vZPO4Cw4dHB9SjydtieRVOmI0S5an5TnKVpkqB8hAbtlc0oR0EG0VLJagPz91PUJquDLUvwaHSwzZ3WF7wBvVps7yUhOrZc8d3QFiCfAOjz8mKG8taY54H4mnlFBafOChD1IyLJ2Uq__M',
      quote: 'As a restaurant owner, I need reliable electricians fast. Karigar has become my go-to platform for all maintenance needs. The transparency is great.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <h2 className="text-4xl font-bold max-w-md animate-slide-in-left">What our community is saying</h2>
          <div className="flex gap-4 animate-fade-in">
            <button
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-icons" aria-hidden="true">chevron_left</span>
            </button>
            <button
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-icons" aria-hidden="true">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-10 rounded-2xl bg-slate-50 dark:bg-slate-900/50 relative animate-slide-up hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="material-icons text-primary/20 text-6xl absolute top-8 right-10">
                format_quote
              </span>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 relative">
                  <Image
                    alt={testimonial.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                    src={testimonial.image}
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-lg italic text-slate-700 dark:text-slate-300 relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-6 flex text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-icons text-sm">
                    star
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
