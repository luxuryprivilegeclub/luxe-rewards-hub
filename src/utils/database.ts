
import { supabase } from "@/integrations/supabase/client";
import { Database, Settings, Deal, TourPackage, Member, Page, Booking, BlogPost, Testimonial, MembershipFeature } from "@/components/admin/types";

// Initialize data in the database if it doesn't exist already
export const initLocalDatabase = async () => {
  // We'll keep this for backward compatibility but we're not using it anymore
  console.log("Using Supabase as database backend");
};

// Helper functions to interact with the database
export const getDatabase = async (): Promise<Database> => {
  try {
    // Fetch all data from Supabase
    const [pagesResult, dealsResult, tourPackagesResult, membersResult, settingsResult, bookingsResult, blogsResult, testimonialsResult, membershipFeaturesResult] = await Promise.all([
      supabase.from('pages').select('*'),
      supabase.from('deals').select('*'),
      supabase.from('tour_packages').select('*'),
      supabase.from('members').select('*'),
      supabase.from('settings').select('*'),
      supabase.from('bookings').select('*'),
      supabase.from('blogs').select('*'),
      supabase.from('testimonials').select('*'),
      supabase.from('membership_features').select('*')
    ]);

    // Check for errors
    if (pagesResult.error) throw new Error(`Error fetching pages: ${pagesResult.error.message}`);
    if (dealsResult.error) throw new Error(`Error fetching deals: ${dealsResult.error.message}`);
    if (tourPackagesResult.error) throw new Error(`Error fetching tour packages: ${tourPackagesResult.error.message}`);
    if (membersResult.error) throw new Error(`Error fetching members: ${membersResult.error.message}`);
    if (settingsResult.error) throw new Error(`Error fetching settings: ${settingsResult.error.message}`);
    if (bookingsResult.error) throw new Error(`Error fetching bookings: ${bookingsResult.error.message}`);
    if (blogsResult.error) throw new Error(`Error fetching blogs: ${blogsResult.error.message}`);
    if (testimonialsResult.error) throw new Error(`Error fetching testimonials: ${testimonialsResult.error.message}`);
    if (membershipFeaturesResult.error) throw new Error(`Error fetching membership features: ${membershipFeaturesResult.error.message}`);

    // Map database columns to camelCase for frontend
    const pages = pagesResult.data.map((page): Page => ({
      id: page.id,
      title: page.title,
      url: page.url,
      lastModified: page.last_modified,
      content: page.content
    }));

    const deals = dealsResult.data.map((deal): Deal => ({
      id: deal.id,
      title: deal.title,
      location: deal.location,
      imageUrl: deal.image_url,
      regularPrice: deal.regular_price,
      memberPrice: deal.member_price,
      discount: deal.discount,
      rating: deal.rating,
      description: deal.description
    }));

    const tourPackages = tourPackagesResult.data.map((tourPackage): TourPackage => ({
      id: tourPackage.id,
      title: tourPackage.title,
      location: tourPackage.location,
      imageUrl: tourPackage.image_url,
      regularPrice: tourPackage.regular_price,
      memberPrice: tourPackage.member_price,
      discount: tourPackage.discount,
      rating: tourPackage.rating,
      description: tourPackage.description
    }));

    const members = membersResult.data.map((member): Member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      type: member.type,
      date: member.date,
      points: member.points
    }));

    // Map bookings data with proper type checking
    const bookings = bookingsResult.data ? bookingsResult.data.map((booking: any): Booking => ({
      id: booking.id,
      deal_id: booking.deal_id,
      deal_title: booking.deal_title,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
      guests: booking.guests,
      amount: booking.amount,
      status: booking.status,
      created_at: booking.created_at
    })) : [];

    // Settings should only have one row, so use the first one
    const settingsData = settingsResult.data[0] || {
      site_title: "Luxury Privilege Club",
      site_tagline: "Pakistan's Premium Hotel Loyalty Program",
      currency: "PKR",
      payment_methods: "Credit Card, Bank Transfer",
      silver_price: 35000,
      gold_price: 70000,
      platinum_price: 150000
    };
    
    const settings: Settings = {
      siteTitle: settingsData.site_title,
      siteTagline: settingsData.site_tagline,
      currency: settingsData.currency,
      paymentMethods: settingsData.payment_methods,
      silverPrice: settingsData.silver_price,
      goldPrice: settingsData.gold_price,
      platinumPrice: settingsData.platinum_price
    };

    // Map blogs data
    const blogs = blogsResult.data ? blogsResult.data.map((blog: any): BlogPost => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      imageUrl: blog.image_url,
      excerpt: blog.excerpt,
      content: blog.content,
      lastModified: blog.last_modified
    })) : [];

    // Map testimonials data
    const testimonials = testimonialsResult.data ? testimonialsResult.data.map((testimonial: any): Testimonial => ({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role,
      avatar: testimonial.avatar,
      content: testimonial.content,
      rating: testimonial.rating
    })) : [];

    // Map membership features data
    const membershipFeatures = membershipFeaturesResult.data ? membershipFeaturesResult.data.map((feature: any): MembershipFeature => ({
      id: feature.id,
      membershipType: feature.membership_type as 'Silver' | 'Gold' | 'Platinum',
      feature: feature.feature,
      included: feature.included
    })) : [];

    // Return the composed database object
    return {
      pages,
      deals,
      tourPackages,
      members,
      bookings,
      settings,
      blogs,
      testimonials,
      membershipFeatures
    };
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    // Return empty data structure in case of error
    return {
      pages: [],
      deals: [],
      tourPackages: [],
      members: [],
      bookings: [],
      settings: {
        siteTitle: "Luxury Privilege Club",
        siteTagline: "Pakistan's Premium Hotel Loyalty Program",
        currency: "PKR",
        paymentMethods: "Credit Card, Bank Transfer",
        silverPrice: 35000,
        goldPrice: 70000,
        platinumPrice: 150000
      },
      blogs: [],
      testimonials: [],
      membershipFeatures: []
    };
  }
};

