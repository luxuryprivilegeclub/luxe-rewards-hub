
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CreditCard, 
  Building2, 
  ArrowRight, 
  Check, 
  User,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { toast } from "sonner";

type MembershipStep = "personal" | "payment" | "confirmation";

const JoinNowForm = () => {
  const [step, setStep] = useState<MembershipStep>("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    membershipType: "gold",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === "personal") {
      setStep("payment");
    } else if (step === "payment") {
      // In a real app, you would process the payment here
      setStep("confirmation");
      toast.success("Membership registration successful!");
    }
  };

  const handleBack = () => {
    if (step === "payment") {
      setStep("personal");
    }
  };

  const handleFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Close the dialog and reset the form
    setStep("personal");
  };

  const renderPersonalInfo = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-luxury-rich-black border-luxury-gold/30"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="bg-luxury-rich-black border-luxury-gold/30"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
            placeholder="Enter your address"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="bg-luxury-rich-black border-luxury-gold/30"
          placeholder="Enter your city"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="membershipType">Membership Type</Label>
        <Select
          value={formData.membershipType}
          onValueChange={(value) => handleSelect("membershipType", value)}
        >
          <SelectTrigger className="bg-luxury-rich-black border-luxury-gold/30">
            <SelectValue placeholder="Select membership type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="silver">Silver (PKR 5,000/year)</SelectItem>
            <SelectItem value="gold">Gold (PKR 15,000/year)</SelectItem>
            <SelectItem value="platinum">Platinum (PKR 25,000/year)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleNext}
          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
        >
          Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );

  const renderPaymentInfo = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div
            className={`border rounded-md p-4 cursor-pointer flex items-center space-x-3 ${
              formData.paymentMethod === "credit-card"
                ? "border-luxury-gold bg-luxury-gold/10"
                : "border-luxury-gold/30"
            }`}
            onClick={() => handleSelect("paymentMethod", "credit-card")}
          >
            <CreditCard className="h-5 w-5 text-luxury-gold" />
            <span>Credit Card</span>
          </div>
          <div
            className={`border rounded-md p-4 cursor-pointer flex items-center space-x-3 ${
              formData.paymentMethod === "bank-transfer"
                ? "border-luxury-gold bg-luxury-gold/10"
                : "border-luxury-gold/30"
            }`}
            onClick={() => handleSelect("paymentMethod", "bank-transfer")}
          >
            <Building2 className="h-5 w-5 text-luxury-gold" />
            <span>Bank Transfer</span>
          </div>
        </div>
      </div>

      {formData.paymentMethod === "credit-card" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              className="bg-luxury-rich-black border-luxury-gold/30"
              placeholder="Enter name on card"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="bg-luxury-rich-black border-luxury-gold/30"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="bg-luxury-rich-black border-luxury-gold/30"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                value={formData.cvv}
                onChange={handleChange}
                className="bg-luxury-rich-black border-luxury-gold/30"
                placeholder="123"
                required
              />
            </div>
          </div>
        </>
      )}

      {formData.paymentMethod === "bank-transfer" && (
        <div className="p-4 border border-luxury-gold/30 rounded-md bg-luxury-gold/5 mt-2">
          <h4 className="font-medium text-luxury-gold mb-2">Bank Transfer Instructions</h4>
          <p className="text-sm text-white/70 mb-2">
            Please transfer the membership fee to the following account:
          </p>
          <div className="space-y-1 text-sm">
            <p><span className="text-white/50">Bank:</span> Premier Bank Pakistan</p>
            <p><span className="text-white/50">Account Name:</span> Luxury Hotel Privileges</p>
            <p><span className="text-white/50">Account Number:</span> 1234-5678-9012-3456</p>
            <p><span className="text-white/50">IBAN:</span> PK36PREM1234567890123456</p>
          </div>
          <p className="text-sm text-white/70 mt-2">
            After making the transfer, please email your receipt to <span className="text-luxury-gold">payments@luxuryhotels.pk</span>
          </p>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="border-luxury-gold/50 hover:bg-luxury-gold/10"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
        >
          Complete Registration
        </Button>
      </div>
    </>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6 py-4">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-8 w-8 text-green-500" />
      </div>
      
      <h3 className="text-xl font-medium">Registration Successful!</h3>
      
      <p className="text-white/70">
        Thank you for joining Luxury Hotel Privileges. Your membership details have been sent to your email.
      </p>
      
      <div className="bg-luxury-rich-black border border-luxury-gold/20 rounded-md p-4 text-left">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-white/60">Membership Type:</div>
          <div className="font-medium">{formData.membershipType.charAt(0).toUpperCase() + formData.membershipType.slice(1)}</div>
          
          <div className="text-white/60">Member Name:</div>
          <div className="font-medium">{formData.firstName} {formData.lastName}</div>
          
          <div className="text-white/60">Member ID:</div>
          <div className="font-medium">LHP-{Math.floor(Math.random() * 900000) + 100000}</div>
        </div>
      </div>
      
      <Button 
        onClick={handleFinish}
        className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
      >
        Done
      </Button>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black min-w-[160px]">
          Become a Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black border-luxury-gold/20">
        <DialogHeader>
          <DialogTitle className="text-luxury-gradient text-2xl">Join Luxury Hotel Privileges</DialogTitle>
          <DialogDescription>
            Complete the form below to join our exclusive membership program and unlock premium hotel rates.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {step === "personal" && renderPersonalInfo()}
          {step === "payment" && renderPaymentInfo()}
          {step === "confirmation" && renderConfirmation()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinNowForm;
