
export interface Page {
  id?: number;
  title: string;
  url: string;
  lastModified?: string;
  content: string;
}

export interface Deal {
  id?: number;
  title: string;
  location: string;
  imageUrl: string;
  regularPrice: number;
  memberPrice: number;
  discount: number;
  rating: number;
  description: string;
}

export interface TourPackage {
  id?: number;
  title: string;
  location: string;
  imageUrl: string;
  regularPrice: number;
  memberPrice: number;
  discount: number;
  rating: number;
  description: string;
}

export interface Member {
  id?: number;
  name: string;
  email: string;
  type: string;
  date?: string;
  points: number;
}

export interface Booking {
  id?: number;
  deal_id: number;
  deal_title: string;
  name: string;
  email: string;
  phone: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  amount: number;
  status: string;
  created_at?: string;
}

export interface Settings {
  siteTitle: string;
  siteTagline: string;
  currency: string;
  paymentMethods: string;
  silverPrice?: number;
  goldPrice?: number;
  platinumPrice?: number;
}

export interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  lastModified?: string;
}

export interface Testimonial {
  id?: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface MembershipFeature {
  id?: number;
  membershipType: 'Silver' | 'Gold' | 'Platinum';
  feature: string;
  included: boolean;
}

export interface Database {
  pages: Page[];
  deals: Deal[];
  tourPackages: TourPackage[];
  members: Member[];
  bookings: Booking[];
  settings: Settings;
  blogs: BlogPost[];
  testimonials: Testimonial[];
  membershipFeatures: MembershipFeature[];
}
