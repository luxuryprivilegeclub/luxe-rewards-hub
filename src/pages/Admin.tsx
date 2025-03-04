
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Import admin components
import AdminLogin from "@/components/admin/AdminLogin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardTab from "@/components/admin/DashboardTab";
import PagesTab from "@/components/admin/PagesTab";
import DealsTab from "@/components/admin/DealsTab";
import TourPackagesTab from "@/components/admin/TourPackagesTab";
import MembersTab from "@/components/admin/MembersTab";
import SettingsTab from "@/components/admin/SettingsTab";

// Import types and database helpers
import { Page, Deal, TourPackage, Member, Settings } from "@/components/admin/types";
import { getDatabase, saveDatabase, deleteResource, formatPrice } from "@/utils/database";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  
  // State for database data
  const [pages, setPages] = useState<Page[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [settings, setSettings] = useState<Settings>({
    siteTitle: "",
    siteTagline: "",
    currency: "",
    paymentMethods: ""
  });
  
  // State for editing
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [editingTourPackage, setEditingTourPackage] = useState<TourPackage | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Load data from database and check authentication
  useEffect(() => {
    console.log("Admin component mounted");
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const db = await getDatabase();
        setPages(db.pages || []);
        setDeals(db.deals || []);
        setTourPackages(db.tourPackages || []);
        setMembers(db.members || []);
        setSettings(db.settings || {
          siteTitle: "",
          siteTagline: "",
          currency: "",
          paymentMethods: ""
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated") === "true";
    console.log("Admin authentication status:", adminAuth);
    setIsAuthenticated(adminAuth);
    
    if (adminAuth) {
      fetchData();
    }
  }, []);

  const handleLogin = () => {
    console.log("Admin logged in successfully");
    setIsAuthenticated(true);
    // Fetch data after login
    getDatabase().then(db => {
      setPages(db.pages || []);
      setDeals(db.deals || []);
      setTourPackages(db.tourPackages || []);
      setMembers(db.members || []);
      setSettings(db.settings || {
        siteTitle: "",
        siteTagline: "",
        currency: "",
        paymentMethods: ""
      });
    }).catch(error => {
      console.error("Error fetching data after login:", error);
      toast.error("Failed to load data. Please try again.");
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("userRole");
    toast.info("Logged out successfully");
    navigate("/");
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // This will programmatically select the tab in the Tabs component
    const tabTrigger = document.querySelector(`[data-value="${tab}"]`) as HTMLButtonElement;
    if (tabTrigger) {
      tabTrigger.click();
    }
  };
  
  // CRUD operations for pages
  const handleSavePage = async (page: Page) => {
    const now = new Date().toISOString().split('T')[0];
    
    try {
      if (page.id) {
        // Update existing page
        const updatedPages = pages.map(p => 
          p.id === page.id ? {...page, lastModified: now} : p
        );
        setPages(updatedPages);
        
        await saveDatabase({
          ...await getDatabase(),
          pages: updatedPages
        });
        
        toast.success(`Page "${page.title}" updated successfully`);
      } else {
        // Add new page
        const newPage = {
          ...page,
          lastModified: now
        };
        
        const newPages = [...pages, newPage];
        setPages(newPages);
        
        await saveDatabase({
          ...await getDatabase(),
          pages: newPages
        });
        
        toast.success(`Page "${page.title}" created successfully`);
      }
      
      setEditingPage(null);
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error("Failed to save page. Please try again.");
    }
  };
  
  // CRUD operations for deals
  const handleSaveDeal = async (deal: Deal) => {
    try {
      if (deal.id) {
        // Update existing deal
        const updatedDeals = deals.map(d => 
          d.id === deal.id ? deal : d
        );
        setDeals(updatedDeals);
        
        await saveDatabase({
          ...await getDatabase(),
          deals: updatedDeals
        });
        
        toast.success(`Deal "${deal.title}" updated successfully`);
      } else {
        // Add new deal
        const newDeals = [...deals, deal];
        setDeals(newDeals);
        
        await saveDatabase({
          ...await getDatabase(),
          deals: newDeals
        });
        
        toast.success(`Deal "${deal.title}" created successfully`);
      }
      
      setEditingDeal(null);
    } catch (error) {
      console.error("Error saving deal:", error);
      toast.error("Failed to save deal. Please try again.");
    }
  };

  // CRUD operations for tour packages
  const handleSaveTourPackage = async (tourPackage: TourPackage) => {
    try {
      if (tourPackage.id) {
        // Update existing tour package
        const updatedTourPackages = tourPackages.map(tp => 
          tp.id === tourPackage.id ? tourPackage : tp
        );
        setTourPackages(updatedTourPackages);
        
        await saveDatabase({
          ...await getDatabase(),
          tourPackages: updatedTourPackages
        });
        
        toast.success(`Tour Package "${tourPackage.title}" updated successfully`);
      } else {
        // Add new tour package
        const newTourPackages = [...tourPackages, tourPackage];
        setTourPackages(newTourPackages);
        
        await saveDatabase({
          ...await getDatabase(),
          tourPackages: newTourPackages
        });
        
        toast.success(`Tour Package "${tourPackage.title}" created successfully`);
      }
      
      setEditingTourPackage(null);
    } catch (error) {
      console.error("Error saving tour package:", error);
      toast.error("Failed to save tour package. Please try again.");
    }
  };
  
  // CRUD operations for members
  const handleSaveMember = async (member: Member) => {
    try {
      if (member.id) {
        // Update existing member
        const updatedMembers = members.map(m => 
          m.id === member.id ? member : m
        );
        setMembers(updatedMembers);
        
        await saveDatabase({
          ...await getDatabase(),
          members: updatedMembers
        });
        
        toast.success(`Member "${member.name}" updated successfully`);
      } else {
        // Add new member
        const newMember = {
          ...member,
          date: new Date().toISOString().split('T')[0]
        };
        
        const newMembers = [...members, newMember];
        setMembers(newMembers);
        
        await saveDatabase({
          ...await getDatabase(),
          members: newMembers
        });
        
        toast.success(`Member "${member.name}" created successfully`);
      }
      
      setEditingMember(null);
    } catch (error) {
      console.error("Error saving member:", error);
      toast.error("Failed to save member. Please try again.");
    }
  };
  
  // Save settings
  const handleSaveSettings = async () => {
    try {
      await saveDatabase({
        ...await getDatabase(),
        settings
      });
      
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings. Please try again.");
    }
  };
  
  // Delete operations
  const handleDeleteDeal = async (id: number) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      try {
        // Delete from database
        const success = await deleteResource('deals', id);
        
        if (success) {
          // Update state
          setDeals(deals.filter(d => d.id !== id));
          toast.success("Deal deleted successfully");
        } else {
          toast.error("Failed to delete deal. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting deal:", error);
        toast.error("Failed to delete deal. Please try again.");
      }
    }
  };
  
  const handleDeleteTourPackage = async (id: number) => {
    if (confirm("Are you sure you want to delete this tour package?")) {
      try {
        // Delete from database
        const success = await deleteResource('tour_packages', id);
        
        if (success) {
          // Update state
          setTourPackages(tourPackages.filter(tp => tp.id !== id));
          toast.success("Tour package deleted successfully");
        } else {
          toast.error("Failed to delete tour package. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting tour package:", error);
        toast.error("Failed to delete tour package. Please try again.");
      }
    }
  };
  
  const handleDeleteMember = async (id: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        // Delete from database
        const success = await deleteResource('members', id);
        
        if (success) {
          // Update state
          setMembers(members.filter(m => m.id !== id));
          toast.success("Member deleted successfully");
        } else {
          toast.error("Failed to delete member. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        toast.error("Failed to delete member. Please try again.");
      }
    }
  };

  console.log("Rendering Admin component, isAuthenticated:", isAuthenticated);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, showing login screen");
    return <AdminLogin onLogin={handleLogin} />;
  }

  console.log("Authenticated, showing admin panel");
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-rich-black text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-luxury-rich-black text-white">
      <Helmet>
        <title>Admin Panel | Luxury Privilege Club</title>
      </Helmet>

      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar onTabChange={handleTabChange} onLogout={handleLogout} />
        
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
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
                <TabsTrigger value="tourPackages">Tour Packages</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              {/* Dashboard Tab */}
              <TabsContent value="dashboard">
                <DashboardTab 
                  pagesCount={pages.length}
                  dealsCount={deals.length}
                  tourPackagesCount={tourPackages.length}
                  membersCount={members.length}
                  onNewDeal={() => {
                    setEditingDeal({
                      title: "",
                      location: "",
                      imageUrl: "",
                      regularPrice: 0,
                      memberPrice: 0,
                      discount: 0,
                      rating: 0,
                      description: ""
                    });
                    handleTabChange("deals");
                  }}
                  onNewTourPackage={() => {
                    setEditingTourPackage({
                      title: "",
                      location: "",
                      imageUrl: "",
                      regularPrice: 0,
                      memberPrice: 0,
                      discount: 0,
                      rating: 0,
                      description: ""
                    });
                    handleTabChange("tourPackages");
                  }}
                  onNewPage={() => {
                    setEditingPage({
                      title: "",
                      url: "",
                      content: ""
                    });
                    handleTabChange("pages");
                  }}
                  onNewMember={() => {
                    setEditingMember({
                      name: "",
                      email: "",
                      type: "Silver",
                      points: 0
                    });
                    handleTabChange("members");
                  }}
                />
              </TabsContent>
              
              {/* Pages Tab */}
              <TabsContent value="pages">
                <PagesTab 
                  pages={pages}
                  editingPage={editingPage}
                  setEditingPage={setEditingPage}
                  handleSavePage={handleSavePage}
                />
              </TabsContent>
              
              {/* Deals Tab */}
              <TabsContent value="deals">
                <DealsTab 
                  deals={deals}
                  editingDeal={editingDeal}
                  setEditingDeal={setEditingDeal}
                  handleSaveDeal={handleSaveDeal}
                  handleDeleteDeal={handleDeleteDeal}
                  formatPrice={formatPrice}
                />
              </TabsContent>
              
              {/* Tour Packages Tab */}
              <TabsContent value="tourPackages">
                <TourPackagesTab 
                  tourPackages={tourPackages}
                  editingTourPackage={editingTourPackage}
                  setEditingTourPackage={setEditingTourPackage}
                  handleSaveTourPackage={handleSaveTourPackage}
                  handleDeleteTourPackage={handleDeleteTourPackage}
                  formatPrice={formatPrice}
                />
              </TabsContent>
              
              {/* Members Tab */}
              <TabsContent value="members">
                <MembersTab 
                  members={members}
                  editingMember={editingMember}
                  setEditingMember={setEditingMember}
                  handleSaveMember={handleSaveMember}
                  handleDeleteMember={handleDeleteMember}
                />
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <SettingsTab 
                  settings={settings}
                  setSettings={setSettings}
                  handleSaveSettings={handleSaveSettings}
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
