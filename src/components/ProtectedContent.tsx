
import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface ProtectedContentProps {
  children: React.ReactNode;
}

const ProtectedContent = ({ children }: ProtectedContentProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return (
      <div className="py-12 px-4 text-center">
        <div className="bg-black/50 border border-luxury-gold/20 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm">
          <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-luxury-gold" />
          </div>
          <h3 className="text-xl font-display text-luxury-gradient mb-2">
            Member-Only Content
          </h3>
          <p className="text-white/70 mb-6">
            Please sign in to view our exclusive deals and member-only content.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button 
                className="w-full bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant="outline" 
                className="w-full border-luxury-gold/50 text-white hover:bg-luxury-gold/10 hover:text-luxury-gold"
              >
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedContent;
