"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, MapPin, Heart } from "lucide-react";
import { categories } from "@/data/products";
import { useRouter } from "next/navigation";
import SearchWithRecommendations from "./SearchWithRecommendations";

export default function Header({ 
  cartItems = [], 
  onSearch, 
  searchQuery = "", 
  onCategorySelect, 
  selectedCategory = "" 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCategories, setShowCategories] = useState(true);
  const router = useRouter();

  const cartItemsCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleCategoryClick = (categorySlug) => {
    if (categorySlug === "") {
      router.push("/");
    } else {
      router.push(`/category/${categorySlug}`);
    }
    setIsMenuOpen(false); // Close mobile menu when category is selected
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 10);
      
      // Smart hide/show logic for categories
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide categories
        setShowCategories(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or near top - show categories
        setShowCategories(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  return (
    <header className={`bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100 transition-all duration-300 ${
      isScrolled ? 'shadow-2xl' : 'shadow-xl'
    }`}>
      {/* Top Bar */}
      <div className={`gradient-primary text-white px-4 transition-all duration-300 ${
        isScrolled ? 'py-1' : 'py-2'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 hover:text-yellow-200 transition-colors">
              <MapPin className="h-4 w-4" />
              <span>Deliver to 12345</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`animate-pulse ${isScrolled ? 'hidden md:block' : ''}`}>🚚 Free shipping on orders $35+</span>
            <span>|</span>
            <span className={`hover:text-yellow-200 transition-colors cursor-pointer ${isScrolled ? 'hidden lg:block' : ''}`}>📍 Store Directory</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`max-w-7xl mx-auto px-4 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all-smooth hover:scale-105"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div 
              className="text-[#0071ce] font-bold text-3xl cursor-pointer hover:scale-105 transition-all-smooth"
              onClick={handleLogoClick}
            >
              <span className="gradient-secondary text-[#0071ce] px-3 py-2 rounded-xl shadow-medium animate-float">S</span>
              <span className="ml-1">parkmart</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl mx-8 hidden md:block">
            <SearchWithRecommendations
              onSearch={onSearch}
              searchQuery={searchQuery}
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            <button className={`items-center space-x-2 hover:text-[#0071ce] transition-all-smooth hover:scale-105 p-2 rounded-lg ${
              isScrolled ? 'hidden lg:flex' : 'hidden md:flex'
            }`}>
              <Heart className="h-6 w-6" />
              <span className="text-sm font-medium">Reorder</span>
            </button>
            
            <button className="flex items-center space-x-2 hover:text-[#0071ce] transition-all-smooth hover:scale-105 p-2 rounded-lg">
              <User className="h-6 w-6" />
              <span className="text-sm font-medium hidden md:block">Account</span>
            </button>
            
            <button className="relative flex items-center space-x-2 hover:text-[#0071ce] transition-all-smooth hover:scale-105 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm font-medium hidden md:block">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 gradient-secondary text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-medium animate-pulse-glow">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={`md:hidden transition-all duration-300 ${
          isScrolled ? 'mt-2' : 'mt-3'
        }`}>
          <SearchWithRecommendations
            onSearch={onSearch}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className={`border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white transition-all duration-300 transform ${
        isMenuOpen ? 'block' : showCategories ? 'hidden lg:block' : 'hidden lg:block lg:-translate-y-full lg:opacity-0'
      } ${!showCategories && !isMenuOpen ? 'lg:pointer-events-none' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex flex-col lg:flex-row lg:items-center lg:space-x-8 transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-4'
          }`}>
            <button
              onClick={() => handleCategoryClick("")}
              className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-[#0071ce] transition-all-smooth mb-4 lg:mb-0 p-2 rounded-lg hover:bg-white hover:shadow-soft"
            >
              <Menu className="h-4 w-4" />
              <span>All Departments</span>
            </button>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`text-sm font-semibold transition-all-smooth py-3 lg:py-2 px-3 rounded-lg text-left hover:bg-white hover:shadow-soft ${
                    selectedCategory === category.slug
                      ? 'text-[#0071ce] font-bold bg-blue-50 shadow-soft'
                      : 'text-gray-700 hover:text-[#0071ce]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}