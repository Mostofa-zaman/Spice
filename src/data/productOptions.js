// Customisation options per category (size, spice level, extras).
// Prices are ADDED to the product's base price. Change freely.
// Spice levels only appear for products marked `spicy: true`.
const sauce = { label: "Extra sauce", price: 20 };
const cheese = { label: "Extra cheese", price: 40 };
const toppings = { label: "Extra toppings", price: 50 };

export const spiceLevels = ["Mild", "Medium", "Hot", "Extra hot"];

export const optionsByCategory = {
  burgers: {
    sizes: [{ label: "Regular", price: 0, default: true }, { label: "Large", price: 120 }],
    extras: [cheese, sauce, toppings],
  },
  pizza: {
    sizes: [
      { label: 'Small (8")', price: -150 },
      { label: 'Medium (10")', price: 0, default: true },
      { label: 'Large (12")', price: 200 },
    ],
    extras: [{ ...cheese, price: 60 }, sauce, { ...toppings, price: 80 }],
  },
  chicken: { sizes: null, extras: [sauce, { label: "Extra dip", price: 25 }] },
  pasta: {
    sizes: [{ label: "Regular", price: 0, default: true }, { label: "Large", price: 100 }],
    extras: [cheese, sauce],
  },
  "rice-biryani": {
    sizes: [{ label: "Regular", price: 0, default: true }, { label: "Large", price: 150 }],
    extras: [{ label: "Extra borhani", price: 40 }, { label: "Boiled egg", price: 30 }],
  },
  sandwiches: { sizes: null, extras: [cheese, sauce, toppings] },
  appetizers: {
    sizes: [{ label: "Regular", price: 0, default: true }, { label: "Large", price: 90 }],
    extras: [{ label: "Extra dip", price: 25 }, cheese],
  },
  desserts: { sizes: null, extras: [{ label: "Extra ice cream", price: 50 }, { label: "Chocolate sauce", price: 30 }] },
  drinks: {
    sizes: [{ label: "Regular", price: 0, default: true }, { label: "Large", price: 60 }],
    extras: [{ label: "Whipped cream", price: 30 }],
  },
  "combo-meals": { sizes: null, extras: [sauce, { label: "Upgrade to large fries", price: 50 }] },
};
