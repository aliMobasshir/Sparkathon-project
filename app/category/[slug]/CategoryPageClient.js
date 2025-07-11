"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, ArrowRight } from "lucide-react";

export default function CategoryPageClient({ 
  category, 
  categoryProducts, 
  categorySlug 
}) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategorySelect = (categorySlug) => {
    if (categorySlug === "") {
      router.push("/");
    } else {
      router.push(`/category/${categorySlug}`);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    const subcategorySlug = subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/category/${categorySlug}/${subcategorySlug}`);
  };

  // Group products by subcategory
  const productsBySubcategory = categoryProducts.reduce((acc, product) => {
    const subcategory = product.subcategory || 'Other';
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(product);
    return acc;
  }, {});

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          cartItems={cartItems} 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onCategorySelect={handleCategorySelect}
          selectedCategory={categorySlug}
        />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#0071ce] hover:bg-[#005a9c] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Return to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItems={cartItems} 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onCategorySelect={handleCategorySelect}
        selectedCategory={categorySlug}
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
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
              <p className="text-lg text-gray-600">
                Discover our wide selection of {category.name.toLowerCase()} products
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {categoryProducts.length} products available
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Categories</span>
            </button>
          </div>

          {/* Category Image Banner */}
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Shop {category.name}</h2>
              <div className="flex flex-wrap gap-2">
                {category.subcategories?.map((sub, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subcategory Buttons */}
        {category.subcategories && category.subcategories.length > 0 && (
          <section className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Shop by Subcategory</h3>
            <div className="flex flex-wrap gap-4">
              {category.subcategories.map((subcategory, index) => (
                <button
                  key={index}
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className="bg-white hover:bg-[#0071ce] hover:text-white border-2 border-[#0071ce] text-[#0071ce] px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Subcategory Sections */}
        {Object.entries(productsBySubcategory).map(([subcategory, products]) => (
          <section key={subcategory} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{subcategory}</h3>
              <button
                onClick={() => handleSubcategoryClick(subcategory)}
                className="flex items-center space-x-2 bg-[#0071ce] hover:bg-[#005a9c] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <span>Explore {subcategory}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            {/* Show first 4 products from this subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                      {product.trending && (
                        <span className="bg-[#ffc220] text-black px-2 py-1 rounded-full text-xs font-bold">
                          Trending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0071ce] transition-colors">
                      {product.name}
                    </h4>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        product.inStock
                          ? 'bg-[#0071ce] hover:bg-[#005a9c] text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* All Products Section */}
        <section>
          <ProductGrid
            title="All Products"
            productsToShow={categoryProducts}
            onAddToCart={handleAddToCart}
            showFilters={true}
          />
        </section>

        {/* No Products Message */}
        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products available in this category
            </h3>
            <p className="text-gray-600 mb-6">
              Check back soon for new products in {category.name}.
            </p>
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