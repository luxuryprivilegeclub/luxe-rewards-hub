
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
