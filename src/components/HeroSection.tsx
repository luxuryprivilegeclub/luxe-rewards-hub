
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import ScrollAnimation from './ScrollAnimation';

const HeroSection = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center mask-parallax"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=3840&auto=format&fit=crop")',
          transform: `translateY(${offset * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/10 via-transparent to-luxury-rich-black opacity-30"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24 md:pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation type="fadeIn" className="mb-3">
            <span className="inline-block px-3 py-1 text-xs bg-luxury-gold/20 text-luxury-gold font-medium rounded-full">
              Pakistan's Premier Hotel Rewards Program
            </span>
          </ScrollAnimation>
          
          <ScrollAnimation type="slideDown" delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 text-white">
              Exclusive <span className="text-luxury-gradient">Hotel Rates</span> <br />
              & Luxury Privileges
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation type="fadeIn" delay={400} className="mb-8">
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Join Pakistan's first-of-its-kind privilege program for access to
              rates better than any booking site, plus earn loyalty points.
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation type="slideUp" delay={600} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-luxury-gold text-black hover:bg-luxury-dark-gold font-medium min-w-[160px]"
            >
              Join Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold font-medium min-w-[160px]"
            >
              Explore Deals
            </Button>
          </ScrollAnimation>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-luxury-gold/50 flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-luxury-gold rounded-full animate-slide-down"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
