
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MapPin, CreditCard, Star, Check, MessageCircle, Calendar, Clock, Compass } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { TourPackage } from '@/components/admin/types';
import { toast } from "sonner";
import { formatPrice } from '@/utils/database';
import PremiumCard from '@/components/PremiumCard';
import ScrollAnimation from '@/components/ScrollAnimation';

const TourPackageView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null);
  const [relatedTours, setRelatedTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [bookingGuests, setBookingGuests] = useState(1);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitting, setInquirySubmitting] = useState(false);

  useEffect(() => {
    const fetchTourPackage = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("Tour Package ID is missing");
        }

        const { data, error } = await supabase
          .from('tour_packages')
          .select('*')
          .eq('id', parseInt(id))
          .single();
        
        if (error) {
          throw error;
        }

        // Map to TourPackage type
        const tourData: TourPackage = {
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

        setTourPackage(tourData);

        // Fetch related tours (same location)
        const { data: relatedData, error: relatedError } = await supabase
          .from('tour_packages')
          .select('*')
          .eq('location', data.location)
          .neq('id', parseInt(id))
          .limit(4);
        
        if (relatedError) {
          console.error('Error fetching related tours:', relatedError);
        } else {
          // Map to TourPackage type
          const relatedToursData = relatedData.map((t): TourPackage => ({
            id: t.id,
            title: t.title,
            location: t.location,
            imageUrl: t.image_url,
            regularPrice: t.regular_price,
            memberPrice: t.member_price,
            discount: t.discount,
            rating: t.rating,
            description: t.description
          }));
          
          setRelatedTours(relatedToursData);
        }
      } catch (error) {
        console.error('Error fetching tour package:', error);
        toast.error("Failed to load tour package details. Please try again later.");
        navigate('/tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTourPackage();
  }, [id, navigate]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tourPackage) return;
    
    setBookingSubmitting(true);
    
    try {
      // Save booking to Supabase
      const { error } = await supabase
        .from('bookings')
        .insert({
          deal_id: null, // This is a tour package, not a deal
          deal_title: tourPackage.title, // Using the same field for tour title
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
          check_in_date: tourDate, // Using check_in_date for tour date
          check_out_date: tourDate, // Same date for consistency
          guests: bookingGuests,
          amount: tourPackage.memberPrice,
          status: 'pending'
        });
      
      if (error) throw error;
      
      toast.success("Tour booking submitted successfully!");
      setIsBookingDialogOpen(false);
      
      // Reset form
      setBookingName('');
      setBookingEmail('');
      setBookingPhone('');
      setTourDate('');
      setBookingGuests(1);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tourPackage) return;
    
    setInquirySubmitting(true);
    
    try {
      // Simulate sending inquiry
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Inquiry submitted! Our agent will contact you shortly.");
      setIsInquiryDialogOpen(false);
      setInquiryMessage('');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setInquirySubmitting(false);
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

  if (!tourPackage) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="min-h-screen bg-luxury-rich-black pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <h2 className="text-2xl text-white mb-4">Tour package not found</h2>
              <Button
                onClick={() => navigate('/tours')}
                className="bg-luxury-gold text-black hover:bg-luxury-gold/80"
              >
                Return to Tours
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
        <title>{tourPackage.title} | Luxury Privilege Club</title>
      </Helmet>
      
      <Navbar />
      
      <main className="bg-luxury-rich-black">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[70vh]">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={tourPackage.imageUrl} 
            alt={tourPackage.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 bg-gradient-to-t from-black/90 to-transparent">
            <div className="container mx-auto">
              <div className="flex items-center mb-2">
                <MapPin size={18} className="text-luxury-gold mr-2" />
                <span className="text-white/90">{tourPackage.location}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-2">
                {tourPackage.title}
              </h1>
              <div className="flex items-center">
                <div className="flex items-center mr-6">
                  <Star size={18} className="text-luxury-gold mr-1" fill="#FFD700" />
                  <span className="text-white/90">{tourPackage.rating} Rating</span>
                </div>
                <div className="px-3 py-1 bg-luxury-gold text-black text-sm font-semibold rounded-full">
                  {tourPackage.discount}% OFF
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
                <h2 className="text-2xl font-display text-white mb-4">About This Tour</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  {tourPackage.description}
                </p>
                
                <h3 className="text-xl font-display text-white mb-3">Tour Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {[
                    'Private Transport', 
                    'Experienced Guide', 
                    'Meals Included', 
                    'Hotel Stays', 
                    'Photo Stops', 
                    'Cultural Experiences'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-luxury-gold mr-2" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-display text-white mb-3">Tour Itinerary</h3>
                <div className="space-y-4 mb-6">
                  {[
                    { day: 'Day 1', title: 'Arrival & Welcome', description: 'Arrive at the destination, check-in to hotel, and welcome dinner.' },
                    { day: 'Day 2', title: 'Exploration', description: 'Full day of sightseeing and visiting main attractions.' },
                    { day: 'Day 3', title: 'Adventure Activities', description: 'Participate in thrilling outdoor activities and adventures.' },
                    { day: 'Day 4', title: 'Cultural Experience', description: 'Immerse in local culture with traditional experiences.' },
                    { day: 'Day 5', title: 'Departure', description: 'Leisure morning and departure with souvenirs.' }
                  ].map((day, index) => (
                    <div key={index} className="border-l-2 border-luxury-gold/30 pl-4">
                      <div className="flex items-center mb-1">
                        <Clock size={16} className="text-luxury-gold mr-2" />
                        <span className="text-luxury-gold font-medium">{day.day}: {day.title}</span>
                      </div>
                      <p className="text-white/70 text-sm">{day.description}</p>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-display text-white mb-3">Terms & Conditions</h3>
                <ul className="list-disc list-inside text-white/80 space-y-2">
                  <li>Tour subject to minimum participants</li>
                  <li>Available on selected dates only</li>
                  <li>Cancellation policy applies</li>
                  <li>Required documents must be provided 48 hours before departure</li>
                  <li>Membership card must be presented to avail member pricing</li>
                </ul>
              </div>
              
              {/* Ask a Question Button */}
              <div className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-display text-white mb-2">Have questions about this tour?</h3>
                    <p className="text-white/70">Our travel experts are ready to help with your queries</p>
                  </div>
                  <Button 
                    onClick={() => setIsInquiryDialogOpen(true)}
                    className="bg-white/10 hover:bg-white/20 border border-luxury-gold/50 text-luxury-gold flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Ask a Question
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 sticky top-24">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-white/60 text-sm line-through">
                      PKR {formatPrice(tourPackage.regularPrice)}
                    </p>
                    <p className="text-white text-2xl font-semibold">
                      PKR {formatPrice(tourPackage.memberPrice)}
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
                      <h4 className="text-white font-medium">Multiple Dates</h4>
                      <p className="text-white/60 text-sm">Tour operates weekly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Compass size={18} className="text-luxury-gold" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-medium">All-Inclusive</h4>
                      <p className="text-white/60 text-sm">Transport, meals, and accommodations</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-luxury-gold text-black hover:bg-luxury-gold/80 py-6"
                  onClick={() => setIsBookingDialogOpen(true)}
                >
                  Book This Tour
                </Button>
                
                <p className="text-white/60 text-xs text-center mt-4">
                  50% deposit required to secure booking
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Tours Section */}
        {relatedTours.length > 0 && (
          <section className="py-16 bg-luxury-rich-black/60 border-t border-white/10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-display font-medium text-white mb-10 text-center">
                <span className="text-luxury-gradient">Featured Tours in {tourPackage.location}</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                {relatedTours.map((relatedTour, index) => (
                  <ScrollAnimation key={relatedTour.id} type="scale" delay={index * 100}>
                    <PremiumCard
                      id={relatedTour.id || 0}
                      title={relatedTour.title}
                      location={relatedTour.location}
                      imageUrl={relatedTour.imageUrl}
                      regularPrice={relatedTour.regularPrice}
                      memberPrice={relatedTour.memberPrice}
                      rating={relatedTour.rating}
                      discount={relatedTour.discount}
                      className="h-full"
                      isTour={true}
                    />
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Booking Dialog */}
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="bg-black/95 border-white/20 text-white max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display text-luxury-gold">Book Your Tour</DialogTitle>
              <DialogDescription className="text-white/70">
                Complete the form below to book {tourPackage.title}
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
              
              <div className="space-y-2">
                <label htmlFor="tourDate" className="text-white/80 block text-sm">Tour Start Date</label>
                <input
                  id="tourDate"
                  type="date"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="guests" className="text-white/80 block text-sm">Number of Participants</label>
                <select
                  id="guests"
                  value={bookingGuests}
                  onChange={(e) => setBookingGuests(parseInt(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Person' : 'People'}
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
        
        {/* Inquiry Dialog */}
        <Dialog open={isInquiryDialogOpen} onOpenChange={setIsInquiryDialogOpen}>
          <DialogContent className="bg-black/95 border-white/20 text-white max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display text-luxury-gold">Ask a Question</DialogTitle>
              <DialogDescription className="text-white/70">
                Submit your question about {tourPackage.title} and our experts will get back to you
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleInquirySubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="inquiryMessage" className="text-white/80 block text-sm">Your Message</label>
                <textarea
                  id="inquiryMessage"
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  required
                  placeholder="I have a question about this tour..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                />
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-luxury-gold text-black hover:bg-luxury-gold/80 py-6"
                  disabled={inquirySubmitting}
                >
                  {inquirySubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Send Question'
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

export default TourPackageView;
