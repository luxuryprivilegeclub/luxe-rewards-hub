
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileEdit,
  Tag,
  UserPlus,
  Settings,
  LogOut,
  Lock,
} from "lucide-react";
import Footer from "@/components/Footer";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Mock admin credentials - in a real app, this would be handled securely
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.info("Logged out successfully");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-luxury-rich-black flex items-center justify-center p-4">
        <Helmet>
          <title>Admin Login | Luxury Hotel Privileges</title>
        </Helmet>

        <div className="w-full max-w-md">
          <div className="bg-black border border-luxury-gold/20 rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-display text-luxury-gradient mb-2">Admin Portal</h1>
              <p className="text-white/60 text-sm">Enter your credentials to access the admin panel</p>
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
  }

  return (
    <div className="min-h-screen bg-luxury-rich-black text-white">
      <Helmet>
        <title>Admin Panel | Luxury Hotel Privileges</title>
      </Helmet>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-black border-r border-luxury-gold/20 flex flex-col">
          <div className="p-4 border-b border-luxury-gold/20">
            <h1 className="text-xl font-display text-luxury-gradient">Admin Panel</h1>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <FileEdit className="mr-2 h-4 w-4" /> Pages
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Tag className="mr-2 h-4 w-4" /> Deals
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" /> Members
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-luxury-gold/20">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-black border-b border-luxury-gold/20 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Welcome to Admin Dashboard</h2>
              <div className="flex items-center">
                <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
                <span className="text-white/70">Admin User</span>
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6">
            <Tabs defaultValue="dashboard">
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">Total Pages</h3>
                    <p className="text-3xl font-display">5</p>
                  </div>
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">Active Deals</h3>
                    <p className="text-3xl font-display">4</p>
                  </div>
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">Members</h3>
                    <p className="text-3xl font-display">27</p>
                  </div>
                </div>
                
                <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
                  <h3 className="text-xl font-medium mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10">
                      Add New Deal
                    </Button>
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10">
                      Edit Home Page
                    </Button>
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10">
                      Manage Members
                    </Button>
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10">
                      Site Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Pages Tab */}
              <TabsContent value="pages" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-display">Manage Pages</h2>
                  <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                    Add New Page
                  </Button>
                </div>
                
                <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-luxury-gold/20">
                        <th className="text-left p-4">Page Name</th>
                        <th className="text-left p-4">URL</th>
                        <th className="text-left p-4">Last Modified</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-luxury-gold/10">
                        <td className="p-4">Home</td>
                        <td className="p-4">/</td>
                        <td className="p-4">2023-05-15</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="text-luxury-gold mr-2">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b border-luxury-gold/10">
                        <td className="p-4">About</td>
                        <td className="p-4">/about</td>
                        <td className="p-4">2023-05-12</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="text-luxury-gold mr-2">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b border-luxury-gold/10">
                        <td className="p-4">Blog</td>
                        <td className="p-4">/blog</td>
                        <td className="p-4">2023-05-10</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="text-luxury-gold mr-2">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b border-luxury-gold/10">
                        <td className="p-4">Contact</td>
                        <td className="p-4">/contact</td>
                        <td className="p-4">2023-05-08</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="text-luxury-gold mr-2">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">Not Found</td>
                        <td className="p-4">*</td>
                        <td className="p-4">2023-05-05</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="text-luxury-gold mr-2">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              {/* Deals Tab */}
              <TabsContent value="deals" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-display">Manage Deals</h2>
                  <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                    Add New Deal
                  </Button>
                </div>
                
                <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-luxury-gold/20">
                        <th className="text-left p-4">Hotel Name</th>
                        <th className="text-left p-4">Location</th>
                        <th className="text-left p-4">Regular Price</th>
                        <th className="text-left p-4">Member Price</th>
                        <th className="text-left p-4">Discount</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          title: "Marriott Hotel Islamabad",
                          location: "Islamabad, Pakistan",
                          regularPrice: 35000,
                          memberPrice: 28000,
                          discount: 20
                        },
                        {
                          title: "Pearl Continental Lahore",
                          location: "Lahore, Pakistan",
                          regularPrice: 29500,
                          memberPrice: 23600,
                          discount: 20
                        },
                        {
                          title: "Movenpick Hotel Karachi",
                          location: "Karachi, Pakistan",
                          regularPrice: 32000,
                          memberPrice: 25600,
                          discount: 20
                        },
                        {
                          title: "Serena Hotel Gilgit",
                          location: "Gilgit, Pakistan",
                          regularPrice: 27000,
                          memberPrice: 21600,
                          discount: 20
                        }
                      ].map((deal, index) => (
                        <tr key={index} className="border-b border-luxury-gold/10">
                          <td className="p-4">{deal.title}</td>
                          <td className="p-4">{deal.location}</td>
                          <td className="p-4">PKR {deal.regularPrice.toLocaleString()}</td>
                          <td className="p-4">PKR {deal.memberPrice.toLocaleString()}</td>
                          <td className="p-4">{deal.discount}%</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm" className="text-luxury-gold mr-2">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              {/* Members Tab */}
              <TabsContent value="members" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-display">Manage Members</h2>
                  <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                    Add New Member
                  </Button>
                </div>
                
                <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-luxury-gold/20">
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Membership Type</th>
                        <th className="text-left p-4">Join Date</th>
                        <th className="text-left p-4">Points</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Ahmed Khan", email: "ahmed@example.com", type: "Gold", date: "2023-01-15", points: 1250 },
                        { name: "Sara Ali", email: "sara@example.com", type: "Platinum", date: "2023-02-22", points: 3400 },
                        { name: "Imran Ahmed", email: "imran@example.com", type: "Silver", date: "2023-03-10", points: 750 },
                        { name: "Fatima Rizvi", email: "fatima@example.com", type: "Gold", date: "2023-04-05", points: 1800 }
                      ].map((member, index) => (
                        <tr key={index} className="border-b border-luxury-gold/10">
                          <td className="p-4">{member.name}</td>
                          <td className="p-4">{member.email}</td>
                          <td className="p-4">{member.type}</td>
                          <td className="p-4">{member.date}</td>
                          <td className="p-4">{member.points}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm" className="text-luxury-gold mr-2">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-display mb-6">Website Settings</h2>
                
                <div className="bg-black border border-luxury-gold/20 rounded-xl p-6 space-y-6">
                  <h3 className="text-xl font-medium">General Settings</h3>
                  <Separator className="bg-luxury-gold/20" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="site-title">Website Title</Label>
                      <Input id="site-title" defaultValue="Luxury Hotel Privileges" className="bg-luxury-rich-black border-luxury-gold/30" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="site-tagline">Tagline</Label>
                      <Input id="site-tagline" defaultValue="Pakistan's Premium Hotel Loyalty Program" className="bg-luxury-rich-black border-luxury-gold/30" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                      Save Settings
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black border border-luxury-gold/20 rounded-xl p-6 space-y-6">
                  <h3 className="text-xl font-medium">Payment Settings</h3>
                  <Separator className="bg-luxury-gold/20" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Input id="currency" defaultValue="PKR" className="bg-luxury-rich-black border-luxury-gold/30" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-methods">Payment Methods</Label>
                      <Input id="payment-methods" defaultValue="Credit Card, Bank Transfer" className="bg-luxury-rich-black border-luxury-gold/30" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
