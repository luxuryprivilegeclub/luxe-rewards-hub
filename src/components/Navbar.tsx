
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-3 border-b border-luxury-gold/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-display font-semibold text-luxury-gold">
            Luxe<span className="text-white">Rewards</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-white hover:text-luxury-gold transition-colors link-underline">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-white hover:text-luxury-gold transition-colors link-underline">
            About
          </Link>
          <Link to="/blog" className="text-sm font-medium text-white hover:text-luxury-gold transition-colors link-underline">
            Blog
          </Link>
          <Link to="/contact" className="text-sm font-medium text-white hover:text-luxury-gold transition-colors link-underline">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
          >
            Sign In
          </Button>
          <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-luxury-gold transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-black border-b border-luxury-gold/10 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-sm font-medium text-white hover:text-luxury-gold transition-colors py-2 border-b border-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-white hover:text-luxury-gold transition-colors py-2 border-b border-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/blog" 
            className="text-sm font-medium text-white hover:text-luxury-gold transition-colors py-2 border-b border-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className="text-sm font-medium text-white hover:text-luxury-gold transition-colors py-2 border-b border-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col space-y-3 pt-2">
            <Button 
              variant="outline" 
              className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold w-full"
            >
              <User size={16} className="mr-2" />
              Sign In
            </Button>
            <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black w-full">
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
