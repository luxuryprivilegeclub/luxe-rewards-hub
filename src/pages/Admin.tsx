
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

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
import { initLocalDatabase, getDatabase, saveDatabase, formatPrice } from "@/utils/database";

// Initialize the database
initLocalDatabase();

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
  
  // Load data from database
  useEffect(() => {
    const db = getDatabase();
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
    
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated") === "true";
    setIsAuthenticated(adminAuth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    toast.info("Logged out successfully");
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
  const handleSavePage = (page: Page) => {
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
  const handleSaveDeal = (deal: Deal) => {
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
  const handleSaveTourPackage = (tourPackage: TourPackage) => {
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
  const handleSaveMember = (member: Member) => {
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
  const handleDeleteDeal = (id: number) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      const db = getDatabase();
      db.deals = db.deals.filter(d => d.id !== id);
      setDeals(db.deals);
      saveDatabase(db);
      toast.success("Deal deleted successfully");
    }
  };
  
  const handleDeleteTourPackage = (id: number) => {
    if (confirm("Are you sure you want to delete this tour package?")) {
      const db = getDatabase();
      db.tourPackages = db.tourPackages.filter(tp => tp.id !== id);
      setTourPackages(db.tourPackages);
      saveDatabase(db);
      toast.success("Tour package deleted successfully");
    }
  };
  
  const handleDeleteMember = (id: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      const db = getDatabase();
      db.members = db.members.filter(m => m.id !== id);
      setMembers(db.members);
      saveDatabase(db);
      toast.success("Member deleted successfully");
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
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
