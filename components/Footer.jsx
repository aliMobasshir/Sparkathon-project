"use client";

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Customer Service",
      links: [
        "Help Center",
        "Track Your Order",
        "Returns & Refunds",
        "Shipping Info",
        "Contact Us"
      ]
    },
    {
      title: "About Walmart",
      links: [
        "Our Story",
        "Careers",
        "Press Center",
        "Sustainability",
        "Investor Relations"
      ]
    },
    {
      title: "Services",
      links: [
        "Sparkmart+",
        "Grocery Pickup",
        "Pharmacy",
        "Financial Services",
        "Photo Services"
      ]
    },
    {
      title: "Shop",
      links: [
        "Weekly Ads",
        "Rollbacks",
        "Clearance",
        "Gift Cards",
        "Registry"
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Signup */}
      <div className="gradient-primary py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between animate-fade-in">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black mb-3">📧 Stay in the know</h3>
              <p className="text-blue-100 text-lg">Get exclusive deals, special offers and the latest updates</p>
            </div>
            <div className="flex w-full md:w-auto shadow-strong rounded-2xl overflow-hidden">
              <input
                type="email"
                placeholder="✉️ Enter your email address"
                className="flex-1 md:w-80 px-6 py-4 text-gray-900 focus:outline-none text-lg"
              />
              <button className="gradient-secondary hover:shadow-glow text-black px-8 py-4 font-bold transition-all-smooth hover:scale-105 text-lg">
                🚀 Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 animate-slide-up">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="text-[#0071ce] font-bold text-3xl mb-6 hover:scale-105 transition-transform cursor-pointer">
                <span className="gradient-secondary text-[#0071ce] px-3 py-2 rounded-xl shadow-medium">S</span>
                <span className="ml-1">parkmart</span>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                💰 Save money. ✨ Live better. Your one-stop shop for everything you need and more.
              </p>
              <div className="flex space-x-6">
                <Facebook className="h-7 w-7 text-gray-400 hover:text-blue-400 cursor-pointer transition-all-smooth hover:scale-125 hover:shadow-glow" />
                <Twitter className="h-7 w-7 text-gray-400 hover:text-blue-400 cursor-pointer transition-all-smooth hover:scale-125 hover:shadow-glow" />
                <Instagram className="h-7 w-7 text-gray-400 hover:text-pink-400 cursor-pointer transition-all-smooth hover:scale-125 hover:shadow-glow" />
                <Youtube className="h-7 w-7 text-gray-400 hover:text-red-400 cursor-pointer transition-all-smooth hover:scale-125 hover:shadow-glow" />
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <h4 className="font-black text-xl mb-6 text-gradient-secondary">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-all-smooth text-base hover:translate-x-2 inline-block hover:text-[#ffc220]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t border-gray-700 py-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="flex items-center space-x-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="p-3 gradient-secondary rounded-full">
                <Phone className="h-6 w-6 text-gray-800" />
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">📞 Customer Service</p>
                <p className="font-bold text-lg">1-800-SPARKMART</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="p-3 gradient-secondary rounded-full">
                <Mail className="h-6 w-6 text-gray-800" />
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">✉️ Email Us</p>
                <p className="font-bold text-lg">help@sparkmart.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="p-3 gradient-secondary rounded-full">
                <MapPin className="h-6 w-6 text-gray-800" />
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">📍 Store Locator</p>
                <p className="font-bold text-lg">Find a store near you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-base text-gray-400">
            <p className="font-medium">&copy; 2024 Sparkmart Inc. All rights reserved. Made with ❤️</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-all-smooth hover:scale-105 font-medium">🔒 Privacy Policy</a>
              <a href="#" className="hover:text-white transition-all-smooth hover:scale-105 font-medium">📋 Terms of Service</a>
              <a href="#" className="hover:text-white transition-all-smooth hover:scale-105 font-medium">🍪 Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}