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
  // ---------- Chicken ----------
  {
    id: "chicken-001", slug: "crispy-fried-chicken-bucket", name: "Crispy Fried Chicken (6 pcs)", category: "chicken",
    price: 650, oldPrice: 720, rating: 4.8, reviews: 189, vegetarian: false, spicy: true,
    description: "Six pieces of golden, extra-crunchy chicken with our secret 11-spice coating.",
    ingredients: ["Chicken pieces", "Buttermilk", "11-spice flour coating"],
    tags: ["popular", "best-seller"], createdAt: "2026-01-22",
  },
  {
    id: "chicken-002", slug: "grilled-peri-peri-chicken", name: "Grilled Peri-Peri Chicken", category: "chicken",
    price: 580, oldPrice: null, rating: 4.7, reviews: 110, vegetarian: false, spicy: true,
    description: "Half a chicken marinated overnight in peri-peri and char-grilled to order.",
    ingredients: ["Half chicken", "Peri-peri marinade", "Garlic", "Lemon"],
    tags: ["spicy"], createdAt: "2026-02-28",
  },
  {
    id: "chicken-003", slug: "honey-glazed-wings", name: "Honey Glazed Wings (8 pcs)", category: "chicken",
    price: 460, oldPrice: 520, rating: 4.5, reviews: 64, vegetarian: false, spicy: false,
    description: "Oven-baked wings tossed in a sticky honey and soy glaze.",
    ingredients: ["Chicken wings", "Honey", "Soy sauce", "Sesame seeds"],
    tags: [], createdAt: "2026-04-01",
  },

  // ---------- Pasta ----------
  {
    id: "pasta-001", slug: "creamy-chicken-alfredo", name: "Creamy Chicken Alfredo", category: "pasta",
    price: 520, oldPrice: null, rating: 4.7, reviews: 98, vegetarian: false, spicy: false,
    description: "Fettuccine in a silky parmesan cream sauce with seared chicken breast.",
    ingredients: ["Fettuccine", "Chicken breast", "Cream", "Parmesan", "Garlic"],
    tags: ["popular"], createdAt: "2026-01-30",
  },
  {
    id: "pasta-002", slug: "spicy-arrabbiata-penne", name: "Spicy Arrabbiata Penne", category: "pasta",
    price: 440, oldPrice: 490, rating: 4.5, reviews: 52, vegetarian: true, spicy: true,
    description: "Penne tossed in a fiery tomato, garlic and chilli sauce.",
    ingredients: ["Penne", "Tomato sauce", "Garlic", "Chilli flakes", "Parsley"],
    tags: ["vegetarian", "spicy"], createdAt: "2026-03-10",
  },
  {
    id: "pasta-003", slug: "baked-beef-lasagna", name: "Baked Beef Lasagna", category: "pasta",
    price: 610, oldPrice: null, rating: 4.8, reviews: 73, vegetarian: false, spicy: false,
    description: "Layers of slow-cooked beef ragù, béchamel and bubbling mozzarella.",
    ingredients: ["Lasagna sheets", "Beef ragù", "Béchamel", "Mozzarella"],
    tags: ["best-seller"], createdAt: "2026-04-20",
  },


]
