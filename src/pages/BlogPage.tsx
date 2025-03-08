
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ScrollAnimation from "@/components/ScrollAnimation";

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  lastModified?: string;
}

const BlogPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) {
          throw error;
        }
        
        const formattedBlog: BlogPost = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          imageUrl: data.image_url,
          excerpt: data.excerpt,
          content: data.content,
          lastModified: data.last_modified
        };
        
        setBlog(formattedBlog);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast.error("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-rich-black text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="min-h-screen bg-luxury-rich-black text-white pt-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-medium mb-4">Blog Post Not Found</h1>
          <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <a href="/blog" className="inline-block px-6 py-3 bg-luxury-gold text-black rounded-md">
            Return to Blog
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-luxury-rich-black text-white pt-20">
      <Helmet>
        <title>{blog.title} | Luxury Privilege Club</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation type="fadeIn">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">{blog.title}</h1>
            
            <div className="mb-6 text-white/60 text-sm">
              Last updated: {new Date(blog.lastModified || "").toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            {blog.imageUrl && (
              <div className="aspect-video overflow-hidden rounded-xl mb-8">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/222/gold?text=Image+Not+Found';
                  }}
                />
              </div>
            )}
            
            <div className="prose prose-invert max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-white/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-luxury-gold/20">
              <a 
                href="/blog" 
                className="text-luxury-gold hover:text-luxury-gold/80 transition-colors duration-300"
              >
                ← Back to all blog posts
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
