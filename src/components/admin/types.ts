
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

export interface Settings {
  siteTitle: string;
  siteTagline: string;
  currency: string;
  paymentMethods: string;
}

export interface Database {
  pages: Page[];
  deals: Deal[];
  tourPackages: TourPackage[];
  members: Member[];
  settings: Settings;
}
