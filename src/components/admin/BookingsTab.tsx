
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatPrice } from "@/utils/database";

interface Booking {
  id: number;
  deal_id: number;
  deal_title: string;
  name: string;
  email: string;
  phone: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  amount: number;
  status: string;
  created_at: string;
}

const BookingsTab = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(`Booking ${status === 'confirmed' ? 'confirmed' : 'cancelled'} successfully`);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return <Badge className="bg-green-500">Confirmed</Badge>;
    } else if (status === 'cancelled') {
      return <Badge className="bg-red-500">Cancelled</Badge>;
    } else {
      return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Bookings Management</h2>
        <Button
          onClick={fetchBookings}
          className="bg-primary"
          disabled={loading}
        >
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary/30">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Deal</th>
                <th className="border p-2 text-left">Guest</th>
                <th className="border p-2 text-left">Check In/Out</th>
                <th className="border p-2 text-left">Amount</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-secondary/10">
                  <td className="border p-2">{booking.id}</td>
                  <td className="border p-2">
                    <div>
                      <div className="font-medium">{booking.deal_title}</div>
                      <div className="text-sm text-muted-foreground">ID: {booking.deal_id}</div>
                    </div>
                  </td>
                  <td className="border p-2">
                    <div>
                      <div className="font-medium">{booking.name}</div>
                      <div className="text-sm text-muted-foreground">{booking.email}</div>
                      <div className="text-sm text-muted-foreground">{booking.phone}</div>
                    </div>
                  </td>
                  <td className="border p-2">
                    <div>
                      <div className="font-medium">{formatDate(booking.check_in_date)}</div>
                      <div className="text-sm text-muted-foreground">
                        to {formatDate(booking.check_out_date)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Guests: {booking.guests}
                      </div>
                    </div>
                  </td>
                  <td className="border p-2">
                    PKR {formatPrice(booking.amount)}
                  </td>
                  <td className="border p-2">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="border p-2">
                    {booking.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        >
                          <XCircle className="w-4 h-4 mr-1" /> Cancel
                        </Button>
                      </div>
                    )}
                    {booking.status !== 'pending' && (
                      <div className="text-sm text-muted-foreground">
                        Created on {new Date(booking.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No bookings found</p>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
