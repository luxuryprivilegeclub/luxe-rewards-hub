
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface Settings {
  siteTitle: string;
  siteTagline: string;
  currency: string;
  paymentMethods: string;
  silverPrice?: number;
  goldPrice?: number;
  platinumPrice?: number;
}

interface SettingsTabProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleSaveSettings: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  setSettings,
  handleSaveSettings
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
        <h3 className="text-xl font-medium mb-4">Site Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                value={settings.siteTitle}
                onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteTagline">Site Tagline</Label>
              <Input
                id="siteTagline"
                value={settings.siteTagline}
                onChange={(e) => setSettings({...settings, siteTagline: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethods">Payment Methods</Label>
              <Input
                id="paymentMethods"
                value={settings.paymentMethods}
                onChange={(e) => setSettings({...settings, paymentMethods: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30"
                placeholder="e.g. Credit Card, Bank Transfer"
              />
            </div>
          </div>
          
          <div className="border-t border-luxury-gold/20 pt-4 mt-4">
            <h4 className="text-lg font-medium mb-3">Membership Pricing</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="silverPrice">Silver Price</Label>
                <Input
                  id="silverPrice"
                  type="number"
                  value={settings.silverPrice || 35000}
                  onChange={(e) => setSettings({...settings, silverPrice: Number(e.target.value)})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goldPrice">Gold Price</Label>
                <Input
                  id="goldPrice"
                  type="number"
                  value={settings.goldPrice || 70000}
                  onChange={(e) => setSettings({...settings, goldPrice: Number(e.target.value)})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platinumPrice">Platinum Price</Label>
                <Input
                  id="platinumPrice"
                  type="number"
                  value={settings.platinumPrice || 150000}
                  onChange={(e) => setSettings({...settings, platinumPrice: Number(e.target.value)})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              onClick={handleSaveSettings}
            >
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
