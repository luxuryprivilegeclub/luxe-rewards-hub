
import { Award, Star, Crown, Diamond } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface PrivilegeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const PrivilegeCard = ({ icon, title, description, delay = 0 }: PrivilegeCardProps) => {
  return (
    <ScrollAnimation 
      type="slideUp" 
      delay={delay}
      className="glass-card rounded-xl p-6 transition-all duration-300 hover:border-luxury-gold/30 hover:bg-white/10"
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-luxury-gold mb-4 p-3 bg-luxury-gold/10 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </ScrollAnimation>
  );
};

const PrivilegesSection = () => {
  const privileges = [
    {
      icon: <Award size={24} />,
      title: "Exclusive Rates",
      description: "Access hotel rates lower than any OTA available in the market.",
      delay: 0
    },
    {
      icon: <Star size={24} />,
      title: "Loyalty Points",
      description: "Earn points with every booking and redeem for free stays.",
      delay: 100
    },
    {
      icon: <Crown size={24} />,
      title: "Premium Benefits",
      description: "Room upgrades, late checkout, and VIP amenities at partner hotels.",
      delay: 200
    },
    {
      icon: <Diamond size={24} />,
      title: "Priority Service",
      description: "24/7 dedicated concierge and priority customer support.",
      delay: 300
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-luxury-rich-black to-black">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation type="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            <span className="text-luxury-gradient">Exclusive Privileges</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Experience the benefits that set us apart as Pakistan's premier hotel loyalty program.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {privileges.map((privilege, index) => (
            <PrivilegeCard
              key={index}
              icon={privilege.icon}
              title={privilege.title}
              description={privilege.description}
              delay={privilege.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivilegesSection;
