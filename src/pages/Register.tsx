
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, User, CreditCard } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Check if user is already logged in
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Validate first step
      if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill all required fields");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      setStep(2);
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to register the user
    // For demo purposes, we'll just simulate a successful registration
    
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", "user");
    localStorage.setItem("username", formData.username);
    
    toast.success("Registration successful! Welcome to Luxury Hotel Privileges");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-luxury-rich-black flex flex-col">
      <Helmet>
        <title>Register | Luxury Hotel Privileges</title>
      </Helmet>

      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 mt-16 mb-16">
        <div className="w-full max-w-md">
          <div className="bg-black border border-luxury-gold/20 rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-display text-luxury-gradient mb-2">Join Luxury Hotel Privileges</h1>
              <p className="text-white/60 text-sm">Create an account to access exclusive hotel deals and benefits</p>
            </div>

            <form onSubmit={nextStep}>
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                        placeholder="Enter your full name"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                        placeholder="Enter your email"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                        placeholder="Choose a username"
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
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                        placeholder="Create a password"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                        placeholder="Confirm your password"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-white/80">Payment Information</p>
                    <p className="text-white/60 text-xs mt-1">Your payment details are secure and encrypted</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold pl-10"
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                        maxLength={19}
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold"
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="bg-luxury-rich-black border-luxury-gold/30 focus:border-luxury-gold"
                        placeholder="XXX"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit"
                className="w-full mt-6 bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              >
                {step === 1 ? "Continue" : "Complete Registration"}
              </Button>
              
              {step === 2 && (
                <Button 
                  type="button"
                  variant="ghost"
                  className="w-full mt-2 text-white/60 hover:text-white"
                  onClick={() => setStep(1)}
                >
                  Back to Previous Step
                </Button>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                Already have an account? <Link to="/login" className="text-luxury-gold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
