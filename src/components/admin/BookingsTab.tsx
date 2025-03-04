
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Mail, Phone, Users } from "lucide-react";
import { Booking } from './types';
import { supabase, customQuery } from '@/integrations/supabase/client';
import { toast } from "sonner";

const BookingsTab: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await customQuery('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setBookings(data.map((booking: any): Booking => ({
          id: booking.id,
          deal_id: booking.deal_id,
          deal_title: booking.deal_title,
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          guests: booking.guests,
          amount: booking.amount,
          status: booking.status,
          created_at: booking.created_at
        })));
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const { error } = await customQuery('bookings')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));

      toast.success(`Booking status updated to ${status}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500 hover:bg-green-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-yellow-500 hover:bg-yellow-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-display">Manage Bookings</h2>
        <Button 
          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
          onClick={fetchBookings}
        >
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-10 bg-black/40 rounded-xl">
          <p className="text-white/70">No bookings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-black/50 border border-luxury-gold/20 rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium">{booking.deal_title}</h3>
                  <p className="text-white/70 text-sm">
                    Booking ID: {booking.id}
                  </p>
                </div>
                <Badge className={`${getStatusColor(booking.status)} text-white px-3 py-1 rounded-full`}>
                  {booking.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <User className="text-luxury-gold/70 mr-2" size={16} />
                  <span>{booking.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-luxury-gold/70 mr-2" size={16} />
                  <span>{booking.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-luxury-gold/70 mr-2" size={16} />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-luxury-gold/70 mr-2" size={16} />
                  <span>{booking.guests} Guests</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-white/70 text-xs mb-1">Check-in</div>
                  <div className="flex items-center">
                    <Calendar className="text-luxury-gold/70 mr-2" size={16} />
                    <span>{new Date(booking.check_in_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-xs mb-1">Check-out</div>
                  <div className="flex items-center">
                    <Calendar className="text-luxury-gold/70 mr-2" size={16} />
                    <span>{new Date(booking.check_out_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-xs mb-1">Amount</div>
                  <div className="font-medium">PKR {booking.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
              </div>
              
              <div className="flex space-x-2 justify-end">
                {booking.status === 'pending' && (
                  <>
                    <Button 
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleUpdateStatus(booking.id as number, 'confirmed')}
                    >
                      Confirm
                    </Button>
                    <Button 
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleUpdateStatus(booking.id as number, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <Button 
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleUpdateStatus(booking.id as number, 'cancelled')}
                  >
                    Cancel
                  </Button>
                )}
                {booking.status === 'cancelled' && (
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleUpdateStatus(booking.id as number, 'confirmed')}
                  >
                    Reactivate
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
