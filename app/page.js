"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products, featuredProducts, saleProducts } from "@/data/products";
import { useRouter } from "next/navigation";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
        {/* Hero Section */}
        <section className="mb-12">
          <Hero />
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <CategoryGrid />
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <ProductGrid
            title="Trending Now"
            productsToShow={featuredProducts}
            onAddToCart={handleAddToCart}
            showFilters={false}
          />
        </section>

        {/* Sale Products */}
        <section className="mb-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="text-red-600">Hot Deals</span> & Special Offers
            </h2>
            <p className="text-lg text-gray-600">Limited time offers you don't want to miss</p>
          </div>
          <ProductGrid
            title=""
            productsToShow={saleProducts}
            onAddToCart={handleAddToCart}
            showFilters={false}
          />
        </section>

        {/* All Products */}
        <section className="mb-12">
          <ProductGrid
            title="All Products"
            productsToShow={products}
            onAddToCart={handleAddToCart}
            showFilters={true}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}