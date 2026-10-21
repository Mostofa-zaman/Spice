// Mock product catalogue. Later this can come from MongoDB via an Express API.
// Every product belongs to ONE category via `category` (a category slug).
// Category display names are looked up from categories.js — not duplicated here.

const rawProducts = [
  // ---------- Burgers ----------
  {
    id: "burger-001", slug: "classic-cheeseburger", name: "Classic Cheeseburger", category: "burgers",
    price: 420, oldPrice: 480, rating: 4.8, reviews: 124, vegetarian: false, spicy: false,
    description: "A flame-grilled beef patty with melted cheddar, crisp lettuce, tomato and our house sauce in a toasted brioche bun.",
    ingredients: ["Beef patty", "Cheddar cheese", "Lettuce", "Tomato", "Special sauce", "Brioche bun"],
    tags: ["popular", "best-seller"], createdAt: "2026-01-10",
  },
  {
    id: "burger-002", slug: "smoky-bbq-burger", name: "Smoky BBQ Burger", category: "burgers",
    price: 480, oldPrice: null, rating: 4.7, reviews: 96, vegetarian: false, spicy: false,
    description: "Double smashed patties, crispy onion rings, smoked cheddar and sticky BBQ glaze.",
    ingredients: ["Double beef patty", "Onion rings", "Smoked cheddar", "BBQ glaze", "Pickles"],
    tags: ["popular"], createdAt: "2026-02-02",
  },
  {
    id: "burger-003", slug: "spicy-crispy-chicken-burger", name: "Spicy Crispy Chicken Burger", category: "burgers",
    price: 390, oldPrice: 440, rating: 4.6, reviews: 88, vegetarian: false, spicy: true,
    description: "Buttermilk-fried chicken thigh with jalapeño slaw and chilli mayo.",
    ingredients: ["Fried chicken thigh", "Jalapeño slaw", "Chilli mayo", "Pickles", "Potato bun"],
    tags: ["spicy"], createdAt: "2026-03-05",
  },
  {
    id: "burger-004", slug: "garden-veggie-burger", name: "Garden Veggie Burger", category: "burgers",
    price: 340, oldPrice: null, rating: 4.4, reviews: 41, vegetarian: true, spicy: false,
    description: "A hearty chickpea and herb patty with avocado spread, tomato and rocket.",
    ingredients: ["Chickpea patty", "Avocado spread", "Tomato", "Rocket", "Whole-wheat bun"],
    tags: ["vegetarian"], createdAt: "2026-04-12",
  },
   // ---------- Pizza ----------
  {
    id: "pizza-001", slug: "margherita-pizza", name: "Margherita Pizza", category: "pizza",
    price: 550, oldPrice: null, rating: 4.7, reviews: 152, vegetarian: true, spicy: false,
    description: "San Marzano tomato sauce, fresh mozzarella and basil on a slow-fermented crust.",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"],
    tags: ["popular", "vegetarian"], createdAt: "2026-01-15",
  },
  {
    id: "pizza-002", slug: "pepperoni-feast-pizza", name: "Pepperoni Feast Pizza", category: "pizza",
    price: 720, oldPrice: 820, rating: 4.9, reviews: 203, vegetarian: false, spicy: true,
    description: "Loaded with double pepperoni, mozzarella and a drizzle of hot honey.",
    ingredients: ["Pizza dough", "Pepperoni", "Mozzarella", "Tomato sauce", "Hot honey"],
    tags: ["popular", "best-seller"], createdAt: "2026-02-20",
  },
  {
    id: "pizza-003", slug: "bbq-chicken-pizza", name: "BBQ Chicken Pizza", category: "pizza",
    price: 690, oldPrice: null, rating: 4.6, reviews: 77, vegetarian: false, spicy: false,
    description: "Smoky BBQ base topped with grilled chicken, red onion and sweet corn.",
    ingredients: ["Pizza dough", "BBQ sauce", "Grilled chicken", "Red onion", "Sweet corn", "Mozzarella"],
    tags: [], createdAt: "2026-03-18",
  },


]
