
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to validate credentials
    if (username && password) {
      // For demo purposes, accept any non-empty username/password for regular users
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "user");
      localStorage.setItem("username", username);
      
      toast.success("Login successful! Welcome back.");
      navigate("/");
    } else {
      toast.error("Please enter both username and password");
    }
  };

  return (
    <div className="min-h-screen bg-luxury-rich-black flex flex-col">
      <Helmet>
        <title>Login | Luxury Hotel Privileges</title>
      </Helmet>

      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 mt-16">
        <div className="w-full max-w-md">
          <div className="bg-black border border-luxury-gold/20 rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-display text-luxury-gradient mb-2">Member Login</h1>
              <p className="text-white/60 text-sm">Sign in to access exclusive deals and member benefits</p>
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
                      className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                      placeholder="Enter your username"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
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
                      className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                      placeholder="Enter your password"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full mt-6 bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-white/60 text-sm">
                Don't have an account? <Link to="/register" className="text-luxury-gold hover:underline">Register</Link>
              </p>
              <Link to="/" className="text-luxury-gold hover:underline text-sm block">
                Return to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
