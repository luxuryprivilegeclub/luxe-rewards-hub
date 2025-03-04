
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BrandsCarousel from '@/components/BrandsCarousel';
import PrivilegesSection from '@/components/PrivilegesSection';
import PremiumCard from '@/components/PremiumCard';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';
import JoinNowForm from '@/components/JoinNowForm';
import { supabase } from '@/integrations/supabase/client';
import { Deal, TourPackage } from '@/components/admin/types';
import { toast } from "sonner";

const Index = () => {
  const [exclusiveDeals, setExclusiveDeals] = useState<Deal[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch deals and tour packages from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch deals
        const { data: dealsData, error: dealsError } = await supabase
          .from('deals')
          .select('*')
          .limit(4);
        
        if (dealsError) throw dealsError;

        // Fetch tour packages
        const { data: packagesData, error: packagesError } = await supabase
          .from('tour_packages')
          .select('*')
          .limit(4);
        
        if (packagesError) throw packagesError;

        // Format deals data
        const formattedDeals = dealsData.map((deal): Deal => ({
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

        // Format tour packages data
        const formattedPackages = packagesData.map((pkg): TourPackage => ({
          id: pkg.id,
          title: pkg.title,
          location: pkg.location,
          imageUrl: pkg.image_url,
          regularPrice: pkg.regular_price,
          memberPrice: pkg.member_price,
          discount: pkg.discount,
          rating: pkg.rating,
          description: pkg.description
        }));

        setExclusiveDeals(formattedDeals);
        setTourPackages(formattedPackages);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <Navbar />
      
      <main>
        <HeroSection />
        
        <BrandsCarousel />
        
        <PrivilegesSection />
        
        {/* Video Section - adjusted height */}
        <section className="py-20 bg-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">
                <span className="text-luxury-gradient">Experience Luxury</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Watch how our premium membership transforms your hotel booking experience.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation type="scale" className="max-w-4xl mx-auto">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg border border-luxury-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/zvP-BoDL9I0" 
                  title="Premium Hotel Experience" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </ScrollAnimation>
          </div>
        </section>
        
        {/* Exclusive Deals Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">
                <span className="text-luxury-gradient">Exclusive Deals</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Discover our exclusive hotel deals with privileged member rates below market prices.
              </p>
            </ScrollAnimation>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
              </div>
            ) : exclusiveDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {exclusiveDeals.map((deal, index) => (
                  <ScrollAnimation key={deal.id} type="scale" delay={index * 100}>
                    <PremiumCard
                      title={deal.title}
                      location={deal.location}
                      imageUrl={deal.imageUrl}
                      regularPrice={deal.regularPrice}
                      memberPrice={deal.memberPrice}
                      rating={deal.rating}
                      discount={deal.discount}
                    />
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">No deals available at the moment. Please check back later.</p>
              </div>
            )}
            
            <div className="text-center mt-12">
              <Link to="/deals">
                <Button 
                  variant="outline" 
                  className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
                >
                  View All Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Tour Packages Section */}
        <section className="py-20 bg-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">
                <span className="text-luxury-gradient">Tour Packages</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Explore our exclusive tour packages with special member prices and unforgettable experiences.
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
                    <PremiumCard
                      title={tour.title}
                      location={tour.location}
                      imageUrl={tour.imageUrl}
                      regularPrice={tour.regularPrice}
                      memberPrice={tour.memberPrice}
                      rating={tour.rating}
                      discount={tour.discount}
                    />
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">No tour packages available at the moment. Please check back later.</p>
              </div>
            )}
            
            <div className="text-center mt-12">
              <Link to="/tours">
                <Button 
                  variant="outline" 
                  className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
                >
                  View All Tour Packages
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Membership Benefits */}
        <section className="py-20 bg-gradient-to-b from-black to-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <ScrollAnimation type="slideUp" className="relative">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border border-luxury-gold/10">
                    <img 
                      src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1774&auto=format&fit=crop" 
                      alt="Premium Membership" 
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Floating card */}
                    <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-lg backdrop-blur-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-luxury-gold font-display font-medium">Premium Membership</h4>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-luxury-gold mx-0.5"></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-white/80 text-sm">Join now to access privileged rates and exclusive benefits.</p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              
              <div className="lg:w-1/2">
                <ScrollAnimation type="fadeIn">
                  <span className="inline-block px-3 py-1 text-xs bg-luxury-gold/20 text-luxury-gold font-medium rounded-full mb-4">
                    Membership Benefits
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                    Join Our <span className="text-luxury-gradient">Elite Loyalty Program</span>
                  </h2>
                  
                  <p className="text-white/70 mb-8">
                    Our membership program is designed to offer you exceptional value with every hotel booking.
                    Join now to enjoy reduced rates, luxury privileges, and a rewarding points system.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Guaranteed lowest rates compared to OTAs",
                      "Earn loyalty points with every booking",
                      "Exclusive members-only promotions",
                      "24/7 dedicated customer support",
                      "No booking fees or hidden charges"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center mr-3">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-white/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <JoinNowForm />
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollAnimation type="fadeIn">
                <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                  Ready to Experience <span className="text-luxury-gradient">Premium Benefits?</span>
                </h2>
                
                <p className="text-white/70 mb-8">
                  Join Pakistan's leading hotel rewards program today and start enjoying exclusive rates 
                  and luxury privileges at top hotels worldwide.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <JoinNowForm />
                  <Link to="/about">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold font-medium min-w-[160px]"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
