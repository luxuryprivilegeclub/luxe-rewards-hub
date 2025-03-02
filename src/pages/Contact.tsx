
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen bg-luxury-rich-black text-white">
      <Helmet>
        <title>Contact Us | Luxury Hotel Privileges</title>
        <meta name="description" content="Get in touch with our luxury hotel booking specialists" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-8 text-center">
                <span className="text-luxury-gradient">Contact</span> Us
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-center mb-12">
                Our team of luxury travel specialists is available 24/7 to assist with your hotel booking needs
              </p>
            </ScrollAnimation>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ScrollAnimation type="slideUp" className="order-2 lg:order-1">
                <div className="luxury-card p-8 rounded-xl">
                  <h2 className="text-2xl md:text-3xl font-display mb-6">Send us a <span className="text-luxury-gradient">Message</span></h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white/70 mb-2">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-3 bg-black border border-luxury-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-3 bg-black border border-luxury-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-black border border-luxury-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 bg-black border border-luxury-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                      <select
                        id="subject"
                        className="w-full px-4 py-3 bg-black border border-luxury-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-white"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="membership">Membership Inquiry</option>
                        <option value="booking">Hotel Booking</option>
                        <option value="partnership">Hotel Partnership</option>
                        <option value="support">Customer Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Your Message</label>
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full px-4 py-3 bg-black border border-luxury-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 text-white resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <Button type="submit" className="w-full bg-luxury-gold hover:bg-luxury-dark-gold text-black font-medium py-3 rounded-md transition-colors">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </ScrollAnimation>
              
              {/* Contact Information */}
              <ScrollAnimation type="slideUp" delay={0.2} className="order-1 lg:order-2">
                <div className="luxury-card p-8 rounded-xl mb-8">
                  <h2 className="text-2xl md:text-3xl font-display mb-6">Contact <span className="text-luxury-gradient">Information</span></h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium mb-1">Phone</h3>
                        <p className="text-white/70">+92 51 8123456</p>
                        <p className="text-white/70">+92 300 1234567 (24/7 Support)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium mb-1">Email</h3>
                        <p className="text-white/70">contact@luxuryhotelprivileges.pk</p>
                        <p className="text-white/70">support@luxuryhotelprivileges.pk</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium mb-1">Address</h3>
                        <p className="text-white/70">Blue Area, F-7 Jinnah Avenue</p>
                        <p className="text-white/70">Islamabad, Pakistan</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium mb-1">Business Hours</h3>
                        <p className="text-white/70">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-white/70">Saturday: 10:00 AM - 4:00 PM</p>
                        <p className="text-white/70">Sunday: Closed (Online Support Available)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="luxury-card p-8 rounded-xl">
                  <h3 className="text-xl font-display mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-luxury-gold transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-luxury-gold transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-luxury-gold transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-luxury-gold transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-luxury-rich-black">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation type="fadeIn" className="rounded-xl overflow-hidden border border-luxury-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.5695200887315!2d73.08212947586573!3d33.7065231731189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd3dd1d6097%3A0xb5ebd03033fb87a!2sBlue%20Area%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1697712037257!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                ></iframe>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
