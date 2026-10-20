// ALL restaurant information lives here. Edit this file to make the site yours.
export const restaurant = {
  name: "KHeyeDe",
  tagline: "Quality food, delivered fast",
  phone: "+880 1700-000000",
  email: "hello@kheyede.example",
  address: {
    street: "House 12, Road 5, Dhanmondi",
    city: "Dhaka",
    postalCode: "1205",
    country: "Bangladesh",
    full: "House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh",
  },
  // Used by the map (latitude / longitude of the restaurant)
  location: { lat: 23.7461, lng: 90.3742 },
  openingHours: [
    { days: "Saturday – Thursday", hours: "11:00 AM – 11:00 PM" },
    { days: "Friday", hours: "2:00 PM – 11:30 PM" },
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  currency: { symbol: "৳", code: "BDT" },
};

// Delivery + pricing rules, kept in one place.
export const delivery = {
  standardFee: 60,
  freeDeliveryOver: 1000,
  estimate: "30–45 minutes",
  taxRate: 0.05, // 5% VAT, applied after discount
};
