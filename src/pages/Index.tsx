
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PremiumCard from '@/components/PremiumCard';
import ScrollAnimation from '@/components/ScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { Deal, TourPackage, Settings } from '@/components/admin/types';
import { formatPrice } from '@/utils/database';

const Index = () => {
  const [featuredDeals, setFeaturedDeals] = useState<Deal[]>([]);
  const [featuredTours, setFeaturedTours] = useState<TourPackage[]>([]);
  const [settings, setSettings] = useState<Settings>({
    siteTitle: "Luxury Privilege Club",
    siteTagline: "Pakistan's Premium Hotel Loyalty Program",
    currency: "PKR",
    paymentMethods: "Credit Card, Bank Transfer",
    silverPrice: 35000,
    goldPrice: 70000,
    platinumPrice: 150000
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch featured deals
        const { data: dealsData, error: dealsError } = await supabase
          .from('deals')
          .select('*')
          .limit(4);

        if (dealsError) {
          throw dealsError;
        }

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

        setFeaturedDeals(formattedDeals);

        // Fetch featured tours
        const { data: toursData, error: toursError } = await supabase
          .from('tour_packages')
          .select('*')
          .limit(4);

        if (toursError) {
          throw toursError;
        }

        const formattedTours = toursData.map((tour): TourPackage => ({
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

        setFeaturedTours(formattedTours);

        // Fetch settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('settings')
          .select('*')
          .limit(1);

        if (settingsError) {
          throw settingsError;
        }

        if (settingsData && settingsData.length > 0) {
          setSettings({
            siteTitle: settingsData[0].site_title,
            siteTagline: settingsData[0].site_tagline,
            currency: settingsData[0].currency,
            paymentMethods: settingsData[0].payment_methods,
            silverPrice: settingsData[0].silver_price || 35000,
            goldPrice: settingsData[0].gold_price || 70000,
            platinumPrice: settingsData[0].platinum_price || 150000
          });
        }
      } catch (error) {
        console.error('Error fetching featured content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <Helmet>
        <title>Luxury Privilege Club | Pakistan's Premium Hotel Loyalty Program</title>
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero section */}
        <HeroSection />
        
        {/* Featured Deals Section */}
        <section className="py-16 md:py-24 bg-luxury-rich-black relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                  Exclusive <span className="text-luxury-gradient">Hotel Deals</span>
                </h2>
                <p className="text-white/70 md:text-lg">
                  Handpicked luxury hotel experiences at member-only prices
                </p>
              </div>
              <Link to="/deals" className="group inline-flex items-center text-luxury-gold hover:text-white transition-colors">
                <span className="mr-2">View All Deals</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredDeals.length > 0 ? (
                featuredDeals.map((deal, index) => (
                  <ScrollAnimation key={deal.id} type="scale" delay={index * 100}>
                    <PremiumCard
                      id={deal.id || 0}
                      title={deal.title}
                      location={deal.location}
                      imageUrl={deal.imageUrl}
                      regularPrice={deal.regularPrice}
                      memberPrice={deal.memberPrice}
                      rating={deal.rating}
                      discount={deal.discount}
                    />
                  </ScrollAnimation>
                ))
              ) : (
                <>
                  {/* Placeholder cards while loading */}
                  {[1, 2, 3, 4].map(index => (
                    <div key={index} className="rounded-xl overflow-hidden bg-black/50 animate-pulse">
                      <div className="h-52 bg-black/70"></div>
                      <div className="p-4">
                        <div className="h-6 bg-black/70 mb-2"></div>
                        <div className="h-4 bg-black/70 mb-4"></div>
                        <div className="h-10 bg-black/70"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-24 bg-black relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                Experience <span className="text-luxury-gradient">Luxury Living</span>
              </h2>
              <p className="text-white/70 md:text-lg">
                Watch how our members enjoy exclusive privileges at Pakistan's finest hotels
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto overflow-hidden rounded-xl shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 bg-black">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Luxury Privilege Club Experience" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </section>
        
        {/* Membership Price Section */}
        <section className="py-16 md:py-24 bg-luxury-rich-black relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                Membership <span className="text-luxury-gradient">Tiers</span>
              </h2>
              <p className="text-white/70 md:text-lg">
                Choose the privilege level that suits your lifestyle
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Silver Tier */}
              <ScrollAnimation type="fadeIn" delay={100}>
                <div className="bg-gradient-to-b from-[#C0C0C0]/10 to-black rounded-xl p-6 border border-[#C0C0C0]/30 hover:shadow-[0_8px_30px_rgba(192,192,192,0.2)] transition-shadow duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#C0C0C0]/20 flex items-center justify-center mb-4">
                      <span className="text-[#C0C0C0] text-2xl font-bold">S</span>
                    </div>
                    <h3 className="text-2xl font-medium text-[#C0C0C0] mb-2">Silver</h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      {settings.currency} {formatPrice(settings.silverPrice)}
                    </div>
                    <p className="text-white/70">Perfect for occasional travelers seeking special rates and basic privileges.</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#C0C0C0] mr-2" />
                      <span>Special member rates</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#C0C0C0] mr-2" />
                      <span>Earn points on bookings</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#C0C0C0] mr-2" />
                      <span>Priority customer service</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <button className="w-full py-3 px-6 bg-[#C0C0C0]/20 hover:bg-[#C0C0C0]/30 text-white rounded-lg transition-colors">
                      Join Silver
                    </button>
                  </Link>
                </div>
              </ScrollAnimation>
              
              {/* Gold Tier */}
              <ScrollAnimation type="fadeIn" delay={200}>
                <div className="bg-gradient-to-b from-[#FFD700]/10 to-black rounded-xl p-6 border border-[#FFD700]/30 hover:shadow-[0_8px_30px_rgba(255,215,0,0.2)] transition-shadow duration-300 transform scale-105 -mt-2">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-luxury-gold text-black text-xs px-4 py-1 rounded-full font-semibold">
                    Most Popular
                  </div>
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#FFD700]/20 flex items-center justify-center mb-4">
                      <span className="text-[#FFD700] text-2xl font-bold">G</span>
                    </div>
                    <h3 className="text-2xl font-medium text-[#FFD700] mb-2">Gold</h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      {settings.currency} {formatPrice(settings.goldPrice)}
                    </div>
                    <p className="text-white/70">Enhanced benefits for frequent travelers who want premium service and better perks.</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#FFD700] mr-2" />
                      <span>All Silver benefits</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#FFD700] mr-2" />
                      <span>Room upgrades when available</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#FFD700] mr-2" />
                      <span>Early check-in & late check-out</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#FFD700] mr-2" />
                      <span>Exclusive event invitations</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <button className="w-full py-3 px-6 bg-luxury-gold text-black rounded-lg transition-colors hover:bg-luxury-dark-gold font-medium">
                      Join Gold
                    </button>
                  </Link>
                </div>
              </ScrollAnimation>
              
              {/* Platinum Tier */}
              <ScrollAnimation type="fadeIn" delay={300}>
                <div className="bg-gradient-to-b from-[#E5E4E2]/10 to-black rounded-xl p-6 border border-[#E5E4E2]/30 hover:shadow-[0_8px_30px_rgba(229,228,226,0.2)] transition-shadow duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#E5E4E2]/20 flex items-center justify-center mb-4">
                      <span className="text-[#E5E4E2] text-2xl font-bold">P</span>
                    </div>
                    <h3 className="text-2xl font-medium text-[#E5E4E2] mb-2">Platinum</h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      {settings.currency} {formatPrice(settings.platinumPrice)}
                    </div>
                    <p className="text-white/70">The ultimate luxury experience for the discerning traveler who demands the very best.</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#E5E4E2] mr-2" />
                      <span>All Gold benefits</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#E5E4E2] mr-2" />
                      <span>Guaranteed upgrades</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#E5E4E2] mr-2" />
                      <span>Personal travel concierge</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#E5E4E2] mr-2" />
                      <span>Complimentary airport transfers</span>
                    </li>
                    <li className="flex items-center text-white/80">
                      <Check size={16} className="text-[#E5E4E2] mr-2" />
                      <span>VIP access to partner facilities</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <button className="w-full py-3 px-6 bg-[#E5E4E2]/20 hover:bg-[#E5E4E2]/30 text-white rounded-lg transition-colors">
                      Join Platinum
                    </button>
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        
        {/* Privileges Section */}
        <section className="py-16 md:py-24 bg-black relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                Unlock Exclusive <span className="text-luxury-gradient">Privileges</span>
              </h2>
              <p className="text-white/70 md:text-lg">
                As a member, enjoy a world of unparalleled luxury and bespoke services
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Privilege Card 1 */}
              <div className="bg-luxury-rich-black rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/20 flex items-center justify-center mb-4">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-concierge-bell"><path d="M2 3v3"/><path d="M22 3v3"/><path d="M2 6h20"/><path d="M12 6v11"/><path d="M5 17h14"/><path d="M5 21h14"/><path d="M8 6a4 4 0 0 1 8 0"/></svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Dedicated Concierge</h3>
                <p className="text-white/70">Personalized assistance for all your travel needs, from booking to itinerary planning.</p>
              </div>
              
              {/* Privilege Card 2 */}
              <div className="bg-luxury-rich-black rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/20 flex items-center justify-center mb-4">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gem"><path d="M6 3h12l6 8-6 8H6L0 11Z"/><path d="M6 3v4"/><path d="M18 3v4"/><path d="M6 19v-4"/><path d="M18 19v-4"/></svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Exclusive Events</h3>
                <p className="text-white/70">Invitations to private events, galas, and cultural experiences around the globe.</p>
              </div>
              
              {/* Privilege Card 3 */}
              <div className="bg-luxury-rich-black rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/20 flex items-center justify-center mb-4">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins"><path d="M17 6h5"/><path d="M2 18h5"/><path d="M6 14.83A2 2 0 1 0 7.83 13 2 2 0 0 0 6 14.83z"/><path d="M18 14.83A2 2 0 1 0 19.83 13 2 2 0 0 0 18 14.83z"/><path d="M12 14.83A2 2 0 1 0 13.83 13 2 2 0 0 0 12 14.83z"/><path d="M8.6 8.64A9 9 0 1 1 15.36 15.4"/></svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Loyalty Rewards</h3>
                <p className="text-white/70">Earn points with every booking and redeem them for upgrades, free nights, and more.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-luxury-rich-black relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                What Our <span className="text-luxury-gradient">Members Say</span>
              </h2>
              <p className="text-white/70 md:text-lg">
                Real stories from our valued members who have experienced the luxury difference
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="bg-black rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] transition-shadow duration-300">
                <p className="text-white/80 italic mb-4">"The concierge service is exceptional. They anticipated my needs and made my trip seamless and stress-free."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 mr-4">
                    {/* Member Avatar */}
                    <img src="https://i.pravatar.cc/150?img=7" alt="Member Avatar" className="w-full h-full object-cover rounded-full" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Aisha Khan</h4>
                    <p className="text-white/60 text-sm">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Card 2 */}
              <div className="bg-black rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] transition-shadow duration-300">
                <p className="text-white/80 italic mb-4">"I've discovered hotels I never knew existed, all at incredible member-only prices. It's truly a game-changer for luxury travel."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 mr-4">
                    {/* Member Avatar */}
                    <img src="https://i.pravatar.cc/150?img=11" alt="Member Avatar" className="w-full h-full object-cover rounded-full" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Omar Farooq</h4>
                    <p className="text-white/60 text-sm">Karachi, Pakistan</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Card 3 */}
              <div className="bg-black rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] transition-shadow duration-300">
                <p className="text-white/80 italic mb-4">"The exclusive events are a highlight. I've met fascinating people and experienced unforgettable moments thanks to this club."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 mr-4">
                    {/* Member Avatar */}
                    <img src="https://i.pravatar.cc/150?img=22" alt="Member Avatar" className="w-full h-full object-cover rounded-full" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Fatima Khan</h4>
                    <p className="text-white/60 text-sm">Islamabad, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tour Packages Section */}
        <section className="py-16 md:py-24 bg-black relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                  Luxury <span className="text-luxury-gradient">Tour Packages</span>
                </h2>
                <p className="text-white/70 md:text-lg">
                  Discover Pakistan with our exclusive guided tour experiences
                </p>
              </div>
              <Link to="/tours" className="group inline-flex items-center text-luxury-gold hover:text-white transition-colors">
                <span className="mr-2">View All Tours</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredTours.length > 0 ? (
                featuredTours.map((tour, index) => (
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
                    />
                  </ScrollAnimation>
                ))
              ) : (
                <>
                  {/* Placeholder cards while loading */}
                  {[1, 2, 3, 4].map(index => (
                    <div key={index} className="rounded-xl overflow-hidden bg-black/50 animate-pulse">
                      <div className="h-52 bg-black/70"></div>
                      <div className="p-4">
                        <div className="h-6 bg-black/70 mb-2"></div>
                        <div className="h-4 bg-black/70 mb-4"></div>
                        <div className="h-10 bg-black/70"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-24 bg-luxury-rich-black relative">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
              Ready to Experience <span className="text-luxury-gradient">Luxury?</span>
            </h2>
            <p className="text-white/70 md:text-lg mb-8">
              Join the Luxury Privilege Club today and unlock a world of exclusive benefits.
            </p>
            <Link to="/register">
              <button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                Become a Member
              </button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
