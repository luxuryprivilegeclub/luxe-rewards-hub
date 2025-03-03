
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuthenticated", "true");
      toast.success("Login successful");
      onLogin();
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-luxury-rich-black flex items-center justify-center p-4">
      <Helmet>
        <title>Admin Login | Luxury Privilege Club</title>
      </Helmet>

      <div className="w-full max-w-md">
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-display text-luxury-gradient mb-2">Admin Portal</h1>
            <p className="text-white/60 text-sm">Enter your credentials to access the admin panel</p>
            <p className="text-white/60 text-xs mt-2">(Username: admin, Password: admin123)</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold"
                    placeholder="Enter admin username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full mt-6 bg-luxury-gold hover:bg-luxury-dark-gold text-black"
            >
              <Lock className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-luxury-gold hover:underline text-sm">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
