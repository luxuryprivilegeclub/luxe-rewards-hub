
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, MapPin, CreditCard, Star, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Deal } from '@/components/admin/types';
import { toast } from "sonner";
import { formatPrice } from '@/utils/database';

const DealView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [bookingGuests, setBookingGuests] = useState(1);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  useEffect(() => {
    const fetchDeal = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("Deal ID is missing");
        }

        const { data, error } = await supabase
          .from('deals')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }

        // Map to Deal type
        const dealData: Deal = {
          id: data.id,
          title: data.title,
          location: data.location,
          imageUrl: data.image_url,
          regularPrice: data.regular_price,
          memberPrice: data.member_price,
          discount: data.discount,
          rating: data.rating,
          description: data.description
        };

        setDeal(dealData);
      } catch (error) {
        console.error('Error fetching deal:', error);
        toast.error("Failed to load deal details. Please try again later.");
        navigate('/deals');
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, navigate]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deal) return;
    
    setBookingSubmitting(true);
    
    try {
      // Save booking to Supabase
      const { error } = await supabase
        .from('bookings')
        .insert({
          deal_id: deal.id,
          deal_title: deal.title,
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: bookingGuests,
          amount: deal.memberPrice,
          status: 'pending'
        });
      
      if (error) throw error;
      
      toast.success("Booking submitted successfully!");
      setIsBookingDialogOpen(false);
      
      // Reset form
      setBookingName('');
      setBookingEmail('');
      setBookingPhone('');
      setCheckInDate('');
      setCheckOutDate('');
      setBookingGuests(1);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="min-h-screen bg-luxury-rich-black pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-[50vh]">
              <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="min-h-screen bg-luxury-rich-black pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <h2 className="text-2xl text-white mb-4">Deal not found</h2>
              <Button
                onClick={() => navigate('/deals')}
                className="bg-luxury-gold text-black hover:bg-luxury-gold/80"
              >
                Return to Deals
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Helmet>
        <title>{deal.title} | Luxury Privilege Club</title>
      </Helmet>
      
      <Navbar />
      
      <main className="bg-luxury-rich-black">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[70vh]">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={deal.imageUrl} 
            alt={deal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 bg-gradient-to-t from-black/90 to-transparent">
            <div className="container mx-auto">
              <div className="flex items-center mb-2">
                <MapPin size={18} className="text-luxury-gold mr-2" />
                <span className="text-white/90">{deal.location}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-2">
                {deal.title}
              </h1>
              <div className="flex items-center">
                <div className="flex items-center mr-6">
                  <Star size={18} className="text-luxury-gold mr-1" fill="#FFD700" />
                  <span className="text-white/90">{deal.rating} Rating</span>
                </div>
                <div className="px-3 py-1 bg-luxury-gold text-black text-sm font-semibold rounded-full">
                  {deal.discount}% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <div className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 mb-8">
                <h2 className="text-2xl font-display text-white mb-4">About This Deal</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  {deal.description}
                </p>
                
                <h3 className="text-xl font-display text-white mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {['Free WiFi', 'Spa Access', 'Pool', 'Gym Access', 'Fine Dining', 'Room Service'].map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-luxury-gold mr-2" />
                      <span className="text-white/80">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-display text-white mb-3">Terms & Conditions</h3>
                <ul className="list-disc list-inside text-white/80 space-y-2">
                  <li>Offer subject to availability</li>
                  <li>Valid for stays through December 2024</li>
                  <li>Blackout dates may apply</li>
                  <li>Cannot be combined with other offers</li>
                  <li>Membership card must be presented at check-in</li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 sticky top-24">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-white/60 text-sm line-through">
                      PKR {formatPrice(deal.regularPrice)}
                    </p>
                    <p className="text-white text-2xl font-semibold">
                      PKR {formatPrice(deal.memberPrice)}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-luxury-gold/20 text-luxury-gold text-sm font-semibold rounded">
                    Member Price
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Calendar size={18} className="text-luxury-gold" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-medium">Flexible Dates</h4>
                      <p className="text-white/60 text-sm">Book now, choose dates later</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CreditCard size={18} className="text-luxury-gold" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-medium">Secure Booking</h4>
                      <p className="text-white/60 text-sm">Full payment or deposit options</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-luxury-gold text-black hover:bg-luxury-gold/80 py-6"
                  onClick={() => setIsBookingDialogOpen(true)}
                >
                  Book This Deal
                </Button>
                
                <p className="text-white/60 text-xs text-center mt-4">
                  No payment charged until booking is confirmed
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking Dialog */}
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="bg-black/95 border-white/20 text-white max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display text-luxury-gold">Book Your Stay</DialogTitle>
              <DialogDescription className="text-white/70">
                Complete the form below to book {deal.title}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white/80 block text-sm">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white/80 block text-sm">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-white/80 block text-sm">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="checkin" className="text-white/80 block text-sm">Check-in Date</label>
                  <input
                    id="checkin"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="checkout" className="text-white/80 block text-sm">Check-out Date</label>
                  <input
                    id="checkout"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="guests" className="text-white/80 block text-sm">Number of Guests</label>
                <select
                  id="guests"
                  value={bookingGuests}
                  onChange={(e) => setBookingGuests(parseInt(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-luxury-gold text-black hover:bg-luxury-gold/80 py-6"
                  disabled={bookingSubmitting}
                >
                  {bookingSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealView;
