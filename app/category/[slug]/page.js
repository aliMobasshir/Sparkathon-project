import { categories, products } from "@/data/products";
import CategoryPageClient from "./CategoryPageClient";

// This function is required for static export
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Metadata for the page
export async function generateMetadata({ params }) {
  const category = categories.find(cat => cat.slug === params.slug);
  
  return {
    title: category ? `${category.name} - Walmart` : 'Category - Walmart',
    description: category ? `Shop ${category.name} products at Walmart` : 'Shop products at Walmart',
  };
}

export default function CategoryPage({ params }) {
  const categorySlug = params.slug;
  const category = categories.find(cat => cat.slug === categorySlug);
  const categoryProducts = products.filter(product => product.category === categorySlug);

  return (
    <CategoryPageClient 
      category={category}
      categoryProducts={categoryProducts}
      categorySlug={categorySlug}
    />
  );
}