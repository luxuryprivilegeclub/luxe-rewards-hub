
import { Star } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PremiumCardProps {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  regularPrice: number;
  memberPrice: number;
  rating: number;
  discount: number;
  className?: string;
  isTour?: boolean;
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  id,
  title,
  location,
  imageUrl,
  regularPrice,
  memberPrice,
  rating,
  discount,
  className = "",
  isTour = false
}) => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const handleViewClick = () => {
    if (isTour) {
      navigate(`/tours/${id}`);
    } else {
      navigate(`/deals/${id}`);
    }
  };
  
  return (
    <div className={`luxury-card bg-black border border-luxury-gold/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(184,134,11,0.1)] group ${className}`}>
      {/* Image container with overlay */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-luxury-gold text-black text-xs font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
        
        {/* Location */}
        <div className="absolute bottom-3 left-3 text-white/90 text-sm">
          {location}
        </div>
        
        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center">
          <Star size={14} className="text-luxury-gold mr-1" fill="#FFD700" />
          <span className="text-white/90 text-sm">{rating}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-2 truncate">{title}</h3>
        
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-1">
            <span className="text-white/60 text-sm line-through mr-2">
              PKR {formatPrice(regularPrice)}
            </span>
            <span className="text-xs bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded">
              Standard Rate
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-white font-semibold mr-2">
              PKR {formatPrice(memberPrice)}
            </span>
            <span className="text-xs bg-luxury-gold/30 text-luxury-gold font-medium px-2 py-0.5 rounded">
              Member Rate
            </span>
          </div>
        </div>
        
        <button 
          className="w-full bg-white hover:bg-luxury-gold text-black font-medium py-2 rounded transition-colors duration-300"
          onClick={handleViewClick}
        >
          View {isTour ? 'Tour' : 'Deal'}
        </button>
      </div>
    </div>
  );
};

export default PremiumCard;
