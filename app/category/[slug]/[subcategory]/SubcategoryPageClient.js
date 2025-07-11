"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { ArrowLeft, Home } from "lucide-react";
import dynamic from "next/dynamic";

const ProductAdvisorChat = dynamic(() => import("@/components/ProductAdvisorChat"), { ssr: false });

export default function SubcategoryPageClient({ 
  category, 
  subcategoryName,
  subcategoryProducts, 
  categorySlug,
  subcategorySlug
}) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

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
    router.push(categorySlug ? `/category/${categorySlug}` : "/");
  };

  if (!category || !subcategoryName) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          cartItems={cartItems} 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onCategorySelect={handleCategorySelect}
          selectedCategory={categorySlug}
        />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Subcategory Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The subcategory you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#0071ce] hover:bg-[#005a9c] text-white px-6 py-3 rounded-lg font-medium"
          >
            Return to Home
          </button>
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
          <button onClick={() => router.push("/")} className="flex items-center hover:text-[#0071ce] space-x-1">
            <Home className="h-4 w-4" /><span>Home</span>
          </button>
          <span>/</span>
          <button onClick={() => router.push(`/category/${categorySlug}`)} className="hover:text-[#0071ce]">
            {category.name}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{subcategoryName}</span>
        </nav>

        {/* Header + Banner */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold">{subcategoryName}</h1>
              <p className="text-lg text-gray-600">Explore our {subcategoryName.toLowerCase()} collection in {category.name}</p>
              <p className="text-sm text-gray-500 mt-2">{subcategoryProducts.length} products available</p>
            </div>
            <button
              onClick={() => router.push(`/category/${categorySlug}`)}
              className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to {category.name}</span>
            </button>
          </div>

          {/* Hero Banner Clickable */}
          <div
            className="relative h-48 md:h-56 rounded-lg overflow-hidden bg-gradient-to-r from-[#0071ce] to-[#004c87] cursor-pointer"
            onClick={() => setShowChat(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  Having trouble selecting the right {subcategoryName} for you?
                </h2>
                <p className="text-lg md:text-xl opacity-90">
                  Find the best {subcategoryName.toLowerCase()} using our AI guide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section>
          <ProductGrid
            title=""
            productsToShow={recommendedProducts.length > 0 ? recommendedProducts : subcategoryProducts}
            onAddToCart={handleAddToCart}
            showFilters={true}
          />
        </section>

        {/* No Products Fallback */}
        {subcategoryProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products available in this subcategory</h3>
            <p className="text-gray-600 mb-6">Check back soon for new {subcategoryName.toLowerCase()} products.</p>
            <button
              onClick={() => router.push(`/category/${categorySlug}`)}
              className="bg-[#0071ce] hover:bg-[#005a9c] text-white px-6 py-3 rounded-lg font-medium"
            >
              Browse All {category.name}
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl h-[80vh] shadow-lg">
            <ProductAdvisorChat
  products={subcategoryProducts}
  subcategoryName={subcategoryName} // ✅ Pass it in
  onClose={() => setShowChat(false)}
  onRecommendations={(recommended) => {
    setRecommendedProducts(recommended);
    setShowChat(false);
  }}
/>

          </div>
        </div>
      )}
    </div>
  );
}
