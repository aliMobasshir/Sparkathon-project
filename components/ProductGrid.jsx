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
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        {showFilters && (
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-[#0071ce] text-white" : "text-gray-600"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-[#0071ce] text-white" : "text-gray-600"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="w-full p-2 border rounded"
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
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071ce]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Products Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {sortedAndFilteredProducts.length} of {productsToShow.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className={`${
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" 
          : "space-y-4"
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
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}