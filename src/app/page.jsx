import ProductCard from "@/components/common/ProductCard";
import { products } from "@/data/products";



export default function Home() {
  return (
   
<>
<ProductCard
  product={{
    id: 1,
    name: "Chicken Burger",
    slug: "chicken-burger",
    image: "/images/burger.jpg",
    category: "burger",
    categoryName: "Burger",
    price: 250,
    oldPrice: 300,
    rating: 4.5,
    reviews: 20,
    vegetarian: false,
    spicy: true,
  }}
/>

</>
  );
}
