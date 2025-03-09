
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";
import { getDatabase } from "@/utils/database";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const db = await getDatabase();
      return db.blogs;
    }
  });

  return (
    <div className="min-h-screen bg-luxury-rich-black text-white">
      <Helmet>
        <title>Blog | Luxury Hotel Privileges</title>
        <meta name="description" content="Explore insights on luxury hotel stays, member benefits, and travel tips" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 text-center">
                <span className="text-luxury-gradient">Luxury Travel</span> Insights
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-center mb-12">
                Exclusive articles about hotel privileges, luxury travel, and maximizing your membership benefits
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {isLoading ? (
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <div className="w-12 h-12 border-t-2 border-luxury-gold rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading blogs...</p>
            </div>
          </section>
        ) : error ? (
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <p className="text-red-500">Error loading blog posts. Please try again later.</p>
            </div>
          </section>
        ) : blogs && blogs.length > 0 ? (
          <>
            {/* Featured Blog Post */}
            <section className="py-10 bg-black">
              <div className="container mx-auto px-4 md:px-6">
                <ScrollAnimation type="scale" className="relative overflow-hidden rounded-2xl border border-luxury-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-w-16 aspect-h-9 md:aspect-auto md:h-full">
                      <img 
                        src={blogs[0].imageUrl} 
                        alt={blogs[0].title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600/222/gold?text=Luxury+Privilege+Club';
                        }}
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <span className="text-luxury-gold text-sm mb-2">Featured Article</span>
                      <h2 className="text-2xl md:text-3xl font-display mb-4">{blogs[0].title}</h2>
                      <p className="text-white/70 mb-6">{blogs[0].excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-white/50 text-sm">
                          {new Date(blogs[0].lastModified || '').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <Link to={`/blog/${blogs[0].slug}`} className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors">
                          Read More 
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </section>
            
            {/* All Blog Posts */}
            <section className="py-20 bg-luxury-rich-black">
              <div className="container mx-auto px-4 md:px-6">
                <ScrollAnimation type="fadeIn" className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">
                    Latest <span className="text-luxury-gradient">Articles</span>
                  </h2>
                </ScrollAnimation>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.slice(1).map((post, index) => (
                    <ScrollAnimation key={post.id} type="slideUp" delay={index * 0.1}>
                      <Card className="bg-black border border-luxury-gold/20 overflow-hidden h-full">
                        <div className="aspect-w-16 aspect-h-9">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/222/gold?text=Luxury+Blog';
                            }}
                          />
                        </div>
                        <CardContent className="p-6">
                          <span className="text-luxury-gold text-sm mb-2 block">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(post.lastModified || '').toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </span>
                          <h3 className="text-xl font-display mb-3">{post.title}</h3>
                          <p className="text-white/70 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center justify-end">
                            <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors">
                              Read More 
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="py-20 bg-black">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <p>No blog posts found. Check back later for updates.</p>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
