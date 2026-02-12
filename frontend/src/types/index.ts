// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'provider' | 'admin';
  avatar?: string;
  createdAt: Date;
}

// Artisan Types
export interface Artisan {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  rate: string;
  image: string;
  verified?: boolean;
  badge?: string;
  location?: string;
  title?: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
}

// Request Types
export interface ServiceRequest {
  id: string;
  category: string;
  location: string;
  description?: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: Date;
  customerId: string;
  providerId?: string;
}

// Navigation Types
export interface NavItem {
  icon: string;
  label: string;
  href: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ServiceRequestFormData {
  category: string;
  location: string;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  description: string;
}
