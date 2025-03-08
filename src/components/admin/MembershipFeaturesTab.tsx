
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MembershipFeature {
  id?: number;
  membershipType: 'Silver' | 'Gold' | 'Platinum';
  feature: string;
  included: boolean;
}

interface MembershipFeaturesTabProps {
  features: MembershipFeature[];
  editingFeature: MembershipFeature | null;
  setEditingFeature: (feature: MembershipFeature | null) => void;
  handleSaveFeature: (feature: MembershipFeature) => Promise<void>;
  handleDeleteFeature: (id: number) => Promise<void>;
}

const MembershipFeaturesTab: React.FC<MembershipFeaturesTabProps> = ({
  features,
  editingFeature,
  setEditingFeature,
  handleSaveFeature,
  handleDeleteFeature
}) => {
  const [activeType, setActiveType] = useState<'Silver' | 'Gold' | 'Platinum'>('Silver');
  
  const onSaveFeature = async () => {
    if (!editingFeature) return;
    
    if (!editingFeature.feature) {
      toast.error("Feature description is required");
      return;
    }
    
    try {
      await handleSaveFeature(editingFeature);
    } catch (error) {
      console.error("Error saving feature:", error);
      toast.error(`Failed to save feature: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  const filteredFeatures = features.filter(feature => feature.membershipType === activeType);
  
  return (
    <div className="space-y-6">
      {editingFeature ? (
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">
            {editingFeature.id ? `Edit Feature` : "Add New Membership Feature"}
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="membershipType">Membership Type</Label>
              <Select
                value={editingFeature.membershipType}
                onValueChange={(value: 'Silver' | 'Gold' | 'Platinum') => 
                  setEditingFeature({...editingFeature, membershipType: value})
                }
              >
                <SelectTrigger className="bg-luxury-rich-black border-luxury-gold/30">
                  <SelectValue placeholder="Select a membership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="featureDesc">Feature Description</Label>
              <Input
                id="featureDesc"
                value={editingFeature.feature}
                onChange={(e) => setEditingFeature({...editingFeature, feature: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30"
                placeholder="e.g., Access to exclusive deals"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featureIncluded"
                checked={editingFeature.included}
                onCheckedChange={(checked) => 
                  setEditingFeature({...editingFeature, included: checked as boolean})
                }
              />
              <Label htmlFor="featureIncluded">Feature included in this membership level</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingFeature(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                onClick={onSaveFeature}
              >
                <Save className="mr-2 h-4 w-4" /> Save Feature
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-display">Manage Membership Features</h2>
            <Button 
              className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              onClick={() => setEditingFeature({
                membershipType: activeType,
                feature: "",
                included: true
              })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Feature
            </Button>
          </div>
          
          <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden p-4">
            <div className="flex space-x-4 mb-4 border-b border-luxury-gold/20 pb-4">
              <Button 
                variant={activeType === "Silver" ? "default" : "outline"}
                onClick={() => setActiveType("Silver")}
                className={activeType === "Silver" ? "bg-luxury-gold text-black" : ""}
              >
                Silver
              </Button>
              <Button 
                variant={activeType === "Gold" ? "default" : "outline"}
                onClick={() => setActiveType("Gold")}
                className={activeType === "Gold" ? "bg-luxury-gold text-black" : ""}
              >
                Gold
              </Button>
              <Button 
                variant={activeType === "Platinum" ? "default" : "outline"}
                onClick={() => setActiveType("Platinum")}
                className={activeType === "Platinum" ? "bg-luxury-gold text-black" : ""}
              >
                Platinum
              </Button>
            </div>
          
            <table className="w-full">
              <thead>
                <tr className="border-b border-luxury-gold/20">
                  <th className="text-left p-4">Feature</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeatures.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center">No features found for {activeType} membership. Add your first feature!</td>
                  </tr>
                ) : (
                  filteredFeatures.map((feature) => (
                    <tr key={feature.id} className="border-b border-luxury-gold/10">
                      <td className="p-4">{feature.feature}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${feature.included 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'}`}>
                          {feature.included ? 'Included' : 'Not included'}
                        </span>
                      </td>
                      <td className="p-4 space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-luxury-gold"
                          onClick={() => setEditingFeature(feature)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => {
                            if (feature.id) handleDeleteFeature(feature.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MembershipFeaturesTab;
