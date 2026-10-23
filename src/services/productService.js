// Product + category data access.
// Today: reads mock data synchronously.
// Later: replace the bodies with `fetch("/api/products")` calls to your Express API
// (and make the functions async). Keep the function names the same.
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { optionsByCategory, spiceLevels } from "@/data/productOptions";

export function getAllCategories() {
  return categories;
}

// Categories without the "All" pseudo-category (for cards on the homepage)
export function getRealCategories() {
  return categories.filter((c) => c.slug !== "all");
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getAllProducts() {
  return products.map(withCategoryName);
}

export function getProductBySlug(slug) {
  const p = products.find((item) => item.slug === slug);
  return p ? withCategoryName(p) : null;
}

export function getProductById(id) {
  const p = products.find((item) => item.id === id);
  return p ? withCategoryName(p) : null;
}

export function getProductsByCategory(slug) {
  if (!slug || slug === "all") return getAllProducts();
  return products.filter((p) => p.category === slug).map(withCategoryName);
}

export function getCategoryProductCount(slug) {
  if (!slug || slug === "all") return products.length;
  return products.filter((p) => p.category === slug).length;
}

export function getPopularProducts(limit = 8) {
  return getAllProducts()
    .filter((p) => p.tags.includes("popular") || p.tags.includes("best-seller"))
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit);
}

// Global search: name, category and description
export function searchProducts(query, list = getAllProducts()) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

function withCategoryName(p) {
  const cat = getCategoryBySlug(p.category);
  return { ...p, categoryName: cat ? cat.name : p.category };
}

// Combined category + search + price + flags + sorting, used by the menu and category pages.
// Later this can become a single API call: GET /api/products?category=&search=&min=&max=...
export function filterAndSortProducts(list, f = {}) {
  const { category = "all", search = "", min, max, veg, spicy, discount, popular, sort = "popular" } = f;
  let result = category && category !== "all" ? list.filter((p) => p.category === category) : list;
  result = searchProducts(search, result);
  if (min !== undefined && min !== "" && !Number.isNaN(Number(min))) result = result.filter((p) => p.price >= Number(min));
  if (max !== undefined && max !== "" && !Number.isNaN(Number(max))) result = result.filter((p) => p.price <= Number(max));
  if (veg) result = result.filter((p) => p.vegetarian);
  if (spicy) result = result.filter((p) => p.spicy);
  if (discount) result = result.filter((p) => p.oldPrice && p.oldPrice > p.price);
  if (popular) result = result.filter((p) => p.tags.includes("popular") || p.tags.includes("best-seller"));

  const sorted = [...result];
  switch (sort) {
    case "newest": sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
    case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
    case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
    case "rating": sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews); break;
    default: sorted.sort((a, b) => b.reviews - a.reviews); // popular
  }
  return sorted;
}

export const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

// Customisation options available for a product (size / spice level / extras)
export function getProductOptions(product) {
  const base = optionsByCategory[product.category] || {};
  return {
    sizes: base.sizes || null,
    spiceLevels: product.spicy ? spiceLevels : null,
    extras: base.extras || [],
  };
}

export function getRelatedProducts(product, limit = 4) {
  return getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, limit);
}
