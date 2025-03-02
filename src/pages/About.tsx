
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";

const About = () => {
  return (
    <div className="min-h-screen bg-luxury-rich-black text-white">
      <Helmet>
        <title>About Us | Luxury Hotel Privileges</title>
        <meta name="description" content="Learn about our 20 years of experience in the hotel booking industry" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 text-center">
                <span className="text-luxury-gradient">About</span> Us
              </h1>
              <div className="w-16 h-1 bg-luxury-gold mx-auto mb-12"></div>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollAnimation type="slideUp" className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-display mb-6">
                  <span className="text-luxury-gradient">20 Years</span> of Excellence in Hotel Booking
                </h2>
                <p className="text-white/70 mb-6">
                  Since 2004, we have been Pakistan's premier luxury hotel booking service, providing exclusive deals and privileges to our distinguished members.
                </p>
                <p className="text-white/70 mb-6">
                  Our journey began with a simple mission: to offer better rates than online travel agencies while providing an unmatched level of personalized service. 
                  Today, we proudly partner with over 20 global luxury hotel brands, giving our members access to privileged pricing and benefits unavailable elsewhere.
                </p>
                <p className="text-white/70">
                  Our deep relationships with hotel partners, combined with our innovative loyalty program, have established us as the market leader in premium hotel bookings in Pakistan.
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation type="scale" className="order-1 md:order-2">
                <div className="rounded-xl overflow-hidden border border-luxury-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                    alt="Luxury Hotel Lobby" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display mb-3">
                Our <span className="text-luxury-gradient">Story</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                How we became Pakistan's leading luxury hotel privilege program
              </p>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollAnimation type="slideUp" delay={0.1} className="luxury-card p-8 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-luxury-gold text-black text-xl font-bold mb-6">1</div>
                <h3 className="text-xl font-display mb-4">Humble Beginnings</h3>
                <p className="text-white/70">
                  Founded in 2004 by a team of travel enthusiasts, we started with partnerships with just 5 domestic hotels. Our commitment to exceptional service quickly earned us recognition among discerning travelers.
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation type="slideUp" delay={0.3} className="luxury-card p-8 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-luxury-gold text-black text-xl font-bold mb-6">2</div>
                <h3 className="text-xl font-display mb-4">Global Expansion</h3>
                <p className="text-white/70">
                  By 2010, we had established relationships with major international hotel chains, expanding our offerings beyond Pakistan's borders and giving our members access to luxury accommodations worldwide.
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation type="slideUp" delay={0.5} className="luxury-card p-8 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-luxury-gold text-black text-xl font-bold mb-6">3</div>
                <h3 className="text-xl font-display mb-4">Innovation & Excellence</h3>
                <p className="text-white/70">
                  Today, we leverage cutting-edge technology and decades of industry experience to offer a seamless booking platform, competitive pricing, and a loyalty program that rewards our members with every stay.
                </p>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 bg-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display mb-3">
                Our <span className="text-luxury-gradient">Leadership</span> Team
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Meet the experts behind our exclusive hotel partnerships
              </p>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollAnimation type="scale" className="text-center">
                <div className="rounded-xl overflow-hidden border border-luxury-gold/20 mb-4 aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display">Ahmed Khan</h3>
                <p className="text-luxury-gold mb-2">Chief Executive Officer</p>
                <p className="text-white/70 text-sm">
                  With 25 years in hospitality management, Ahmed leads our strategic vision.
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation type="scale" delay={0.2} className="text-center">
                <div className="rounded-xl overflow-hidden border border-luxury-gold/20 mb-4 aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="COO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display">Fatima Zaidi</h3>
                <p className="text-luxury-gold mb-2">Chief Operations Officer</p>
                <p className="text-white/70 text-sm">
                  Fatima oversees our day-to-day operations and hotel partnership development.
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation type="scale" delay={0.4} className="text-center">
                <div className="rounded-xl overflow-hidden border border-luxury-gold/20 mb-4 aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="CTO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display">Imran Ali</h3>
                <p className="text-luxury-gold mb-2">Chief Technology Officer</p>
                <p className="text-white/70 text-sm">
                  Imran leads our digital transformation and technology innovation efforts.
                </p>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
