
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";
import { getDatabase } from "@/utils/database";
import { BlogPost } from "@/components/admin/types";
import { Card, CardContent } from "@/components/ui/card";

const BlogView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);

  // Fetch all blogs data
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const db = await getDatabase();
      return db.blogs;
    }
  });

  useEffect(() => {
    if (data && slug) {
      // Find the current blog by slug
      const blog = data.find(blog => blog.slug === slug);
      if (blog) {
        setCurrentBlog(blog);
        
        // Get related blogs (all other blogs)
        const otherBlogs = data.filter(b => b.id !== blog.id).slice(0, 3);
        setRelatedBlogs(otherBlogs);
      }
    }
  }, [data, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-rich-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-luxury-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !currentBlog) {
    return (
      <div className="min-h-screen bg-luxury-rich-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog Listing
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-rich-black text-white">
      <Helmet>
        <title>{currentBlog.title} | Luxury Hotel Privileges</title>
        <meta name="description" content={currentBlog.excerpt} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-10">
          <div className="container mx-auto px-4 md:px-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Articles
            </Link>
            
            <ScrollAnimation type="fadeIn">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6">
                {currentBlog.title}
              </h1>
              <div className="flex items-center gap-4 text-white/70 mb-10">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(currentBlog.lastModified || '').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
        
        {/* Featured Image */}
        <section className="pb-10">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="scale">
              <div className="rounded-2xl overflow-hidden border border-luxury-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <img 
                  src={currentBlog.imageUrl} 
                  alt={currentBlog.title} 
                  className="w-full h-[40vh] md:h-[50vh] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600/222/gold?text=Luxury+Privilege+Club';
                  }}
                />
              </div>
            </ScrollAnimation>
          </div>
        </section>
        
        {/* Blog Content */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation type="fadeIn">
                <div className="prose prose-lg prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentBlog.content }} />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        
        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4 md:px-6">
              <ScrollAnimation type="fadeIn">
                <h2 className="text-3xl font-display mb-12 text-center">
                  Read More <span className="text-luxury-gradient">Articles</span>
                </h2>
              </ScrollAnimation>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((blog, index) => (
                  <ScrollAnimation key={blog.id} type="slideUp" delay={index * 0.1}>
                    <Card className="bg-luxury-rich-black border border-luxury-gold/20 overflow-hidden h-full">
                      <div className="aspect-w-16 aspect-h-9">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/222/gold?text=Luxury+Blog';
                          }}
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-display mb-3">{blog.title}</h3>
                        <p className="text-white/70 mb-4 line-clamp-3">{blog.excerpt}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-white/50 text-sm">
                            {new Date(blog.lastModified || '').toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <Link to={`/blog/${blog.slug}`} className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors">
                            Read More 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogView;
