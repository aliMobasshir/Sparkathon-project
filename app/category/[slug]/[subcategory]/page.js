import { categories, products } from "@/data/products";
import SubcategoryPageClient from "./SubcategoryPageClient";

// This function is required for static export
export async function generateStaticParams() {
  const params = [];
  
  categories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        const subcategorySlug = subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        params.push({
          slug: category.slug,
          subcategory: subcategorySlug,
        });
      });
    }
  });
  
  return params;
}

// Metadata for the page
export async function generateMetadata({ params }) {
  const category = categories.find(cat => cat.slug === params.slug);
  const subcategoryName = category?.subcategories?.find(sub => 
    sub.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.subcategory
  );
  
  return {
    title: subcategoryName ? `${subcategoryName} - ${category?.name} - Sparkmart` : 'Subcategory - Sparkmart',
    description: subcategoryName ? `Shop ${subcategoryName} in ${category?.name} at Sparkmart` : 'Shop products at Sparkmart',
  };
}

export default function SubcategoryPage({ params }) {
  const categorySlug = params.slug;
  const subcategorySlug = params.subcategory;
  
  const category = categories.find(cat => cat.slug === categorySlug);
  const subcategoryName = category?.subcategories?.find(sub => 
    sub.toLowerCase().replace(/[^a-z0-9]+/g, '-') === subcategorySlug
  );
  
  const subcategoryProducts = products.filter(product => 
    product.category === categorySlug && 
    product.subcategory?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === subcategorySlug
  );

  return (
    <SubcategoryPageClient 
      category={category}
      subcategoryName={subcategoryName}
      subcategoryProducts={subcategoryProducts}
      categorySlug={categorySlug}
      subcategorySlug={subcategorySlug}
    />
  );
}