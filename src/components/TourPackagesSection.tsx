
import React from "react";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { useNavigate } from "react-router-dom";

interface TourPackage {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  regularPrice: number;
  memberPrice: number;
  rating: number;
  discount: number;
  description: string;
}

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TourCard = ({ tour }: { tour: TourPackage }) => {
  const navigate = useNavigate();
  
  return (
    <div className="luxury-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] group">
      {/* Image container with overlay */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={tour.imageUrl} 
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-luxury-gold text-black text-xs font-bold px-2 py-1 rounded">
          {tour.discount}% OFF
        </div>
        
        {/* Location */}
        <div className="absolute bottom-3 left-3 text-white/90 text-sm">
          {tour.location}
        </div>
        
        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center">
          <Star size={14} className="text-luxury-gold mr-1" fill="#FFD700" />
          <span className="text-white/90 text-sm">{tour.rating}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-2 truncate">{tour.title}</h3>
        
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-1">
            <span className="text-white/60 text-sm line-through mr-2">
              PKR {formatPrice(tour.regularPrice)}
            </span>
            <span className="text-xs bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded">
              Standard Rate
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-white font-semibold mr-2">
              PKR {formatPrice(tour.memberPrice)}
            </span>
            <span className="text-xs bg-luxury-gold/30 text-luxury-gold font-medium px-2 py-0.5 rounded">
              Member Rate
            </span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-white text-black hover:bg-luxury-gold transition-colors duration-300"
          onClick={() => navigate(`/tours/${tour.id}`)}
        >
          View Tour
        </Button>
      </div>
    </div>
  );
};

const TourPackagesSection = () => {
  // Sample tour packages data (in a real app, this would be fetched from the database)
  const tourPackages: TourPackage[] = [
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
  ];

  return (
    <section className="py-20 bg-luxury-rich-black">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation type="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">
            <span className="text-luxury-gradient">Exclusive Tour Packages</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our handpicked tour packages in Pakistan's most beautiful destinations with special member rates.
          </p>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {tourPackages.map((tour, index) => (
            <ScrollAnimation key={tour.id} type="scale" delay={index * 100}>
              <TourCard tour={tour} />
            </ScrollAnimation>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
            onClick={() => window.location.href = '/tours'}
          >
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourPackagesSection;
