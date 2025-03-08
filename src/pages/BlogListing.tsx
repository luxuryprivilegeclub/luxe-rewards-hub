
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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

const BlogCard = ({ blog }: { blog: BlogPost }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/blog/${blog.slug}`);
  };
  
  return (
    <div 
      className="bg-black border border-luxury-gold/10 rounded-xl overflow-hidden hover:border-luxury-gold/30 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/800x400/222/gold?text=Image+Not+Found';
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2 text-white">{blog.title}</h3>
        <p className="text-white/60 text-sm mb-4">
          {new Date(blog.lastModified || "").toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="text-white/80 mb-4 line-clamp-3">{blog.excerpt}</p>
        <button className="text-luxury-gold hover:text-luxury-gold/80 font-medium transition-colors duration-300">
          Read More →
        </button>
      </div>
    </div>
  );
};

const BlogListing = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('last_modified', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Map to BlogPost type
        const formattedBlogs = data.map((blog): BlogPost => ({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          imageUrl: blog.image_url,
          excerpt: blog.excerpt,
          content: blog.content,
          lastModified: blog.last_modified
        }));
        
        setBlogs(formattedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  return (
    <div className="min-h-screen bg-luxury-rich-black text-white pt-20">
      <Helmet>
        <title>Blog | Luxury Privilege Club</title>
        <meta name="description" content="Latest news, travel tips, and luxury insights from the Luxury Privilege Club." />
      </Helmet>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <ScrollAnimation type="fadeIn" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">
            <span className="text-luxury-gradient">Our Blog</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Latest news, travel tips, and luxury insights from Pakistan's premier hotel loyalty program
          </p>
        </ScrollAnimation>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogs.map((blog, index) => (
              <ScrollAnimation key={blog.id} type="fadeIn" delay={index * 100}>
                <BlogCard blog={blog} />
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No blog posts available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;
