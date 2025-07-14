"use client";

import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all-smooth group overflow-hidden card-hover hover-lift animate-scale-in">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          {!imageLoaded && (
            <div className="w-full h-full skeleton flex items-center justify-center">
              <span className="text-gray-400 animate-pulse">✨ Loading...</span>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'block' : 'hidden'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
          {discountPercentage > 0 && (
            <span className="gradient-danger text-white px-3 py-1 rounded-full text-xs font-bold shadow-medium animate-pulse">
              -{discountPercentage}%
            </span>
          )}
          {product.trending && (
            <span className="gradient-secondary text-black px-3 py-1 rounded-full text-xs font-bold shadow-medium animate-float">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-3 rounded-full glass hover:bg-white/90 shadow-medium hover:shadow-strong transition-all-smooth opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
        >
          <Heart
            className={`h-5 w-5 transition-all-smooth ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-white font-bold text-xl bg-red-500 px-4 py-2 rounded-full">❌ Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand */}
        <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{product.brand}</p>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0071ce] transition-colors text-lg leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {product.rating} ({product.reviews?.toLocaleString() || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-black text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {product.features.slice(0, 2).join(" • ")}
            </p>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-4 px-6 rounded-xl font-bold transition-all-smooth flex items-center justify-center space-x-3 btn-scale ${
            product.inStock
              ? 'bg-[#0071ce] hover:bg-[#005a9c] text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-base">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
}