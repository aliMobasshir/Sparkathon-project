"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Filter, SortAsc, Grid, List } from "lucide-react";

export default function ProductGrid({ 
  title = "Featured Products", 
  productsToShow = products,
  showFilters = true,
  onAddToCart 
}) {
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = [...productsToShow];

    // Filter by category
    if (filterBy !== "all") {
      filtered = filtered.filter(product => product.category === filterBy);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    return filtered;
  }, [productsToShow, sortBy, filterBy]);

  const categories = [...new Set(productsToShow.map(p => p.category))];

  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-black text-gradient-primary">{title}</h2>
        
        {showFilters && (
          <div className="flex items-center space-x-6">
            {/* View Mode Toggle */}
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shadow-soft">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-all-smooth ${viewMode === "grid" ? "gradient-primary text-white shadow-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-all-smooth ${viewMode === "list" ? "gradient-primary text-white shadow-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center space-x-3 px-5 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all-smooth shadow-soft hover:shadow-medium"
              >
                <Filter className="h-5 w-5" />
                <span className="font-semibold">🔍 Filter</span>
              </button>
              
              {showFilterMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white border-2 border-gray-100 rounded-xl shadow-strong z-10 animate-scale-in">
                  <div className="p-4">
                    <label className="block text-sm font-bold text-gray-700 mb-3">📂 Category</label>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#0071ce] transition-colors"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' & ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3">
              <SortAsc className="h-5 w-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0071ce] focus:border-[#0071ce] transition-all-smooth shadow-soft"
              >
                <option value="featured">Featured</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">🌟 Highest Rated</option>
                <option value="name">🔤 Name: A to Z</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Products Count */}
      <div className="mb-6 animate-fade-in">
        <p className="text-lg font-semibold text-gray-600">
          📦 Showing <span className="text-[#0071ce] font-bold">{sortedAndFilteredProducts.length}</span> of <span className="font-bold">{productsToShow.length}</span> products
        </p>
      </div>

      {/* Products Grid */}
      <div className={`${
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8" 
          : "space-y-6"
      }`}>
        {sortedAndFilteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            viewMode={viewMode}
          />
        ))}
      </div>

      {sortedAndFilteredProducts.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-lg text-gray-600">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
}