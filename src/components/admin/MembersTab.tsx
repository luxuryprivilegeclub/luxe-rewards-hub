
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus } from "lucide-react";
import { toast } from "sonner";

interface Member {
  id?: number;
  name: string;
  email: string;
  type: string;
  date?: string;
  points: number;
}

interface MembersTabProps {
  members: Member[];
  editingMember: Member | null;
  setEditingMember: (member: Member | null) => void;
  handleSaveMember: (member: Member) => void;
  handleDeleteMember: (id: number) => void;
}

const MembersTab: React.FC<MembersTabProps> = ({
  members,
  editingMember,
  setEditingMember,
  handleSaveMember,
  handleDeleteMember
}) => {
  const onSaveMember = async () => {
    if (!editingMember) return;
    
    if (!editingMember.name) {
      toast.error("Member name is required");
      return;
    }
    
    if (!editingMember.email) {
      toast.error("Member email is required");
      return;
    }
    
    try {
      await handleSaveMember(editingMember);
    } catch (error) {
      console.error("Error saving member:", error);
      toast.error(`Failed to save member: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  return (
    <div className="space-y-6">
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
                  className="w-full bg-luxury-rich-black border border-luxury-gold/30 rounded-md h-10 px-3 text-white"
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberPoints">Loyalty Points</Label>
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
                onClick={onSaveMember}
              >
                <Save className="mr-2 h-4 w-4" /> Save Member
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
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Join Date</th>
                  <th className="text-left p-4">Points</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">No members found. Add your first member!</td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id} className="border-b border-luxury-gold/10">
                      <td className="p-4">{member.name}</td>
                      <td className="p-4">{member.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.type === "Platinum" ? "bg-luxury-gold/30 text-luxury-gold" :
                          member.type === "Gold" ? "bg-yellow-600/30 text-yellow-400" :
                          "bg-gray-500/30 text-gray-300"
                        }`}>
                          {member.type}
                        </span>
                      </td>
                      <td className="p-4">{member.date}</td>
                      <td className="p-4">{member.points.toLocaleString()}</td>
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
                          className="text-red-400"
                          onClick={() => handleDeleteMember(member.id as number)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MembersTab;
