
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, MapPin, DollarSign, Percent, Star, Image as ImageIcon } from "lucide-react";

interface TourPackage {
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

interface TourPackagesTabProps {
  tourPackages: TourPackage[];
  editingTourPackage: TourPackage | null;
  setEditingTourPackage: (tourPackage: TourPackage | null) => void;
  handleSaveTourPackage: (tourPackage: TourPackage) => void;
  handleDeleteTourPackage: (id: number) => void;
  formatPrice: (price?: number) => string;
}

const TourPackagesTab: React.FC<TourPackagesTabProps> = ({
  tourPackages,
  editingTourPackage,
  setEditingTourPackage,
  handleSaveTourPackage,
  handleDeleteTourPackage,
  formatPrice
}) => {
  return (
    <div className="space-y-6">
      {editingTourPackage ? (
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">
            {editingTourPackage.id ? `Edit Tour Package: ${editingTourPackage.title}` : "Add New Tour Package"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tourTitle">Package Name</Label>
                <Input
                  id="tourTitle"
                  value={editingTourPackage.title}
                  onChange={(e) => setEditingTourPackage({...editingTourPackage, title: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tourLocation">Location</Label>
                <div className="relative">
                  <Input
                    id="tourLocation"
                    value={editingTourPackage.location}
                    onChange={(e) => setEditingTourPackage({...editingTourPackage, location: e.target.value})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tourImageUrl">Image URL</Label>
              <div className="relative">
                <Input
                  id="tourImageUrl"
                  value={editingTourPackage.imageUrl}
                  onChange={(e) => setEditingTourPackage({...editingTourPackage, imageUrl: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                />
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tourRegularPrice">Regular Price</Label>
                <div className="relative">
                  <Input
                    id="tourRegularPrice"
                    type="number"
                    value={editingTourPackage.regularPrice}
                    onChange={(e) => setEditingTourPackage({...editingTourPackage, regularPrice: Number(e.target.value)})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tourMemberPrice">Member Price</Label>
                <div className="relative">
                  <Input
                    id="tourMemberPrice"
                    type="number"
                    value={editingTourPackage.memberPrice}
                    onChange={(e) => setEditingTourPackage({...editingTourPackage, memberPrice: Number(e.target.value)})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tourDiscount">Discount %</Label>
                <div className="relative">
                  <Input
                    id="tourDiscount"
                    type="number"
                    value={editingTourPackage.discount}
                    onChange={(e) => setEditingTourPackage({...editingTourPackage, discount: Number(e.target.value)})}
                    className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                  />
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tourRating">Rating (0-5)</Label>
              <div className="relative">
                <Input
                  id="tourRating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={editingTourPackage.rating}
                  onChange={(e) => setEditingTourPackage({...editingTourPackage, rating: Number(e.target.value)})}
                  className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                />
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tourDescription">Description</Label>
              <Textarea
                id="tourDescription"
                value={editingTourPackage.description}
                onChange={(e) => setEditingTourPackage({...editingTourPackage, description: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30 min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingTourPackage(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                onClick={() => handleSaveTourPackage(editingTourPackage)}
              >
                <Save className="mr-2 h-4 w-4" /> Save Tour Package
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-display">Manage Tour Packages</h2>
            <Button 
              className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              onClick={() => setEditingTourPackage({
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
              <Plus className="mr-2 h-4 w-4" /> Add New Tour Package
            </Button>
          </div>
          
          <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-luxury-gold/20">
                  <th className="text-left p-4">Tour Package</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Regular Price</th>
                  <th className="text-left p-4">Member Price</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tourPackages.map((tour) => (
                  <tr key={tour.id} className="border-b border-luxury-gold/10">
                    <td className="p-4">{tour.title}</td>
                    <td className="p-4">{tour.location}</td>
                    <td className="p-4">{formatPrice(tour.regularPrice)}</td>
                    <td className="p-4">{formatPrice(tour.memberPrice)}</td>
                    <td className="p-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-luxury-gold mr-2"
                        onClick={() => setEditingTourPackage(tour)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-400"
                        onClick={() => handleDeleteTourPackage(tour.id as number)}
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

export default TourPackagesTab;
