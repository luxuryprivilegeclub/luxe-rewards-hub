
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus } from "lucide-react";
import { toast } from "sonner";

interface Page {
  id?: number;
  title: string;
  url: string;
  lastModified?: string;
  content: string;
}

interface PagesTabProps {
  pages: Page[];
  editingPage: Page | null;
  setEditingPage: (page: Page | null) => void;
  handleSavePage: (page: Page) => void;
}

const PagesTab: React.FC<PagesTabProps> = ({
  pages,
  editingPage,
  setEditingPage,
  handleSavePage
}) => {
  const onSavePage = async () => {
    if (!editingPage) return;
    
    if (!editingPage.title) {
      toast.error("Page title is required");
      return;
    }
    
    if (!editingPage.url) {
      toast.error("Page URL is required");
      return;
    }
    
    if (!editingPage.content) {
      toast.error("Page content is required");
      return;
    }
    
    try {
      await handleSavePage(editingPage);
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error(`Failed to save page: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  return (
    <div className="space-y-6">
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
                onClick={onSavePage}
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
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">No pages found. Create your first page!</td>
                  </tr>
                ) : (
                  pages.map((page) => (
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

export default PagesTab;
