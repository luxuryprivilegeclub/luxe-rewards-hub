
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  lastModified?: string;
}

interface BlogsTabProps {
  blogs: BlogPost[];
  editingBlog: BlogPost | null;
  setEditingBlog: (blog: BlogPost | null) => void;
  handleSaveBlog: (blog: BlogPost) => Promise<void>;
  handleDeleteBlog: (id: number) => Promise<void>;
}

const BlogsTab: React.FC<BlogsTabProps> = ({
  blogs,
  editingBlog,
  setEditingBlog,
  handleSaveBlog,
  handleDeleteBlog
}) => {
  const onSaveBlog = async () => {
    if (!editingBlog) return;
    
    if (!editingBlog.title) {
      toast.error("Blog title is required");
      return;
    }
    
    if (!editingBlog.slug) {
      toast.error("Blog slug is required");
      return;
    }
    
    if (!editingBlog.content) {
      toast.error("Blog content is required");
      return;
    }
    
    try {
      await handleSaveBlog(editingBlog);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error(`Failed to save blog post: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  return (
    <div className="space-y-6">
      {editingBlog ? (
        <div className="bg-black border border-luxury-gold/20 rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">
            {editingBlog.id ? `Edit Blog: ${editingBlog.title}` : "Add New Blog Post"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blogTitle">Blog Title</Label>
                <Input
                  id="blogTitle"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blogSlug">URL Slug</Label>
                <Input
                  id="blogSlug"
                  value={editingBlog.slug}
                  onChange={(e) => setEditingBlog({...editingBlog, slug: e.target.value})}
                  className="bg-luxury-rich-black border-luxury-gold/30"
                  placeholder="my-blog-post"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="blogImageUrl">Featured Image URL</Label>
              <Input
                id="blogImageUrl"
                value={editingBlog.imageUrl}
                onChange={(e) => setEditingBlog({...editingBlog, imageUrl: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30"
                placeholder="https://example.com/image.jpg"
              />
              {editingBlog.imageUrl && (
                <div className="mt-2 border border-luxury-gold/20 rounded p-2">
                  <p className="text-sm mb-1">Image Preview:</p>
                  <img 
                    src={editingBlog.imageUrl} 
                    alt="Preview" 
                    className="h-40 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/222/gold?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="blogExcerpt">Excerpt (Short description)</Label>
              <Textarea
                id="blogExcerpt"
                value={editingBlog.excerpt}
                onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30 h-20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blogContent">Content</Label>
              <Textarea
                id="blogContent"
                value={editingBlog.content}
                onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                className="bg-luxury-rich-black border-luxury-gold/30 min-h-[300px]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingBlog(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                onClick={onSaveBlog}
              >
                <Save className="mr-2 h-4 w-4" /> Save Blog Post
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-display">Manage Blog Posts</h2>
            <Button 
              className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              onClick={() => setEditingBlog({
                title: "",
                slug: "",
                imageUrl: "",
                excerpt: "",
                content: ""
              })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Blog Post
            </Button>
          </div>
          
          <div className="bg-black border border-luxury-gold/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-luxury-gold/20">
                  <th className="text-left p-4">Blog Title</th>
                  <th className="text-left p-4">Slug</th>
                  <th className="text-left p-4">Last Modified</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">No blog posts found. Create your first blog post!</td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-luxury-gold/10">
                      <td className="p-4">{blog.title}</td>
                      <td className="p-4">{blog.slug}</td>
                      <td className="p-4">{blog.lastModified}</td>
                      <td className="p-4 space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-luxury-gold"
                          onClick={() => setEditingBlog(blog)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => {
                            if (blog.id) handleDeleteBlog(blog.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
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

export default BlogsTab;
