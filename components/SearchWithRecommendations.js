"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { products, categories } from "@/data/products";
import { useRouter } from "next/navigation";

export default function SearchWithRecommendations({ 
  onSearch, 
  searchQuery = "", 
  className = "" 
}) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (localQuery.trim().length > 0) {
      const query = localQuery.toLowerCase();
      
      // Filter products
      const productMatches = products
        .filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory?.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.features?.some(feature => feature.toLowerCase().includes(query))
        )
        .slice(0, 6)
        .map(product => {
          const categoryName = categories.find(cat => cat.slug === product.category)?.name || product.category;
          return {
            id: product.id,
            text: product.name,
            category: categoryName,
            subcategory: product.subcategory,
            brand: product.brand,
            price: product.price,
            image: product.image,
            type: 'product'
          };
        });

      // Filter categories
      const categoryMatches = categories
        .filter(category =>
          category.name.toLowerCase().includes(query)
        )
        .slice(0, 2)
        .map(category => ({
          id: `cat-${category.id}`,
          text: category.name,
          category: 'Category',
          type: 'category',
          slug: category.slug
        }));

      // Filter subcategories
      const subcategoryMatches = [];
      categories.forEach(category => {
        if (category.subcategories) {
          category.subcategories.forEach(subcategory => {
            if (subcategory.toLowerCase().includes(query)) {
              const subcategorySlug = subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              subcategoryMatches.push({
                id: `subcat-${category.id}-${subcategorySlug}`,
                text: subcategory,
                category: category.name,
                type: 'subcategory',
                categorySlug: category.slug,
                subcategorySlug: subcategorySlug
              });
            }
          });
        }
      });

      // Combine all suggestions with proper ordering
      const allSuggestions = [
        ...categoryMatches,
        ...subcategoryMatches.slice(0, 3),
        ...productMatches
      ];

      setSuggestions(allSuggestions);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [localQuery]);

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(localQuery);
      }
      router.push(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    
    if (suggestion.type === 'category') {
      router.push(`/category/${suggestion.slug}`);
    } else if (suggestion.type === 'subcategory') {
      router.push(`/category/${suggestion.categorySlug}/${suggestion.subcategorySlug}`);
    } else {
      setLocalQuery(suggestion.text);
      if (onSearch) {
        onSearch(suggestion.text);
      }
      router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setLocalQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    searchRef.current?.focus();
  };

  const handleBlur = (e) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center border-2 border-gray-300 rounded-full focus-within:border-[#0071ce] transition-colors">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search everything at Sparkmart online and in store"
            className="flex-1 px-6 py-4 text-lg rounded-full outline-none bg-transparent"
            value={localQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={() => localQuery.trim() && setShowSuggestions(true)}
          />
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-3 text-gray-400 hover:text-gray-600 transition-all-smooth hover:scale-110 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="gradient-secondary hover:shadow-glow px-7 py-4 rounded-r-full transition-all-smooth hover:scale-105 btn-scale"
          >
            <Search className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border-2 border-gray-100 rounded-2xl shadow-strong z-50 mt-2 max-h-96 overflow-y-auto animate-scale-in"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-6 py-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-all-smooth hover:shadow-soft ${
                index === selectedIndex ? 'bg-blue-50 shadow-soft' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                {suggestion.type === 'product' && (
                  <img
                    src={suggestion.image}
                    alt={suggestion.text}
                    className="w-12 h-12 object-cover rounded-lg shadow-soft"
                  />
                )}
                {suggestion.type === 'category' && (
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                    <span className="text-white font-bold text-sm">📂</span>
                  </div>
                )}
                {suggestion.type === 'subcategory' && (
                  <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center shadow-soft">
                    <span className="text-black font-bold text-sm">📁</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-lg">
                    {suggestion.text}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {suggestion.type === 'product' ? (
                      <>
                        {suggestion.brand} • in {suggestion.category}
                        {suggestion.subcategory && ` > ${suggestion.subcategory}`}
                        {suggestion.price && (
                          <span className="ml-2 font-bold text-[#0071ce] text-base">
                            ${suggestion.price.toFixed(2)}
                          </span>
                        )}
                      </>
                    ) : suggestion.type === 'category' ? (
                      `Browse ${suggestion.text} category`
                    ) : (
                      `Browse ${suggestion.text} in ${suggestion.category}`
                    )}
                  </div>
                </div>
                <Search className="h-5 w-5 text-gray-400 group-hover:text-[#0071ce] transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}