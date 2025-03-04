
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PremiumCard from '@/components/PremiumCard';
import ScrollAnimation from '@/components/ScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { TourPackage } from '@/components/admin/types';
import { toast } from "sonner";

const Tours = () => {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tour packages directly from Supabase
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tour_packages')
          .select('*');
        
        if (error) {
          throw error;
        }

        // Map Supabase data to TourPackage type
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

        setTours(formattedTours);
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        toast.error("Failed to load tour packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="app-container">
      <Helmet>
        <title>Luxury Tour Packages | Luxury Privilege Club</title>
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Header */}
        <section className="pt-32 pb-20 bg-black relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-4">
                <span className="text-luxury-gradient">Luxury Tour Packages</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8">
                Discover the beauty of Pakistan with our exclusive guided tours, designed for discerning travelers.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tours Grid */}
        <section className="py-20 bg-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
              </div>
            ) : tours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                {tours.map((tour, index) => (
                  <ScrollAnimation key={tour.id} type="scale" delay={index * 100}>
                    <PremiumCard
                      id={tour.id || 0}
                      title={tour.title}
                      location={tour.location}
                      imageUrl={tour.imageUrl}
                      regularPrice={tour.regularPrice}
                      memberPrice={tour.memberPrice}
                      rating={tour.rating}
                      discount={tour.discount}
                      className="h-full"
                    />
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">No tour packages available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tours;
