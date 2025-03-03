
import { Database, Settings } from "@/components/admin/types";

// Mock database - in a real application, this would be stored in a backend database
// This is a simple client-side simulation for demonstration purposes
export const initLocalDatabase = () => {
  // Initialize database if it doesn't exist
  if (!localStorage.getItem("database")) {
    const initialDatabase: Database = {
      pages: [
        { id: 1, title: "Home", url: "/", lastModified: "2023-05-15", content: "Home page content" },
        { id: 2, title: "About", url: "/about", lastModified: "2023-05-12", content: "About page content" },
        { id: 3, title: "Blog", url: "/blog", lastModified: "2023-05-10", content: "Blog page content" },
        { id: 4, title: "Contact", url: "/contact", lastModified: "2023-05-08", content: "Contact page content" },
        { id: 5, title: "Not Found", url: "*", lastModified: "2023-05-05", content: "Not found page content" },
      ],
      deals: [
        {
          id: 1,
          title: "Marriott Hotel Islamabad",
          location: "Islamabad, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 35000,
          memberPrice: 28000,
          discount: 20,
          rating: 4.8,
          description: "Luxury accommodation in the heart of Islamabad",
        },
        {
          id: 2,
          title: "Pearl Continental Lahore",
          location: "Lahore, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 29500,
          memberPrice: 23600,
          discount: 20,
          rating: 4.7,
          description: "Experience true luxury in Lahore's premier hotel",
        },
        {
          id: 3,
          title: "Movenpick Hotel Karachi",
          location: "Karachi, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 32000,
          memberPrice: 25600,
          discount: 20,
          rating: 4.6,
          description: "Elegant and modern accommodation in Karachi",
        },
        {
          id: 4,
          title: "Serena Hotel Gilgit",
          location: "Gilgit, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 27000,
          memberPrice: 21600,
          discount: 20,
          rating: 4.9,
          description: "Breathtaking views and exceptional service",
        },
      ],
      tourPackages: [
        {
          id: 1,
          title: "Hunza Valley Tour",
          location: "Hunza, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 45000,
          memberPrice: 36000,
          rating: 4.9,
          discount: 20,
          description: "Experience the natural beauty of Hunza Valley with our exclusive 5-day package tour."
        },
        {
          id: 2,
          title: "Skardu Adventure",
          location: "Skardu, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 52000,
          memberPrice: 41600,
          rating: 4.8,
          discount: 20,
          description: "Discover the breathtaking landscapes of Skardu with our 7-day adventure tour package."
        },
        {
          id: 3,
          title: "Naran Kaghan Expedition",
          location: "Naran, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1496275068113-fff8c90750d1?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 38000,
          memberPrice: 30400,
          rating: 4.7,
          discount: 20,
          description: "Explore the stunning valleys of Naran and Kaghan with our all-inclusive 4-day tour."
        },
        {
          id: 4,
          title: "Murree Getaway",
          location: "Murree, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 25000,
          memberPrice: 20000,
          rating: 4.6,
          discount: 20,
          description: "Escape to Murree for a relaxing 3-day getaway with comfortable accommodations and guided tours."
        }
      ],
      members: [
        { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", type: "Gold", date: "2023-01-15", points: 1250 },
        { id: 2, name: "Sara Ali", email: "sara@example.com", type: "Platinum", date: "2023-02-22", points: 3400 },
        { id: 3, name: "Imran Ahmed", email: "imran@example.com", type: "Silver", date: "2023-03-10", points: 750 },
        { id: 4, name: "Fatima Rizvi", email: "fatima@example.com", type: "Gold", date: "2023-04-05", points: 1800 },
      ],
      settings: {
        siteTitle: "Luxury Privilege Club",
        siteTagline: "Pakistan's Premium Hotel Loyalty Program",
        currency: "PKR",
        paymentMethods: "Credit Card, Bank Transfer",
      },
    };
    
    localStorage.setItem("database", JSON.stringify(initialDatabase));
  }
};

// Helper functions to interact with the "database"
export const getDatabase = (): Database => {
  const data = localStorage.getItem("database");
  if (!data) {
    // If database doesn't exist, initialize it
    initLocalDatabase();
    return getDatabase();
  }
  return JSON.parse(data) as Database;
};

export const saveDatabase = (data: Database) => {
  localStorage.setItem("database", JSON.stringify(data));
};

// Format price with commas
export const formatPrice = (price?: number) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};
