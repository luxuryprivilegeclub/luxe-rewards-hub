
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block text-luxury-gold text-9xl font-display font-bold">404</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-4 text-white">
            Page Not Found
          </h1>
          
          <p className="text-white/70 max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          
          <Link to="/">
            <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
