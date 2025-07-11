"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
import { Search, ArrowLeft, Home } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const searchTerm = query.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.subcategory?.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.features?.some(feature => 
          feature.toLowerCase().includes(searchTerm)
        )
      );
      setFilteredProducts(filtered);
    }
  }, [query]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    if (newQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(newQuery)}`);
    } else {
      router.push("/");
    }
  };

  const handleCategorySelect = (categorySlug) => {
    if (categorySlug === "") {
      router.push("/");
    } else {
      router.push(`/category/${categorySlug}`);
    }
  };

  const handleSubcategoryClick = (categorySlug, subcategory) => {
    const subcategorySlug = subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/category/${categorySlug}/${subcategorySlug}`);
  };

  // Get unique subcategories from search results
  const getSubcategorySuggestions = () => {
    if (!query.trim()) return [];
    
    const subcategories = new Set();
    categories.forEach(category => {
      if (category.subcategories) {
        category.subcategories.forEach(subcategory => {
          if (subcategory.toLowerCase().includes(query.toLowerCase())) {
            subcategories.add({
              name: subcategory,
              categorySlug: category.slug,
              categoryName: category.name
            });
          }
        });
      }
    });
    
    return Array.from(subcategories).slice(0, 4);
  };

  const subcategorySuggestions = getSubcategorySuggestions();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItems={cartItems} 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onCategorySelect={handleCategorySelect}
        selectedCategory=""
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-1 hover:text-[#0071ce] transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Search Results</span>
        </nav>

        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {query ? `Search Results for "${query}"` : 'Search Products'}
              </h1>
              <p className="text-lg text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Subcategory Suggestions */}
          {query && subcategorySuggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-3">Related Subcategories</h3>
              <div className="flex flex-wrap gap-2">
                {subcategorySuggestions.map((subcat, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubcategoryClick(subcat.categorySlug, subcat.name)}
                    className="bg-blue-200 hover:bg-blue-300 text-blue-800 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {subcat.name} in {subcat.categoryName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {query && filteredProducts.length === 0 && subcategorySuggestions.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">No results found</h3>
              <p className="text-yellow-700 text-sm mb-3">
                Try adjusting your search or browse our categories:
              </p>
              <div className="flex flex-wrap gap-2">
                {['electronics', 'clothing', 'home-garden', 'sports-outdoors', 'health-beauty', 'grocery'].map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' & ')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {query && filteredProducts.length > 0 && (
          <section>
            <ProductGrid
              title=""
              productsToShow={filteredProducts}
              onAddToCart={handleAddToCart}
              showFilters={true}
            />
          </section>
        )}

        {/* No Query Message */}
        {!query && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600 mb-6">
              Enter a product name, brand, category, or subcategory to find what you're looking for.
            </p>
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Popular searches:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {['iPhone', 'Nike shoes', 'Coffee maker', 'Yoga mat', 'Skincare', 'Organic food'].map(term => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
              className="bg-[#0071ce] hover:bg-[#005a9c] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse All Products
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}