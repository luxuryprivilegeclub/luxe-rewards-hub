import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, User, LogOut } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const storedUsername = localStorage.getItem("username") || "";
      const storedRole = localStorage.getItem("userRole") || "";
      
      setIsAuthenticated(authStatus);
      setUsername(storedUsername);
      setUserRole(storedRole);
    };
    
    checkAuth();
    
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUsername("");
    setUserRole("");
    toast.success("You have been logged out successfully");
    navigate("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-black/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-display text-luxury-gradient">Luxury Privilege Club</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`text-sm transition-colors ${
                  location.pathname === item.href
                    ? "text-luxury-gold"
                    : "text-white hover:text-luxury-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {userRole === "admin" && (
              <Link to="/admin">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/80 hover:text-luxury-gold hover:bg-transparent"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-white/80">
                  <span className="mr-2">Welcome, {username}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-luxury-gold text-black hover:bg-luxury-dark-gold"
                  >
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 flex flex-col items-end space-y-1.5">
              <span
                className={`block h-0.5 ${
                  isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
                } bg-white transition-transform duration-300`}
              ></span>
              <span
                className={`block h-0.5 ${
                  isMobileMenuOpen ? "opacity-0" : "w-4"
                } bg-white transition-opacity duration-300`}
              ></span>
              <span
                className={`block h-0.5 ${
                  isMobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-6"
                } bg-white transition-transform duration-300`}
              ></span>
            </div>
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden pt-5 pb-3">
            <div className="flex flex-col space-y-4">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`text-sm transition-colors ${
                    location.pathname === item.href
                      ? "text-luxury-gold"
                      : "text-white hover:text-luxury-gold"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {userRole === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm text-white hover:text-luxury-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Portal
                </Link>
              )}
              
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-white/80">
                    Welcome, {username}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="w-full bg-luxury-gold text-black hover:bg-luxury-dark-gold"
                    >
                      Join Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
