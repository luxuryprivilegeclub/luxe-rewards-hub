
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Luxury Hotel Experiences in Pakistan",
    excerpt: "Discover the finest accommodations Pakistan has to offer, from mountainside retreats to urban sanctuaries.",
    date: "May 15, 2023",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    slug: "top-10-luxury-hotel-experiences"
  },
  {
    id: 2,
    title: "The Benefits of Hotel Loyalty Programs",
    excerpt: "How our premium loyalty program can save you thousands on luxury accommodations each year.",
    date: "April 20, 2023",
    category: "Loyalty Rewards",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    slug: "benefits-of-hotel-loyalty-programs"
  },
  {
    id: 3,
    title: "How to Book the Perfect Hotel Suite",
    excerpt: "Expert tips for securing the best rooms with exclusive amenities at discounted member rates.",
    date: "March 12, 2023",
    category: "Booking Tips",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    slug: "how-to-book-perfect-hotel-suite"
  },
  {
    id: 4,
    title: "International Travel Planning for Pakistani Executives",
    excerpt: "A comprehensive guide to securing premium accommodations abroad through our global partners.",
    date: "February 28, 2023",
    category: "International Travel",
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    slug: "international-travel-planning"
  },
  {
    id: 5,
    title: "The Insider's Guide to Exclusive Hotel Benefits",
    excerpt: "Unlock hidden perks and privileges that only our members can access at partner hotels.",
    date: "January 17, 2023",
    category: "Member Benefits",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    slug: "insiders-guide-hotel-benefits"
  }
];

const Blog = () => {
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
        
        {/* Featured Blog Post */}
        <section className="py-10 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="scale" className="relative overflow-hidden rounded-2xl border border-luxury-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-w-16 aspect-h-9 md:aspect-auto md:h-full">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-luxury-gold text-sm mb-2">{blogPosts[0].category}</span>
                  <h2 className="text-2xl md:text-3xl font-display mb-4">{blogPosts[0].title}</h2>
                  <p className="text-white/70 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-white/50 text-sm">{blogPosts[0].date}</span>
                    <Link to={`/blog/${blogPosts[0].slug}`} className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors">
                      Read More 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
              {blogPosts.slice(1).map((post, index) => (
                <ScrollAnimation key={post.id} type="slideUp" delay={index * 0.1} className="luxury-card rounded-xl overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-luxury-gold text-sm mb-2 block">{post.category}</span>
                    <h3 className="text-xl font-display mb-3">{post.title}</h3>
                    <p className="text-white/70 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">{post.date}</span>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors">
                        Read More 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
