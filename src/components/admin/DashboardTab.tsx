
import React from 'react';
import { Button } from "@/components/ui/button";

interface DashboardTabProps {
  pagesCount: number;
  dealsCount: number;
  tourPackagesCount: number;
  membersCount: number;
  onNewDeal: () => void;
  onNewTourPackage: () => void;
  onNewPage: () => void;
  onNewMember: () => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  pagesCount,
  dealsCount,
  tourPackagesCount,
  membersCount,
  onNewDeal,
  onNewTourPackage,
  onNewPage,
  onNewMember
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
          <h3 className="text-lg font-medium mb-2">Total Pages</h3>
          <p className="text-3xl font-display">{pagesCount}</p>
        </div>
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
          <h3 className="text-lg font-medium mb-2">Hotel Deals</h3>
          <p className="text-3xl font-display">{dealsCount}</p>
        </div>
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
          <h3 className="text-lg font-medium mb-2">Tour Packages</h3>
          <p className="text-3xl font-display">{tourPackagesCount}</p>
        </div>
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-4">
          <h3 className="text-lg font-medium mb-2">Members</h3>
          <p className="text-3xl font-display">{membersCount}</p>
        </div>
      </div>
      
      <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
        <h3 className="text-xl font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10" onClick={onNewDeal}>
            Add New Deal
          </Button>
          <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10" onClick={onNewTourPackage}>
            Add New Tour Package
          </Button>
          <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10" onClick={onNewPage}>
            Add New Page
          </Button>
          <Button variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10" onClick={onNewMember}>
            Add New Member
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