// Save data to Supabase
export const saveDatabase = async (data: Database) => {
  try {
    // Save pages using the specialized function
    for (const page of data.pages) {
      try {
        if (page.id) {
          // Update existing page
          const success = await updatePage(page.id, page);
          if (!success) {
            throw new Error(`Failed to update page: ${page.title}`);
          }
        } else {
          // Insert new page
          const { error } = await supabase
            .from('pages')
            .insert({
              title: page.title,
              url: page.url,
              content: page.content
            });
            
          if (error) {
            console.error("Error inserting page:", error);
            throw error;
          }
        }
      } catch (pageError) {
        console.error(`Error processing page ${page.title}:`, pageError);
        throw new Error(`Failed to update page: ${page.title}`);
      }
    }

    // Save deals with improved error handling
    for (const deal of data.deals) {
      try {
        if (deal.id) {
          // Update existing deal using the specialized function
          const success = await updateDeal(deal.id, deal);
          if (!success) {
            throw new Error(`Failed to update deal: ${deal.title}`);
          }
        } else {
          // Insert new deal
          const { error } = await customQuery('deals')
            .insert({
              title: deal.title,
              location: deal.location,
              image_url: deal.imageUrl,
              regular_price: deal.regularPrice,
              member_price: deal.memberPrice,
              discount: deal.discount,
              rating: deal.rating,
              description: deal.description
            });
            
          if (error) {
            console.error("Error inserting deal:", error);
            throw error;
          }
        }
      } catch (dealError) {
        console.error(`Error processing deal ${deal.title}:`, dealError);
        throw dealError; // Re-throw to allow handling in the admin panel
      }
    }

    // Save tour packages
    for (const tourPackage of data.tourPackages) {
      try {
        if (tourPackage.id) {
          // Update existing tour package using specialized function
          const success = await updateTourPackage(tourPackage.id, tourPackage);
          if (!success) {
            throw new Error(`Failed to update tour package: ${tourPackage.title}`);
          }
        } else {
          // Insert new tour package
          const { error } = await customQuery('tour_packages')
            .insert({
              title: tourPackage.title,
              location: tourPackage.location,
              image_url: tourPackage.imageUrl,
              regular_price: tourPackage.regularPrice,
              member_price: tourPackage.memberPrice,
              discount: tourPackage.discount,
              rating: tourPackage.rating,
              description: tourPackage.description
            });
            
          if (error) {
            console.error("Error inserting tour package:", error);
            throw error;
          }
        }
      } catch (tourError) {
        console.error(`Error processing tour package ${tourPackage.title}:`, tourError);
        throw new Error(`Failed to update tour package: ${tourPackage.title}`);
      }
    }

    // Save members using the specialized function
    for (const member of data.members) {
      try {
        if (member.id) {
          // Update existing member using specialized function
          const success = await updateMember(member.id, member);
          if (!success) {
            throw new Error(`Failed to update member: ${member.name}`);
          }
        } else {
          // Insert new member
          const { error } = await supabase
            .from('members')
            .insert({
              name: member.name,
              email: member.email,
              type: member.type,
              points: member.points
            });
            
          if (error) {
            console.error("Error inserting member:", error);
            throw error;
          }
        }
      } catch (memberError) {
        console.error(`Error processing member ${member.name}:`, memberError);
        throw new Error(`Failed to update member: ${member.name}`);
      }
    }

    // Save settings using the specialized function
    try {
      const success = await updateSettings(data.settings);
      if (!success) {
        throw new Error("Failed to update settings");
      }
    } catch (settingsError) {
      console.error("Error updating settings:", settingsError);
      throw new Error("Failed to update settings");
    }

    // Save blog posts
    for (const blog of data.blogs) {
      try {
        if (blog.id) {
          // Update existing blog post
          const success = await updateBlogPost(blog.id, blog);
          if (!success) {
            throw new Error(`Failed to update blog post: ${blog.title}`);
          }
        } else {
          // Insert new blog post
          const { error } = await supabase
            .from('blogs')
            .insert({
              title: blog.title,
              slug: blog.slug,
              image_url: blog.imageUrl,
              excerpt: blog.excerpt,
              content: blog.content,
              last_modified: new Date().toISOString()
            });
            
          if (error) {
            console.error("Error inserting blog post:", error);
            throw error;
          }
        }
      } catch (blogError) {
        console.error(`Error processing blog post ${blog.title}:`, blogError);
        throw new Error(`Failed to update blog post: ${blog.title}`);
      }
    }

    // Save testimonials
    for (const testimonial of data.testimonials) {
      try {
        if (testimonial.id) {
          // Update existing testimonial
          const success = await updateTestimonial(testimonial.id, testimonial);
          if (!success) {
            throw new Error(`Failed to update testimonial: ${testimonial.name}`);
          }
        } else {
          // Insert new testimonial
          const { error } = await supabase
            .from('testimonials')
            .insert({
              name: testimonial.name,
              role: testimonial.role,
              avatar: testimonial.avatar,
              content: testimonial.content,
              rating: testimonial.rating
            });
            
          if (error) {
            console.error("Error inserting testimonial:", error);
            throw error;
          }
        }
      } catch (testimonialError) {
        console.error(`Error processing testimonial ${testimonial.name}:`, testimonialError);
        throw new Error(`Failed to update testimonial: ${testimonial.name}`);
      }
    }

    // Save membership features
    for (const feature of data.membershipFeatures) {
      try {
        if (feature.id) {
          // Update existing feature
          const success = await updateMembershipFeature(feature.id, feature);
          if (!success) {
            throw new Error(`Failed to update membership feature: ${feature.feature}`);
          }
        } else {
          // Insert new feature
          const { error } = await supabase
            .from('membership_features')
            .insert({
              membership_type: feature.membershipType,
              feature: feature.feature,
              included: feature.included
            });
            
          if (error) {
            console.error("Error inserting membership feature:", error);
            throw error;
          }
        }
      } catch (featureError) {
        console.error(`Error processing membership feature ${feature.feature}:`, featureError);
        throw new Error(`Failed to update membership feature: ${feature.feature}`);
      }
    }

    console.log("Data saved to Supabase successfully");
  } catch (error) {
    console.error("Error saving data to Supabase:", error);
    throw error; // Rethrow to allow handling by the caller
  }
};

// Delete operations
export const deleteResource = async (table: "bookings" | "deals" | "members" | "pages" | "settings" | "tour_packages" | "blogs" | "testimonials" | "membership_features", id: number) => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    console.log(`Successfully deleted item with id ${id} from ${table}`);
    return true;
  } catch (error) {
    console.error(`Error deleting from ${table}:`, error);
    return false;
  }
};

// Format price with commas
export const formatPrice = (price?: number) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};
