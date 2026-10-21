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
    // ---------- Rice & Biryani ----------
  {
    id: "biryani-001", slug: "kacchi-biryani", name: "Kacchi Biryani", category: "rice-biryani",
    price: 580, oldPrice: 640, rating: 4.9, reviews: 312, vegetarian: false, spicy: true,
    description: "Tender mutton slow-cooked with aged basmati, saffron and whole spices, served with borhani.",
    ingredients: ["Mutton", "Basmati rice", "Saffron", "Yogurt", "Whole spices", "Fried onion"],
    tags: ["popular", "best-seller"], createdAt: "2026-01-05",
  },
  {
    id: "biryani-002", slug: "chicken-tehari", name: "Chicken Tehari", category: "rice-biryani",
    price: 360, oldPrice: null, rating: 4.6, reviews: 141, vegetarian: false, spicy: true,
    description: "Mustard-oil scented rice cooked with chicken and green chillies.",
    ingredients: ["Chicken", "Kalijira rice", "Mustard oil", "Green chilli"],
    tags: ["popular"], createdAt: "2026-02-14",
  },
  {
    id: "biryani-003", slug: "vegetable-fried-rice", name: "Vegetable Fried Rice", category: "rice-biryani",
    price: 290, oldPrice: null, rating: 4.3, reviews: 38, vegetarian: true, spicy: false,
    description: "Wok-tossed rice with crunchy seasonal vegetables and soy.",
    ingredients: ["Jasmine rice", "Carrot", "Beans", "Capsicum", "Soy sauce"],
    tags: ["vegetarian"], createdAt: "2026-03-22",
  },
  // ---------- Sandwiches ----------
  {
    id: "sandwich-001", slug: "club-sandwich", name: "Triple Decker Club Sandwich", category: "sandwiches",
    price: 380, oldPrice: null, rating: 4.5, reviews: 59, vegetarian: false, spicy: false,
    description: "Grilled chicken, egg, cheese and fresh veggies stacked between toasted bread.",
    ingredients: ["Grilled chicken", "Egg", "Cheese", "Lettuce", "Tomato", "Toasted bread"],
    tags: [], createdAt: "2026-02-08",
  },
  {
    id: "sandwich-002", slug: "paneer-tikka-wrap", name: "Paneer Tikka Wrap", category: "sandwiches",
    price: 320, oldPrice: 360, rating: 4.4, reviews: 44, vegetarian: true, spicy: true,
    description: "Smoky paneer tikka, mint chutney and crunchy salad in a warm flatbread.",
    ingredients: ["Paneer", "Mint chutney", "Onion", "Cabbage", "Flatbread"],
    tags: ["vegetarian", "spicy"], createdAt: "2026-04-05",
  },
 // ---------- Appetizers ----------
  {
    id: "appetizer-001", slug: "loaded-cheese-fries", name: "Loaded Cheese Fries", category: "appetizers",
    price: 260, oldPrice: null, rating: 4.6, reviews: 118, vegetarian: true, spicy: false,
    description: "Crispy fries smothered in cheese sauce, spring onion and crunchy bits.",
    ingredients: ["Potato fries", "Cheese sauce", "Spring onion"],
    tags: ["popular", "vegetarian"], createdAt: "2026-01-18",
  },
  {
    id: "appetizer-002", slug: "crispy-onion-rings", name: "Crispy Onion Rings", category: "appetizers",
    price: 190, oldPrice: null, rating: 4.3, reviews: 47, vegetarian: true, spicy: false,
    description: "Thick-cut onions in a light, crunchy batter with garlic dip.",
    ingredients: ["Onion", "Batter", "Garlic dip"],
    tags: ["vegetarian"], createdAt: "2026-03-01",
  },
  {
    id: "appetizer-003", slug: "chicken-nuggets", name: "Chicken Nuggets (10 pcs)", category: "appetizers",
    price: 310, oldPrice: 350, rating: 4.4, reviews: 82, vegetarian: false, spicy: false,
    description: "Juicy breast meat nuggets with a golden crumb, served with two dips.",
    ingredients: ["Chicken breast", "Breadcrumb", "Two dips"],
    tags: [], createdAt: "2026-03-28",
  },
  
  // ---------- Desserts ----------
  {
    id: "dessert-001", slug: "molten-chocolate-lava-cake", name: "Molten Chocolate Lava Cake", category: "desserts",
    price: 280, oldPrice: 320, rating: 4.9, reviews: 167, vegetarian: true, spicy: false,
    description: "Warm dark-chocolate cake with a gooey centre and vanilla ice cream.",
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Vanilla ice cream"],
    tags: ["popular", "best-seller", "vegetarian"], createdAt: "2026-02-11",
  },
  {
    id: "dessert-002", slug: "new-york-cheesecake", name: "New York Cheesecake", category: "desserts",
    price: 310, oldPrice: null, rating: 4.7, reviews: 91, vegetarian: true, spicy: false,
    description: "Dense, creamy cheesecake on a buttery biscuit base with berry compote.",
    ingredients: ["Cream cheese", "Biscuit base", "Berry compote"],
    tags: ["vegetarian"], createdAt: "2026-04-14",
  },
   // ---------- Drinks ----------
  {
    id: "drink-001", slug: "oreo-milkshake", name: "Oreo Milkshake", category: "drinks",
    price: 240, oldPrice: null, rating: 4.7, reviews: 133, vegetarian: true, spicy: false,
    description: "Thick vanilla shake blended with crushed cookies and whipped cream.",
    ingredients: ["Milk", "Vanilla ice cream", "Oreo cookies", "Whipped cream"],
    tags: ["popular", "vegetarian"], createdAt: "2026-01-25",
  },
  {
    id: "drink-002", slug: "fresh-mint-lemonade", name: "Fresh Mint Lemonade", category: "drinks",
    price: 150, oldPrice: 180, rating: 4.5, reviews: 70, vegetarian: true, spicy: false,
    description: "Hand-squeezed lemons, fresh mint and a touch of sugar, served over ice.",
    ingredients: ["Lemon", "Mint", "Sugar", "Soda"],
    tags: ["vegetarian"], createdAt: "2026-03-14",
  },
 // ---------- Combo Meals ----------
  {
    id: "combo-001", slug: "burger-combo", name: "Classic Burger Combo", category: "combo-meals",
    price: 650, oldPrice: 780, rating: 4.8, reviews: 145, vegetarian: false, spicy: false,
    description: "A Classic Cheeseburger with regular fries and a soft drink.",
    ingredients: ["Classic Cheeseburger", "Regular fries", "Soft drink"],
    tags: ["popular", "best-seller"], createdAt: "2026-02-18",
  },
  {
    id: "combo-002", slug: "family-feast-combo", name: "Family Feast Combo", category: "combo-meals",
    price: 1890, oldPrice: 2250, rating: 4.9, reviews: 76, vegetarian: false, spicy: true,
    description: "A large pizza, 6 pcs fried chicken, loaded fries and 4 drinks — serves 4.",
    ingredients: ["Large pizza", "6 pcs fried chicken", "Loaded fries", "4 soft drinks"],
    tags: ["popular"], createdAt: "2026-04-25",
  },
  {
    id: "combo-003", slug: "biryani-combo", name: "Biryani Combo", category: "combo-meals",
    price: 620, oldPrice: 700, rating: 4.7, reviews: 58, vegetarian: false, spicy: true,
    description: "Kacchi Biryani with a chicken roast, salad and a chilled drink.",
    ingredients: ["Kacchi Biryani", "Chicken roast", "Salad", "Drink"],
    tags: [], createdAt: "2026-05-02",
  },
]

