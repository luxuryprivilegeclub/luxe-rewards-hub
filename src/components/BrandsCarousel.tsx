
import { useEffect, useState } from 'react';

// Array of luxury hotel brands
const hotelBrands = [
  'Marriott International',
  'Hilton Hotels & Resorts',
  'Hyatt Hotels Corporation',
  'InterContinental Hotels Group',
  'Accor Hotels',
  'Four Seasons Hotels & Resorts',
  'Shangri-La Hotels & Resorts',
  'Mandarin Oriental Hotel Group',
  'Ritz-Carlton Hotel Company',
  'Fairmont Hotels & Resorts',
  'Jumeirah Hotels & Resorts',
  'Radisson Hotel Group',
  'Rosewood Hotels & Resorts',
  'Sofitel Hotels & Resorts',
  'Waldorf Astoria Hotels & Resorts',
  'St. Regis Hotels',
  'Aman Resorts',
  'Peninsula Hotels',
  'Kempinski Hotels',
  'Park Hyatt'
];

const BrandsCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Duplicate the brands array for smooth infinite looping
  const duplicatedBrands = [...hotelBrands, ...hotelBrands];

  return (
    <div className="w-full bg-black py-10 overflow-hidden border-y border-luxury-gold/10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">
          <span className="text-luxury-gradient">Global Partnerships</span>
        </h2>
        <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto">
          Exclusive rates from top 20 worldwide hotel brands
        </p>
      </div>
      
      <div className="relative w-full">
        {/* Gradient mask on edges */}
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
        
        {/* Scrolling marquee */}
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className={`inline-block animate-marquee ${isMobile ? 'py-4' : 'py-6'}`}>
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className={`inline-block ${
                  isMobile ? 'mx-4 text-sm' : 'mx-8 text-base'
                } text-white/60 hover:text-luxury-gold transition-colors duration-300`}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsCarousel;
