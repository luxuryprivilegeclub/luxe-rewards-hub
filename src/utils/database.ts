
import { supabase, customQuery } from "@/integrations/supabase/client";
import { Database, Settings, Deal, TourPackage, Member, Page, Booking } from "@/components/admin/types";

// Initialize data in the database if it doesn't exist already
export const initLocalDatabase = async () => {
  // We'll keep this for backward compatibility but we're not using it anymore
  console.log("Using Supabase as database backend");
};

// Helper functions to interact with the database
export const getDatabase = async (): Promise<Database> => {
  try {
    // Fetch all data from Supabase
    const [pagesResult, dealsResult, tourPackagesResult, membersResult, settingsResult, bookingsResult] = await Promise.all([
      supabase.from('pages').select('*'),
      supabase.from('deals').select('*'),
      supabase.from('tour_packages').select('*'),
      supabase.from('members').select('*'),
      supabase.from('settings').select('*'),
      customQuery('bookings').select('*')
    ]);

    // Check for errors
    if (pagesResult.error) throw new Error(`Error fetching pages: ${pagesResult.error.message}`);
    if (dealsResult.error) throw new Error(`Error fetching deals: ${dealsResult.error.message}`);
    if (tourPackagesResult.error) throw new Error(`Error fetching tour packages: ${tourPackagesResult.error.message}`);
    if (membersResult.error) throw new Error(`Error fetching members: ${membersResult.error.message}`);
    if (settingsResult.error) throw new Error(`Error fetching settings: ${settingsResult.error.message}`);
    if (bookingsResult.error) throw new Error(`Error fetching bookings: ${bookingsResult.error.message}`);

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

    // Map bookings data
    const bookings = bookingsResult.data ? bookingsResult.data.map((booking): Booking => ({
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
      payment_methods: "Credit Card, Bank Transfer"
    };
    
    const settings: Settings = {
      siteTitle: settingsData.site_title,
      siteTagline: settingsData.site_tagline,
      currency: settingsData.currency,
      paymentMethods: settingsData.payment_methods
    };

    // Return the composed database object
    return {
      pages,
      deals,
      tourPackages,
      members,
      bookings,
      settings
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
        paymentMethods: "Credit Card, Bank Transfer"
      }
    };
  }
};

// Save data to Supabase
export const saveDatabase = async (data: Database) => {
  try {
    // Save pages
    for (const page of data.pages) {
      if (page.id) {
        // Update existing page
        await supabase
          .from('pages')
          .update({
            title: page.title,
            url: page.url,
            last_modified: new Date().toISOString(),
            content: page.content
          })
          .eq('id', page.id);
      } else {
        // Insert new page
        await supabase
          .from('pages')
          .insert({
            title: page.title,
            url: page.url,
            content: page.content
          });
      }
    }

    // Save deals
    for (const deal of data.deals) {
      if (deal.id) {
        // Update existing deal
        await supabase
          .from('deals')
          .update({
            title: deal.title,
            location: deal.location,
            image_url: deal.imageUrl,
            regular_price: deal.regularPrice,
            member_price: deal.memberPrice,
            discount: deal.discount,
            rating: deal.rating,
            description: deal.description
          })
          .eq('id', deal.id);
      } else {
        // Insert new deal
        await supabase
          .from('deals')
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
      }
    }

    // Save tour packages
    for (const tourPackage of data.tourPackages) {
      if (tourPackage.id) {
        // Update existing tour package
        await supabase
          .from('tour_packages')
          .update({
            title: tourPackage.title,
            location: tourPackage.location,
            image_url: tourPackage.imageUrl,
            regular_price: tourPackage.regularPrice,
            member_price: tourPackage.memberPrice,
            discount: tourPackage.discount,
            rating: tourPackage.rating,
            description: tourPackage.description
          })
          .eq('id', tourPackage.id);
      } else {
        // Insert new tour package
        await supabase
          .from('tour_packages')
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
      }
    }

    // Save members
    for (const member of data.members) {
      if (member.id) {
        // Update existing member
        await supabase
          .from('members')
          .update({
            name: member.name,
            email: member.email,
            type: member.type,
            points: member.points
          })
          .eq('id', member.id);
      } else {
        // Insert new member
        await supabase
          .from('members')
          .insert({
            name: member.name,
            email: member.email,
            type: member.type,
            points: member.points
          });
      }
    }

    // Save settings
    await supabase
      .from('settings')
      .update({
        site_title: data.settings.siteTitle,
        site_tagline: data.settings.siteTagline,
        currency: data.settings.currency,
        payment_methods: data.settings.paymentMethods
      })
      .eq('id', 1);

    console.log("Data saved to Supabase successfully");
  } catch (error) {
    console.error("Error saving data to Supabase:", error);
  }
};

// Delete operations
export const deleteResource = async (table: string, id: number) => {
  try {
    const { error } = await customQuery(table)
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
