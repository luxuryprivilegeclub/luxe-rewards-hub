
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, MapPin, DollarSign, Percent, Star, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface Deal {
  id?: number;
  title: string;
  location: string;
  imageUrl: string;
  regularPrice: number;
  memberPrice: number;
  discount: number;
  rating: number;
  description: string;
}

interface DealsTabProps {
  deals: Deal[];
  editingDeal: Deal | null;
  setEditingDeal: (deal: Deal | null) => void;
  handleSaveDeal: (deal: Deal) => void;
  handleDeleteDeal: (id: number) => void;
  formatPrice: (price?: number) => string;
}

const DealsTab: React.FC<DealsTabProps> = ({
  deals,
  editingDeal,
  setEditingDeal,
  handleSaveDeal,
  handleDeleteDeal,
  formatPrice
}) => {
  
  const validateAndSaveDeal = () => {
    if (!editingDeal) return;
    
    // Validate required fields
    if (!editingDeal.title.trim()) {
      toast.error("Hotel name is required");
      return;
    }
    
    if (!editingDeal.location.trim()) {
      toast.error("Location is required");
      return;
    }
    
    if (!editingDeal.imageUrl.trim()) {
      toast.error("Image URL is required");
      return;
    }
    
    if (editingDeal.regularPrice <= 0) {
      toast.error("Regular price must be greater than zero");
      return;
    }
    
    if (editingDeal.memberPrice <= 0) {
      toast.error("Member price must be greater than zero");
      return;
    }
    
    // All validations passed, save the deal
    console.log("Saving validated deal:", editingDeal);
    toast.promise(
      Promise.resolve(handleSaveDeal(editingDeal)),
      {
        loading: 'Saving deal...',
        success: 'Deal saved successfully!',
        error: 'Failed to save deal. Please try again.'
      }
    );
  };
  
  return (
    <div className="space-y-6">
      {editingDeal ? (
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">
            {editingDeal.id ? `Edit Deal: ${editingDeal.title}` : "Add New Deal"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dealTitle">Hotel Name</Label>
                <Input
                  id="dealTitle"
                  value={editingDeal.title}
                  onChange={(e) => setEditingDeal({...editingDeal, title: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dealLocation">Location</Label>
                <div className="relative">
                  <Input
                    id="dealLocation"
                    value={editingDeal.location}
                    onChange={(e) => setEditingDeal({...editingDeal, location: e.target.value})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dealImageUrl">Image URL</Label>
              <div className="relative">
                <Input
                  id="dealImageUrl"
                  value={editingDeal.imageUrl}
                  onChange={(e) => setEditingDeal({...editingDeal, imageUrl: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                />
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dealRegularPrice">Regular Price</Label>
                <div className="relative">
                  <Input
                    id="dealRegularPrice"
                    type="number"
                    value={editingDeal.regularPrice}
                    onChange={(e) => setEditingDeal({...editingDeal, regularPrice: Number(e.target.value)})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dealMemberPrice">Member Price</Label>
                <div className="relative">
                  <Input
                    id="dealMemberPrice"
                    type="number"
                    value={editingDeal.memberPrice}
                    onChange={(e) => setEditingDeal({...editingDeal, memberPrice: Number(e.target.value)})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dealDiscount">Discount %</Label>
                <div className="relative">
                  <Input
                    id="dealDiscount"
                    type="number"
                    value={editingDeal.discount}
                    onChange={(e) => setEditingDeal({...editingDeal, discount: Number(e.target.value)})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dealRating">Rating (0-5)</Label>
              <div className="relative">
                <Input
                  id="dealRating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={editingDeal.rating}
                  onChange={(e) => setEditingDeal({...editingDeal, rating: Number(e.target.value)})}
                  className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                />
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dealDescription">Description</Label>
              <Textarea
                id="dealDescription"
                value={editingDeal.description}
                onChange={(e) => setEditingDeal({...editingDeal, description: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30 min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingDeal(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                onClick={validateAndSaveDeal}
              >
                <Save className="mr-2 h-4 w-4" /> Save Deal
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-display">Manage Hotel Deals</h2>
            <Button 
              className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              onClick={() => setEditingDeal({
                title: "",
                location: "",
                imageUrl: "",
                regularPrice: 0,
                memberPrice: 0,
                discount: 0,
                rating: 0,
                description: ""
              })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Deal
            </Button>
          </div>
          
          <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-luxury-gold/20">
                  <th className="text-left p-4">Hotel</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Regular Price</th>
                  <th className="text-left p-4">Member Price</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id} className="border-b border-luxury-gold/10">
                    <td className="p-4">{deal.title}</td>
                    <td className="p-4">{deal.location}</td>
                    <td className="p-4">{formatPrice(deal.regularPrice)}</td>
                    <td className="p-4">{formatPrice(deal.memberPrice)}</td>
                    <td className="p-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-luxury-gold mr-2"
                        onClick={() => setEditingDeal({...deal})}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-400"
                        onClick={() => handleDeleteDeal(deal.id as number)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DealsTab;
