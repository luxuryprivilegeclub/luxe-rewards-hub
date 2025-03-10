
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PremiumCard from "@/components/PremiumCard";
import BrandsCarousel from "@/components/BrandsCarousel";
import PrivilegesSection from "@/components/PrivilegesSection";
import TourPackagesSection from "@/components/TourPackagesSection";
import JoinNowForm from "@/components/JoinNowForm";
import ScrollAnimation from "@/components/ScrollAnimation";
import MembersTestimony from "@/components/MembersTestimony";
import { getDatabase, formatPrice } from "@/utils/database";
import { Check } from "lucide-react";
import { Settings } from "@/components/admin/types";

const Index = () => {
  const [deals, setDeals] = useState([]);
  const [premiumOptions, setPremiumOptions] = useState([]);
  
  const [settings, setSettings] = useState<{
    siteTitle: string;
    siteTagline: string;
    currency: string;
    paymentMethods: string;
    silverPrice: number;
    goldPrice: number;
    platinumPrice: number;
  }>({
    siteTitle: "Luxury Privilege Club",
    siteTagline: "Pakistan's Premium Hotel Loyalty Program",
    currency: "PKR",
    paymentMethods: "",
    silverPrice: 35000,
    goldPrice: 70000,
    platinumPrice: 150000
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDatabase();
        setSettings({
          siteTitle: data.settings.siteTitle || "Luxury Privilege Club",
          siteTagline: data.settings.siteTagline || "Pakistan's Premium Hotel Loyalty Program",
          currency: data.settings.currency || "PKR",
          paymentMethods: data.settings.paymentMethods || "",
          silverPrice: data.settings.silverPrice || 35000,
          goldPrice: data.settings.goldPrice || 70000,
          platinumPrice: data.settings.platinumPrice || 150000
        });
        setDeals(data.deals.slice(0, 3));
        setPremiumOptions(data.deals.filter(deal => deal.discount >= 20).slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. Header Section */}
      <Navbar />
      <HeroSection />
      
      {/* 2. Global Partnership Section */}
      <ScrollAnimation>
        <BrandsCarousel />
      </ScrollAnimation>
      
      {/* 3. Exclusive Privileges Section */}
      <ScrollAnimation>
        <PrivilegesSection />
      </ScrollAnimation>
      
      {/* 4. Video Section */}
      <ScrollAnimation>
        <div className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Explore Our <span className="text-luxury-gold">Experience</span></h2>
            <p className="text-lg text-center text-gray-400 mb-12">See what makes the Luxury Privilege Club special</p>
            
            <div className="rounded-2xl overflow-hidden aspect-video md:h-[500px]">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/zvP-BoDL9I0" 
                title="Why Choose us!" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      
      {/* 5. Hotel Deals Section */}
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Premium Hotel <span className="text-luxury-gold">Discounts</span></h2>
          <p className="text-lg text-center text-gray-400 mb-12">Enjoy exclusive rates at Pakistan's finest luxury hotels</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <PremiumCard
                key={deal.id}
                id={deal.id}
                title={deal.title}
                location={deal.location}
                imageUrl={deal.imageUrl}
                regularPrice={deal.regularPrice}
                memberPrice={deal.memberPrice}
                discount={deal.discount}
                rating={deal.rating}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/deals" className="bg-luxury-gold hover:bg-luxury-dark-gold text-black font-semibold py-3 px-8 rounded-full transition duration-300">
              View All Deals
            </Link>
          </div>
        </div>
      </ScrollAnimation>
      
      {/* 6. Tour Package Deals Section */}
      <ScrollAnimation>
        <TourPackagesSection />
      </ScrollAnimation>
      
      {/* 7. Members Testimony Section */}
      <ScrollAnimation>
        <MembersTestimony />
      </ScrollAnimation>
      
      {/* 8. Membership Plans Section */}
      <ScrollAnimation>
        <div className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Membership <span className="text-luxury-gold">Plans</span></h2>
            <p className="text-lg text-center text-gray-400 mb-12">Choose the right membership for your travel style</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Silver Plan */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-luxury-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-luxury-gold/10">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-2xl font-bold text-center">Silver</h3>
                  <div className="flex items-end justify-center gap-1 mt-4">
                    <span className="text-sm">Rs.</span>
                    <span className="text-4xl font-bold">{formatPrice(settings.silverPrice)}</span>
                  </div>
                  <p className="text-sm text-center text-gray-400 mt-2">per year</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Up to 70% discount at partner Domestic and International hotels</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Earn points on every stay</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Early check-in (subject to availability)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Access to member-only deals</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <Link to="/register" className="inline-block bg-luxury-gold hover:bg-luxury-dark-gold text-black font-semibold py-2 px-6 rounded-full transition duration-300">
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Gold Plan */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-luxury-gold/30 hover:border-luxury-gold/70 transition-all duration-300 hover:shadow-xl hover:shadow-luxury-gold/20 transform hover:-translate-y-1">
                <div className="p-6 border-b border-gray-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-luxury-gold text-black text-xs font-bold py-1 px-3 transform rotate-45 translate-x-2 -translate-y-1">
                    POPULAR
                  </div>
                  <h3 className="text-2xl font-bold text-center">Gold</h3>
                  <div className="flex items-end justify-center gap-1 mt-4">
                    <span className="text-sm">Rs.</span>
                    <span className="text-4xl font-bold">{formatPrice(settings.goldPrice)}</span>
                  </div>
                  <p className="text-sm text-center text-gray-400 mt-2">per year</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Up to 70% discount at partner Domestic and International hotels</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Earn 2x points on every stay</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Early check-in guaranteed</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Late check-out (subject to availability)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Room upgrades when available</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <Link to="/register" className="inline-block bg-luxury-gold hover:bg-luxury-dark-gold text-black font-semibold py-2 px-8 rounded-full transition duration-300">
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Platinum Plan */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-luxury-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-luxury-gold/10">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-2xl font-bold text-center">Platinum</h3>
                  <div className="flex items-end justify-center gap-1 mt-4">
                    <span className="text-sm">Rs.</span>
                    <span className="text-4xl font-bold">{formatPrice(settings.platinumPrice)}</span>
                  </div>
                  <p className="text-sm text-center text-gray-400 mt-2">per year</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Up to 70% discount at partner Domestic and International hotels</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Earn 3x points on every stay</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Early check-in guaranteed</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Late check-out guaranteed</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-luxury-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>VIP room upgrades</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <Link to="/register" className="inline-block bg-luxury-gold hover:bg-luxury-dark-gold text-black font-semibold py-2 px-6 rounded-full transition duration-300">
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      
      {/* 9. Join the Luxury Privilege Club Section with image */}
      <ScrollAnimation>
        <div className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Luxury experience" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Experience Unmatched <span className="text-luxury-gold">Luxury</span></h3>
                  <p className="text-white/80 max-w-md">Join our exclusive membership program today and unlock a world of premium benefits.</p>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6">Join The <span className="text-luxury-gold">Luxury Privilege Club</span></h2>
                <p className="text-lg text-gray-400 mb-8">
                  Experience unparalleled luxury and exclusive benefits at Pakistan's finest hotels and resorts. Our members enjoy special rates, priority services, and unique experiences not available to the general public.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="bg-luxury-gold/20 p-2 rounded-full mr-4">
                      <Check className="h-5 w-5 text-luxury-gold" />
                    </span>
                    <div>
                      <h4 className="font-medium">Member-Only Rates</h4>
                      <p className="text-gray-400">Save up to 40% on luxury accommodations</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-luxury-gold/20 p-2 rounded-full mr-4">
                      <Check className="h-5 w-5 text-luxury-gold" />
                    </span>
                    <div>
                      <h4 className="font-medium">Exclusive Benefits</h4>
                      <p className="text-gray-400">Enjoy room upgrades, early check-in, and late check-out</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-luxury-gold/20 p-2 rounded-full mr-4">
                      <Check className="h-5 w-5 text-luxury-gold" />
                    </span>
                    <div>
                      <h4 className="font-medium">Reward Points</h4>
                      <p className="text-gray-400">Earn points with every stay to redeem for future bookings</p>
                    </div>
                  </li>
                </ul>
                <JoinNowForm />
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      
      {/* 10. Footer Section */}
      <Footer />
    </div>
  );
};

export default Index;