// Image path is derived from the slug: replace /public/images/products/<slug>.svg
const productImages = {
  // Burgers
  "classic-cheeseburger": "/images/burgers/burger.png",
  "smoky-bbq-burger": "/images/burgers/Smoky.png",
  "spicy-crispy-chicken-burger": "/images/burgers/chicken.png",
  "garden-veggie-burger": "/images/burgers/veggieBurger.png",

  // Pizza
  "margherita-pizza": "/images/pizza/margherita.jpg",
  "pepperoni-feast-pizza": "/images/pizza/pepperoni.png",
  "bbq-chicken-pizza": "/images/pizza/chicken.png",

  // Chicken
  "crispy-fried-chicken-bucket": "/images/chicken/crispy.png",
  "grilled-peri-peri-chicken": "/images/chicken/periChicken.png",
  "honey-glazed-wings": "/images/chicken/honeyWings.png",

  // Pasta
  "creamy-chicken-alfredo": "/images/pasta/creamyChicken.png",
  "spicy-arrabbiata-penne": "/images/pasta/pasta.png",
  "baked-beef-lasagna": "/images/pasta/lasagna.png",

  // Rice & Biryani
  "kacchi-biryani": "/images/biriyani/kacchiBiryani.png",
  "chicken-tehari": "/images/biriyani/tehari.png",
  "vegetable-fried-rice": "/images/biriyani/friedRice.png",
}
