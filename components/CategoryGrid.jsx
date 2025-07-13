"use client";

import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategoryGrid() {
  const router = useRouter();

  const handleCategoryClick = (categorySlug) => {
    router.push(`/category/${categorySlug}`);
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-black text-gradient-primary mb-4">Shop by Category</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover amazing products across all categories with unbeatable prices</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-slide-up">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className="group relative overflow-hidden rounded-2xl shadow-medium hover:shadow-strong transition-all-smooth cursor-pointer card-hover hover-lift"
          >
            <div className="aspect-square relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-black text-xl mb-2 drop-shadow-lg">{category.name}</h3>
                <div className="flex items-center space-x-2 text-sm opacity-0 group-hover:opacity-100 transition-all-smooth transform translate-y-2 group-hover:translate-y-0">
                  <span>Shop now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all-smooth">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}