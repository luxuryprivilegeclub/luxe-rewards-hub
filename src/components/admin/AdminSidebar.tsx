
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileEdit,
  Tag,
  UserPlus,
  Settings as SettingsIcon,
  LogOut
} from "lucide-react";

interface AdminSidebarProps {
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onTabChange, onLogout }) => {
  return (
    <div className="w-64 bg-black border-r border-luxury-gold/20 flex flex-col">
      <div className="p-4 border-b border-luxury-gold/20">
        <h1 className="text-xl font-display text-luxury-gradient">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => onTabChange("dashboard")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => onTabChange("pages")}
            >
              <FileEdit className="mr-2 h-4 w-4" /> Pages
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => onTabChange("deals")}
            >
              <Tag className="mr-2 h-4 w-4" /> Deals
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => onTabChange("tourPackages")}
            >
              <Tag className="mr-2 h-4 w-4" /> Tour Packages
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => onTabChange("members")}
            >
              <UserPlus className="mr-2 h-4 w-4" /> Members
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => onTabChange("settings")}
            >
              <SettingsIcon className="mr-2 h-4 w-4" /> Settings
            </Button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-luxury-gold/20">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
