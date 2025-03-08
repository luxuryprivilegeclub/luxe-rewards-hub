
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TourPackage } from "@/components/admin/types";
import { toast } from "sonner";

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
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('tour_packages')
          .select('*')
          .limit(4); // Only fetch 4 tours for homepage display
        
        if (error) {
          throw error;
        }
        
        // Map to TourPackage type
        const formattedTours = data.map((tour): TourPackage => ({
          id: tour.id,
          title: tour.title,
          location: tour.location,
          imageUrl: tour.image_url,
          regularPrice: tour.regular_price,
          memberPrice: tour.member_price,
          discount: tour.discount,
          rating: tour.rating,
          description: tour.description
        }));
        
        setTourPackages(formattedTours);
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        toast.error("Failed to load tour packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTourPackages();
  }, []);

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
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
          </div>
        ) : tourPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {tourPackages.map((tour, index) => (
              <ScrollAnimation key={tour.id} type="scale" delay={index * 100}>
                <TourCard tour={tour} />
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No tour packages available at the moment. Please check back later.</p>
          </div>
        )}
        
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
