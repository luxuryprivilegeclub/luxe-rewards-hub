
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PremiumCard from '@/components/PremiumCard';
import ScrollAnimation from '@/components/ScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { Deal } from '@/components/admin/types';
import { toast } from "sonner";

const Deals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch deals directly from Supabase
  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('deals')
          .select('*');
        
        if (error) {
          throw error;
        }

        // Map Supabase data to Deal type
        const formattedDeals = data.map((deal): Deal => ({
          id: deal.id,
          title: deal.title,
          location: deal.location,
          imageUrl: deal.image_url,
          regularPrice: deal.regular_price,
          memberPrice: deal.member_price,
          discount: deal.discount,
          rating: deal.rating,
          description: deal.description
        }));

        setDeals(formattedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
        toast.error("Failed to load deals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
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
        <title>Exclusive Deals | Luxury Privilege Club</title>
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Header */}
        <section className="pt-32 pb-20 bg-black relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-4">
                <span className="text-luxury-gradient">Exclusive Deals</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8">
                Discover our handpicked selection of luxury hotel deals with privileged member rates below market prices.
              </p>
            </div>
          </div>
        </section>
        
        {/* Deals Grid */}
        <section className="py-20 bg-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
              </div>
            ) : deals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                {deals.map((deal, index) => (
                  <ScrollAnimation key={deal.id} type="scale" delay={index * 100}>
                    <PremiumCard
                      title={deal.title}
                      location={deal.location}
                      imageUrl={deal.imageUrl}
                      regularPrice={deal.regularPrice}
                      memberPrice={deal.memberPrice}
                      rating={deal.rating}
                      discount={deal.discount}
                      className="h-full"
                    />
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">No deals available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
