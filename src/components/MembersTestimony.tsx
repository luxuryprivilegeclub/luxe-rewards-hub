
import React from 'react';
import { Star } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Gold Member",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Being a member of the Luxury Privilege Club has transformed my travel experiences. The exclusive rates and upgrades at luxury hotels have been incredible. I've saved so much while enjoying premium service.",
    rating: 5
  },
  {
    id: 2,
    name: "Faisal Ahmed",
    role: "Platinum Member",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "The membership pays for itself after just one booking. I've been able to take my family to luxury hotels that would normally be out of our budget. The service is outstanding!",
    rating: 5
  },
  {
    id: 3,
    name: "Samina Yasmeen",
    role: "Silver Member",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    content: "I was skeptical at first, but the savings are real. I've enjoyed wonderful stays at 5-star hotels across Pakistan at prices better than any booking site I've used before.",
    rating: 4
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-luxury-gold/30"
        />
        <div>
          <h4 className="font-medium text-white">{testimonial.name}</h4>
          <p className="text-sm text-luxury-gold">{testimonial.role}</p>
        </div>
      </div>
      
      <p className="text-white/80 italic mb-4">"{testimonial.content}"</p>
      
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < testimonial.rating ? "text-luxury-gold fill-luxury-gold" : "text-gray-600"} 
          />
        ))}
      </div>
    </div>
  );
};

const MembersTestimony = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-luxury-rich-black">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation type="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">
            <span className="text-luxury-gradient">Members Experience</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Hear what our members have to say about their experiences with Luxury Privilege Club
          </p>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation key={testimonial.id} type="fadeIn" delay={index * 100}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersTestimony;
