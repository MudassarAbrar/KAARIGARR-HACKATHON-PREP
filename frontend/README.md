# Karigar Frontend 🏗️

A stunning, Arcoria-inspired Next.js frontend for the Karigar hyperlocal services marketplace.

## 🎨 Design Features

### **Arcoria-Inspired Aesthetic**
- Elegant, minimalist architecture with refined typography
- Sophisticated neutral color palette (soft greys, warm whites, teal accents)
- Dramatic letter spacing on brand elements  
- Generous whitespace and architectural precision
- Smooth animations and fluid transitions
- Glassmorphism navigation with backdrop blur
  
### **Color System**
- **Primary**: `#13daec` (Teal)
- **Background Light**: `#f6f8f8`
- **Background Dark**: `#102022`

### **Typography**
- **Font**: Manrope (200-800 weights)
- Google Fonts integration
- Refined hierarchical structure

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see your site.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Manrope font
│   │   ├── page.tsx             # Homepage
│   │   └── globals.css          # Global styles + Arcoria theme
│   └── components/
│       ├── Navigation.tsx       # Glassmorphism nav bar
│       ├── Footer.tsx           # Footer with newsletter
│       └── home/
│           ├── HeroSection.tsx          # Hero with CTA
│           ├── ServicesSection.tsx      # 8 service categories
│           ├── HowItWorksSection.tsx    # 3-step process
│           └── TestimonialsSection.tsx  # Customer reviews
├── tailwind.config.js          # Tailwind with custom theme
├── next.config.mjs
└── package.json
```

## 🎯 Components

### **Navigation**
- Fixed glassmorphism header with blur effect
- Responsive design with mobile menu support
- Primary action CTAs (Sign In, Register)

### **Hero Section**
- Full-screen hero with gradient overlay
- Dramatic "K A R I G A R" letter spacing
- Dual CTAs: "Find a Service" & "Become a Provider"
- Trust indicators (500+ providers, 4.9★ rating)

### **Services Section**
- Grid of 8 service categories
- Material Icons integration
- Hover effects with scale animation
- Categories: Plumbing, Electrical, Carpentry, Painting, Cleaning, Gardening, Masonry, Appliances

### **How It Works**
- 3-step process visualization
- Numbered badges with connecting line
- Clean, intuitive user journey

### **Testimonials**
- Customer reviews with profile images
- 5-star ratings
- Quote styling with elegant cards

### **Footer**
- 4-column grid layout
- Newsletter subscription
- Social media links
- Quick navigation

## 🎨 Design System

### **Custom Utilities**
```css
.hero-tracking       /* 0.8em letter spacing */
.glass-nav          /* Glassmorphism backdrop blur */
.gradient-overlay   /* Arcoria-style gradient */
.animate-fade-in    /* Fade in animation */
.animate-slide-up   /* Slide up animation */
```

### **Animations**
- Fade in on scroll
- Slide up on appear
- Scale on hover
- Smooth transitions (0.3s)

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Manrope)
- **Icons**: Material Icons
- **Images**: Next/Image optimization

## 📱 Responsive Design

- Desktop-first approach (matches Stitch designs)
- Breakpoints: `md:` (768px+)
- Mobile navigation ready (toggle implemented)

## 🎭 Theme Support

- Light mode (default)
- Dark mode ready (`.dark` class)
- CSS variables for easy customization

## 🔗 Reference

Based on Stitch MCP designs in:
```
design/design-reference/stitch-karigar-marketplace-homepage/
```

## 📝 Next Steps

1. ✅ Homepage complete
2. ⏳ Create additional pages:
   - `/about` - About page   
   - `/services` - Services catalog with filters
   - `/auth` - Authentication (Sign In/Register)
   - `/dashboard` - Customer dashboard
   - `/provider/dashboard` - Provider dashboard
   - `/admin/dashboard` - Admin dashboard
3. ⏳ Integrate with Supabase backend
4. ⏳ Add authentication with Supabase Auth
5. ⏳ Implement service request workflow
6. ⏳ Add real-time notifications

## 🎯 Performance

- Next.js Image optimization
- Font optimization with `next/font`
- CSS-in-JS with Tailwind
- Production build optimization

## 📄 License

Part of the Karigar Hackathon Prep project.

---

**Built with ❤️ using Stitch MCP designs and Next.js**
