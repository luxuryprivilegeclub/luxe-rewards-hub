
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PremiumCard from '@/components/PremiumCard';
import ScrollAnimation from '@/components/ScrollAnimation';
import { getDatabase } from '@/utils/database';
import { TourPackage } from '@/components/admin/types';

const Tours = () => {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tour packages from database
  useEffect(() => {
    try {
      const db = getDatabase();
      setTourPackages(db.tourPackages || []);
    } catch (error) {
      console.error('Error fetching tour packages:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Scroll reveal function
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <Helmet>
        <title>Tour Packages | Luxury Privilege Club</title>
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Header */}
        <section className="pt-32 pb-20 bg-black relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-4">
                <span className="text-luxury-gradient">Tour Packages</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8">
                Discover exclusive tour packages with special member discounts for unforgettable experiences.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tour Packages Grid */}
        <section className="py-20 bg-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
              </div>
            ) : tourPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                {tourPackages.map((tour, index) => (
                  <ScrollAnimation key={tour.id} type="scale" delay={index * 100}>
                    <PremiumCard
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
