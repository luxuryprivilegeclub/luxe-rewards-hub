
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id?: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

interface TestimonialsTabProps {
  testimonials: Testimonial[];
  editingTestimonial: Testimonial | null;
  setEditingTestimonial: (testimonial: Testimonial | null) => void;
  handleSaveTestimonial: (testimonial: Testimonial) => Promise<void>;
  handleDeleteTestimonial: (id: number) => Promise<void>;
}

const TestimonialsTab: React.FC<TestimonialsTabProps> = ({
  testimonials,
  editingTestimonial,
  setEditingTestimonial,
  handleSaveTestimonial,
  handleDeleteTestimonial
}) => {
  const onSaveTestimonial = async () => {
    if (!editingTestimonial) return;
    
    if (!editingTestimonial.name) {
      toast.error("Member name is required");
      return;
    }
    
    if (!editingTestimonial.role) {
      toast.error("Member role is required");
      return;
    }
    
    if (!editingTestimonial.content) {
      toast.error("Testimonial content is required");
      return;
    }
    
    try {
      await handleSaveTestimonial(editingTestimonial);
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error(`Failed to save testimonial: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  const handleRatingChange = (rating: number) => {
    if (editingTestimonial) {
      setEditingTestimonial({...editingTestimonial, rating});
    }
  };
  
  return (
    <div className="space-y-6">
      {editingTestimonial ? (
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">
            {editingTestimonial.id ? `Edit Testimonial: ${editingTestimonial.name}` : "Add New Testimonial"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testimonialName">Member Name</Label>
                <Input
                  id="testimonialName"
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonialRole">Member Role (e.g., Gold Member)</Label>
                <Input
                  id="testimonialRole"
                  value={editingTestimonial.role}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonialAvatar">Avatar URL</Label>
              <Input
                id="testimonialAvatar"
                value={editingTestimonial.avatar}
                onChange={(e) => setEditingTestimonial({...editingTestimonial, avatar: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30"
                placeholder="https://example.com/avatar.jpg"
              />
              {editingTestimonial.avatar && (
                <div className="mt-2 flex items-center">
                  <p className="text-sm mr-2">Avatar Preview:</p>
                  <img 
                    src={editingTestimonial.avatar} 
                    alt="Avatar Preview" 
                    className="h-12 w-12 rounded-full object-cover border-2 border-luxury-gold/30"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/222/gold?text=?';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonialContent">Testimonial</Label>
              <Textarea
                id="testimonialContent"
                value={editingTestimonial.content}
                onChange={(e) => setEditingTestimonial({...editingTestimonial, content: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star 
                      className={star <= editingTestimonial.rating 
                        ? "text-luxury-gold fill-luxury-gold" 
                        : "text-gray-600"
                      } 
                      size={24}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingTestimonial(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                onClick={onSaveTestimonial}
              >
                <Save className="mr-2 h-4 w-4" /> Save Testimonial
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-display">Manage Testimonials</h2>
            <Button 
              className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              onClick={() => setEditingTestimonial({
                name: "",
                role: "",
                avatar: "",
                content: "",
                rating: 5
              })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Testimonial
            </Button>
          </div>
          
          <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-luxury-gold/20">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">No testimonials found. Create your first testimonial!</td>
                  </tr>
                ) : (
                  testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="border-b border-luxury-gold/10">
                      <td className="p-4">
                        <div className="flex items-center">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/222/gold?text=?';
                            }}
                          />
                          {testimonial.name}
                        </div>
                      </td>
                      <td className="p-4">{testimonial.role}</td>
                      <td className="p-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < testimonial.rating ? "text-luxury-gold fill-luxury-gold" : "text-gray-600"} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-luxury-gold"
                          onClick={() => setEditingTestimonial(testimonial)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => {
                            if (testimonial.id) handleDeleteTestimonial(testimonial.id);
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

export default TestimonialsTab;
