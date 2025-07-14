"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const heroSlides = [
  {
    id: 1,
    title: "Save Big on Electronics",
    subtitle: "Up to 50% off on top brands",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Shop Electronics",
    color: "from-blue-600 to-purple-600"
  },
  {
    id: 2,
    title: "Fresh Groceries Delivered",
    subtitle: "Same-day delivery available",
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Order Groceries",
    color: "from-green-600 to-blue-600"
  },
  {
    id: 3,
    title: "Home & Garden Sale",
    subtitle: "Transform your space for less",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Shop Home",
    color: "from-orange-600 to-red-600"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleCTAClick = (slideId) => {
    switch(slideId) {
      case 1:
        router.push('/category/electronics');
        break;
      case 2:
        router.push('/category/grocery');
        break;
      case 3:
        router.push('/category/home-garden');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-strong animate-fade-in">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-85`} />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-3xl px-6">
                <h1 className="text-responsive-xl font-black mb-6 animate-slide-up drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-3xl mb-10 animate-fade-in-delay font-medium drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <button 
                  onClick={() => handleCTAClick(slide.id)}
                  className="gradient-secondary hover:shadow-glow text-black font-bold py-5 px-10 rounded-2xl text-xl transition-all-smooth hover:scale-110 shadow-strong btn-scale animate-pulse-glow"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 glass hover:bg-white/90 rounded-full p-4 shadow-strong transition-all-smooth hover:scale-125 hover:shadow-glow"
      >
        <ChevronLeft className="h-7 w-7 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 glass hover:bg-white/90 rounded-full p-4 shadow-strong transition-all-smooth hover:scale-125 hover:shadow-glow"
      >
        <ChevronRight className="h-7 w-7 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all-smooth hover:scale-125 ${
              index === currentSlide ? 'bg-white shadow-glow' : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}