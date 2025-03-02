
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileEdit,
  Tag,
  UserPlus,
  Settings,
  LogOut,
  Lock,
  MapPin,
  DollarSign,
  Percent,
  Star,
  Image as ImageIcon,
  Save,
  Plus,
  Trash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Footer from "@/components/Footer";

// Mock database - in a real application, this would be stored in a backend database
// This is a simple client-side simulation for demonstration purposes
const initLocalDatabase = () => {
  // Initialize database if it doesn't exist
  if (!localStorage.getItem("database")) {
    const initialDatabase = {
      pages: [
        { id: 1, title: "Home", url: "/", lastModified: "2023-05-15", content: "Home page content" },
        { id: 2, title: "About", url: "/about", lastModified: "2023-05-12", content: "About page content" },
        { id: 3, title: "Blog", url: "/blog", lastModified: "2023-05-10", content: "Blog page content" },
        { id: 4, title: "Contact", url: "/contact", lastModified: "2023-05-08", content: "Contact page content" },
        { id: 5, title: "Not Found", url: "*", lastModified: "2023-05-05", content: "Not found page content" },
      ],
      deals: [
        {
          id: 1,
          title: "Marriott Hotel Islamabad",
          location: "Islamabad, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 35000,
          memberPrice: 28000,
          discount: 20,
          rating: 4.8,
          description: "Luxury accommodation in the heart of Islamabad",
        },
        {
          id: 2,
          title: "Pearl Continental Lahore",
          location: "Lahore, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 29500,
          memberPrice: 23600,
          discount: 20,
          rating: 4.7,
          description: "Experience true luxury in Lahore's premier hotel",
        },
        {
          id: 3,
          title: "Movenpick Hotel Karachi",
          location: "Karachi, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 32000,
          memberPrice: 25600,
          discount: 20,
          rating: 4.6,
          description: "Elegant and modern accommodation in Karachi",
        },
        {
          id: 4,
          title: "Serena Hotel Gilgit",
          location: "Gilgit, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1770&auto=format&fit=crop",
          regularPrice: 27000,
          memberPrice: 21600,
          discount: 20,
          rating: 4.9,
          description: "Breathtaking views and exceptional service",
        },
      ],
      tourPackages: [
        {
          id: 1,
          title: "Hunza Valley Tour",
          location: "Hunza, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 45000,
          memberPrice: 36000,
          rating: 4.9,
          discount: 20,
          description: "Experience the natural beauty of Hunza Valley with our exclusive 5-day package tour."
        },
        {
          id: 2,
          title: "Skardu Adventure",
          location: "Skardu, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 52000,
          memberPrice: 41600,
          rating: 4.8,
          discount: 20,
          description: "Discover the breathtaking landscapes of Skardu with our 7-day adventure tour package."
        },
        {
          id: 3,
          title: "Naran Kaghan Expedition",
          location: "Naran, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1496275068113-fff8c90750d1?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 38000,
          memberPrice: 30400,
          rating: 4.7,
          discount: 20,
          description: "Explore the stunning valleys of Naran and Kaghan with our all-inclusive 4-day tour."
        },
        {
          id: 4,
          title: "Murree Getaway",
          location: "Murree, Pakistan",
          imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1500&auto=format&fit=crop",
          regularPrice: 25000,
          memberPrice: 20000,
          rating: 4.6,
          discount: 20,
          description: "Escape to Murree for a relaxing 3-day getaway with comfortable accommodations and guided tours."
        }
      ],
      members: [
        { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", type: "Gold", date: "2023-01-15", points: 1250 },
        { id: 2, name: "Sara Ali", email: "sara@example.com", type: "Platinum", date: "2023-02-22", points: 3400 },
        { id: 3, name: "Imran Ahmed", email: "imran@example.com", type: "Silver", date: "2023-03-10", points: 750 },
        { id: 4, name: "Fatima Rizvi", email: "fatima@example.com", type: "Gold", date: "2023-04-05", points: 1800 },
      ],
      settings: {
        siteTitle: "Luxury Hotel Privileges",
        siteTagline: "Pakistan's Premium Hotel Loyalty Program",
        currency: "PKR",
        paymentMethods: "Credit Card, Bank Transfer",
      },
    };
    
    localStorage.setItem("database", JSON.stringify(initialDatabase));
  }
};

// Initialize the database
initLocalDatabase();

// Helper functions to interact with the "database"
const getDatabase = () => {
  return JSON.parse(localStorage.getItem("database") || "{}");
};

const saveDatabase = (data) => {
  localStorage.setItem("database", JSON.stringify(data));
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // State for database data
  const [pages, setPages] = useState([]);
  const [deals, setDeals] = useState([]);
  const [tourPackages, setTourPackages] = useState([]);
  const [members, setMembers] = useState([]);
  const [settings, setSettings] = useState({});
  
  // State for editing
  const [editingPage, setEditingPage] = useState(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [editingTourPackage, setEditingTourPackage] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  
  // Load data from database
  useEffect(() => {
    const db = getDatabase();
    setPages(db.pages || []);
    setDeals(db.deals || []);
    setTourPackages(db.tourPackages || []);
    setMembers(db.members || []);
    setSettings(db.settings || {});
    
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated") === "true";
    setIsAuthenticated(adminAuth);
  }, []);

  // Mock admin credentials - in a real app, this would be handled securely
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    toast.info("Logged out successfully");
  };
  
  // CRUD operations for pages
  const handleSavePage = (page) => {
    const db = getDatabase();
    const now = new Date().toISOString().split('T')[0];
    
    if (page.id) {
      // Update existing page
      const updatedPages = db.pages.map(p => 
        p.id === page.id ? {...page, lastModified: now} : p
      );
      db.pages = updatedPages;
      setPages(updatedPages);
      toast.success(`Page "${page.title}" updated successfully`);
    } else {
      // Add new page
      const newPage = {
        ...page,
        id: Date.now(),
        lastModified: now
      };
      db.pages = [...db.pages, newPage];
      setPages([...db.pages]);
      toast.success(`Page "${page.title}" created successfully`);
    }
    
    saveDatabase(db);
    setEditingPage(null);
  };
  
  // CRUD operations for deals
  const handleSaveDeal = (deal) => {
    const db = getDatabase();
    
    if (deal.id) {
      // Update existing deal
      const updatedDeals = db.deals.map(d => 
        d.id === deal.id ? deal : d
      );
      db.deals = updatedDeals;
      setDeals(updatedDeals);
      toast.success(`Deal "${deal.title}" updated successfully`);
    } else {
      // Add new deal
      const newDeal = {
        ...deal,
        id: Date.now(),
      };
      db.deals = [...db.deals, newDeal];
      setDeals([...db.deals]);
      toast.success(`Deal "${deal.title}" created successfully`);
    }
    
    saveDatabase(db);
    setEditingDeal(null);
  };

  // CRUD operations for tour packages
  const handleSaveTourPackage = (tourPackage) => {
    const db = getDatabase();
    
    if (tourPackage.id) {
      // Update existing tour package
      const updatedTourPackages = db.tourPackages.map(tp => 
        tp.id === tourPackage.id ? tourPackage : tp
      );
      db.tourPackages = updatedTourPackages;
      setTourPackages(updatedTourPackages);
      toast.success(`Tour Package "${tourPackage.title}" updated successfully`);
    } else {
      // Add new tour package
      const newTourPackage = {
        ...tourPackage,
        id: Date.now(),
      };
      db.tourPackages = [...db.tourPackages, newTourPackage];
      setTourPackages([...db.tourPackages]);
      toast.success(`Tour Package "${tourPackage.title}" created successfully`);
    }
    
    saveDatabase(db);
    setEditingTourPackage(null);
  };
  
  // CRUD operations for members
  const handleSaveMember = (member) => {
    const db = getDatabase();
    
    if (member.id) {
      // Update existing member
      const updatedMembers = db.members.map(m => 
        m.id === member.id ? member : m
      );
      db.members = updatedMembers;
      setMembers(updatedMembers);
      toast.success(`Member "${member.name}" updated successfully`);
    } else {
      // Add new member
      const newMember = {
        ...member,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };
      db.members = [...db.members, newMember];
      setMembers([...db.members]);
      toast.success(`Member "${member.name}" created successfully`);
    }
    
    saveDatabase(db);
    setEditingMember(null);
  };
  
  // Save settings
  const handleSaveSettings = () => {
    const db = getDatabase();
    db.settings = settings;
    saveDatabase(db);
    toast.success("Settings updated successfully");
  };
  
  // Delete operations
  const handleDeleteDeal = (id) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      const db = getDatabase();
      db.deals = db.deals.filter(d => d.id !== id);
      setDeals(db.deals);
      saveDatabase(db);
      toast.success("Deal deleted successfully");
    }
  };
  
  const handleDeleteTourPackage = (id) => {
    if (confirm("Are you sure you want to delete this tour package?")) {
      const db = getDatabase();
      db.tourPackages = db.tourPackages.filter(tp => tp.id !== id);
      setTourPackages(db.tourPackages);
      saveDatabase(db);
      toast.success("Tour package deleted successfully");
    }
  };
  
  const handleDeleteMember = (id) => {
    if (confirm("Are you sure you want to delete this member?")) {
      const db = getDatabase();
      db.members = db.members.filter(m => m.id !== id);
      setMembers(db.members);
      saveDatabase(db);
      toast.success("Member deleted successfully");
    }
  };

  // Format price with commas
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
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
                <TabsTrigger value="tourPackages">Tour Packages</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">Total Pages</h3>
                    <p className="text-3xl font-display">{pages.length}</p>
                  </div>
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">Hotel Deals</h3>
                    <p className="text-3xl font-display">{deals.length}</p>
                  </div>
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">Tour Packages</h3>
                    <p className="text-3xl font-display">{tourPackages.length}</p>
                  </div>
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-2">Members</h3>
                    <p className="text-3xl font-display">{members.length}</p>
                  </div>
                </div>
                
                <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
                  <h3 className="text-xl font-medium mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10"
                      onClick={() => setEditingDeal({
                        title: "",
                        location: "",
                        imageUrl: "",
                        regularPrice: 0,
                        memberPrice: 0,
                        discount: 0,
                        rating: 0,
                        description: ""
                      })}>
                      Add New Deal
                    </Button>
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10"
                      onClick={() => setEditingTourPackage({
                        title: "",
                        location: "",
                        imageUrl: "",
                        regularPrice: 0,
                        memberPrice: 0,
                        discount: 0,
                        rating: 0,
                        description: ""
                      })}>
                      Add New Tour Package
                    </Button>
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10"
                      onClick={() => setEditingPage({
                        title: "",
                        url: "",
                        content: ""
                      })}>
                      Add New Page
                    </Button>
                    <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10"
                      onClick={() => setEditingMember({
                        name: "",
                        email: "",
                        type: "Silver",
                        points: 0
                      })}>
                      Add New Member
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Pages Tab */}
              <TabsContent value="pages" className="space-y-6">
                {editingPage ? (
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-4">
                      {editingPage.id ? `Edit Page: ${editingPage.title}` : "Add New Page"}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pageTitle">Page Title</Label>
                          <Input
                            id="pageTitle"
                            value={editingPage.title}
                            onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pageUrl">URL Path</Label>
                          <Input
                            id="pageUrl"
                            value={editingPage.url}
                            onChange={(e) => setEditingPage({...editingPage, url: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pageContent">Content</Label>
                        <Textarea
                          id="pageContent"
                          value={editingPage.content}
                          onChange={(e) => setEditingPage({...editingPage, content: e.target.value})}
                          className="bg-luxury-rich-black border-luxury-gold/30 min-h-[200px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setEditingPage(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                          onClick={() => handleSavePage(editingPage)}
                        >
                          <Save className="mr-2 h-4 w-4" /> Save Page
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-display">Manage Pages</h2>
                      <Button 
                        className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                        onClick={() => setEditingPage({
                          title: "",
                          url: "",
                          content: ""
                        })}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add New Page
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
                          {pages.map((page) => (
                            <tr key={page.id} className="border-b border-luxury-gold/10">
                              <td className="p-4">{page.title}</td>
                              <td className="p-4">{page.url}</td>
                              <td className="p-4">{page.lastModified}</td>
                              <td className="p-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-luxury-gold mr-2"
                                  onClick={() => setEditingPage(page)}
                                >
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </TabsContent>
              
              {/* Deals Tab */}
              <TabsContent value="deals" className="space-y-6">
                {editingDeal ? (
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-4">
                      {editingDeal.id ? `Edit Deal: ${editingDeal.title}` : "Add New Deal"}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dealTitle">Hotel Name</Label>
                          <Input
                            id="dealTitle"
                            value={editingDeal.title}
                            onChange={(e) => setEditingDeal({...editingDeal, title: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dealLocation">Location</Label>
                          <div className="relative">
                            <Input
                              id="dealLocation"
                              value={editingDeal.location}
                              onChange={(e) => setEditingDeal({...editingDeal, location: e.target.value})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dealImageUrl">Image URL</Label>
                        <div className="relative">
                          <Input
                            id="dealImageUrl"
                            value={editingDeal.imageUrl}
                            onChange={(e) => setEditingDeal({...editingDeal, imageUrl: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                          />
                          <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dealRegularPrice">Regular Price</Label>
                          <div className="relative">
                            <Input
                              id="dealRegularPrice"
                              type="number"
                              value={editingDeal.regularPrice}
                              onChange={(e) => setEditingDeal({...editingDeal, regularPrice: Number(e.target.value)})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dealMemberPrice">Member Price</Label>
                          <div className="relative">
                            <Input
                              id="dealMemberPrice"
                              type="number"
                              value={editingDeal.memberPrice}
                              onChange={(e) => setEditingDeal({...editingDeal, memberPrice: Number(e.target.value)})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dealDiscount">Discount %</Label>
                          <div className="relative">
                            <Input
                              id="dealDiscount"
                              type="number"
                              value={editingDeal.discount}
                              onChange={(e) => setEditingDeal({...editingDeal, discount: Number(e.target.value)})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dealRating">Rating</Label>
                        <div className="relative">
                          <Input
                            id="dealRating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={editingDeal.rating}
                            onChange={(e) => setEditingDeal({...editingDeal, rating: Number(e.target.value)})}
                            className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                          />
                          <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dealDescription">Description</Label>
                        <Textarea
                          id="dealDescription"
                          value={editingDeal.description}
                          onChange={(e) => setEditingDeal({...editingDeal, description: e.target.value})}
                          className="bg-luxury-rich-black border-luxury-gold/30 min-h-[100px]"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setEditingDeal(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                          onClick={() => handleSaveDeal(editingDeal)}
                        >
                          <Save className="mr-2 h-4 w-4" /> Save Deal
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-display">Manage Hotel Deals</h2>
                      <Button 
                        className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                        onClick={() => setEditingDeal({
                          title: "",
                          location: "",
                          imageUrl: "",
                          regularPrice: 0,
                          memberPrice: 0,
                          discount: 0,
                          rating: 0,
                          description: ""
                        })}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add New Deal
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
                          {deals.map((deal) => (
                            <tr key={deal.id} className="border-b border-luxury-gold/10">
                              <td className="p-4">{deal.title}</td>
                              <td className="p-4">{deal.location}</td>
                              <td className="p-4">PKR {formatPrice(deal.regularPrice)}</td>
                              <td className="p-4">PKR {formatPrice(deal.memberPrice)}</td>
                              <td className="p-4">{deal.discount}%</td>
                              <td className="p-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-luxury-gold mr-2"
                                  onClick={() => setEditingDeal(deal)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => handleDeleteDeal(deal.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </TabsContent>
              
              {/* Tour Packages Tab */}
              <TabsContent value="tourPackages" className="space-y-6">
                {editingTourPackage ? (
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-4">
                      {editingTourPackage.id ? `Edit Tour Package: ${editingTourPackage.title}` : "Add New Tour Package"}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tourTitle">Tour Name</Label>
                          <Input
                            id="tourTitle"
                            value={editingTourPackage.title}
                            onChange={(e) => setEditingTourPackage({...editingTourPackage, title: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tourLocation">Location</Label>
                          <div className="relative">
                            <Input
                              id="tourLocation"
                              value={editingTourPackage.location}
                              onChange={(e) => setEditingTourPackage({...editingTourPackage, location: e.target.value})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tourImageUrl">Image URL</Label>
                        <div className="relative">
                          <Input
                            id="tourImageUrl"
                            value={editingTourPackage.imageUrl}
                            onChange={(e) => setEditingTourPackage({...editingTourPackage, imageUrl: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                          />
                          <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tourRegularPrice">Regular Price</Label>
                          <div className="relative">
                            <Input
                              id="tourRegularPrice"
                              type="number"
                              value={editingTourPackage.regularPrice}
                              onChange={(e) => setEditingTourPackage({...editingTourPackage, regularPrice: Number(e.target.value)})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tourMemberPrice">Member Price</Label>
                          <div className="relative">
                            <Input
                              id="tourMemberPrice"
                              type="number"
                              value={editingTourPackage.memberPrice}
                              onChange={(e) => setEditingTourPackage({...editingTourPackage, memberPrice: Number(e.target.value)})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tourDiscount">Discount %</Label>
                          <div className="relative">
                            <Input
                              id="tourDiscount"
                              type="number"
                              value={editingTourPackage.discount}
                              onChange={(e) => setEditingTourPackage({...editingTourPackage, discount: Number(e.target.value)})}
                              className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                            />
                            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tourRating">Rating</Label>
                        <div className="relative">
                          <Input
                            id="tourRating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={editingTourPackage.rating}
                            onChange={(e) => setEditingTourPackage({...editingTourPackage, rating: Number(e.target.value)})}
                            className="bg-luxury-rich-black border-luxury-gold/30 pl-10"
                          />
                          <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/50 h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tourDescription">Description</Label>
                        <Textarea
                          id="tourDescription"
                          value={editingTourPackage.description}
                          onChange={(e) => setEditingTourPackage({...editingTourPackage, description: e.target.value})}
                          className="bg-luxury-rich-black border-luxury-gold/30 min-h-[100px]"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setEditingTourPackage(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                          onClick={() => handleSaveTourPackage(editingTourPackage)}
                        >
                          <Save className="mr-2 h-4 w-4" /> Save Tour Package
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-display">Manage Tour Packages</h2>
                      <Button 
                        className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                        onClick={() => setEditingTourPackage({
                          title: "",
                          location: "",
                          imageUrl: "",
                          regularPrice: 0,
                          memberPrice: 0,
                          discount: 0,
                          rating: 0,
                          description: ""
                        })}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add New Tour Package
                      </Button>
                    </div>
                    
                    <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-luxury-gold/20">
                            <th className="text-left p-4">Tour Name</th>
                            <th className="text-left p-4">Location</th>
                            <th className="text-left p-4">Regular Price</th>
                            <th className="text-left p-4">Member Price</th>
                            <th className="text-left p-4">Discount</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tourPackages.map((tour) => (
                            <tr key={tour.id} className="border-b border-luxury-gold/10">
                              <td className="p-4">{tour.title}</td>
                              <td className="p-4">{tour.location}</td>
                              <td className="p-4">PKR {formatPrice(tour.regularPrice)}</td>
                              <td className="p-4">PKR {formatPrice(tour.memberPrice)}</td>
                              <td className="p-4">{tour.discount}%</td>
                              <td className="p-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-luxury-gold mr-2"
                                  onClick={() => setEditingTourPackage(tour)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => handleDeleteTourPackage(tour.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </TabsContent>
              
              {/* Members Tab */}
              <TabsContent value="members" className="space-y-6">
                {editingMember ? (
                  <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-4">
                      {editingMember.id ? `Edit Member: ${editingMember.name}` : "Add New Member"}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="memberName">Full Name</Label>
                          <Input
                            id="memberName"
                            value={editingMember.name}
                            onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="memberEmail">Email</Label>
                          <Input
                            id="memberEmail"
                            type="email"
                            value={editingMember.email}
                            onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                            className="bg-luxury-rich-black border-luxury-gold/30"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="memberType">Membership Type</Label>
                          <select
                            id="memberType"
                            value={editingMember.type}
                            onChange={(e) => setEditingMember({...editingMember, type: e.target.value})}
                            className="bg-luxury-rich-black border border-luxury-gold/30 px-3 py-2 rounded-md w-full text-white"
                          >
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="memberPoints">Points</Label>
                          <Input
                            id="memberPoints"
                            type="number"
                            value={editingMember.points}
                            onChange={(e) => setEditingMember({...editingMember, points: Number(e.target.value)})}
                            className="bg-luxury-rich-black border-luxury-gold/30"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setEditingMember(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                          onClick={() => handleSaveMember(editingMember)}
                        >
                          <Save className="mr-2 h-4 w-4" /> {editingMember.id ? "Update Member" : "Add Member"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-display">Manage Members</h2>
                      <Button 
                        className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                        onClick={() => setEditingMember({
                          name: "",
                          email: "",
                          type: "Silver",
                          points: 0
                        })}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add New Member
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
                          {members.map((member) => (
                            <tr key={member.id} className="border-b border-luxury-gold/10">
                              <td className="p-4">{member.name}</td>
                              <td className="p-4">{member.email}</td>
                              <td className="p-4">{member.type}</td>
                              <td className="p-4">{member.date}</td>
                              <td className="p-4">{member.points}</td>
                              <td className="p-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-luxury-gold mr-2"
                                  onClick={() => setEditingMember(member)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => handleDeleteMember(member.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
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
                      <Input 
                        id="site-title" 
                        value={settings.siteTitle || ""}
                        onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                        className="bg-luxury-rich-black border-luxury-gold/30" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="site-tagline">Tagline</Label>
                      <Input 
                        id="site-tagline" 
                        value={settings.siteTagline || ""} 
                        onChange={(e) => setSettings({...settings, siteTagline: e.target.value})}
                        className="bg-luxury-rich-black border-luxury-gold/30" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button 
                      className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                      onClick={handleSaveSettings}
                    >
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
                      <Input 
                        id="currency" 
                        value={settings.currency || ""}
                        onChange={(e) => setSettings({...settings, currency: e.target.value})} 
                        className="bg-luxury-rich-black border-luxury-gold/30" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-methods">Payment Methods</Label>
                      <Input 
                        id="payment-methods" 
                        value={settings.paymentMethods || ""}
                        onChange={(e) => setSettings({...settings, paymentMethods: e.target.value})}
                        className="bg-luxury-rich-black border-luxury-gold/30" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button 
                      className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                      onClick={handleSaveSettings}
                    >
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
