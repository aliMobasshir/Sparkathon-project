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
        "Walmart+",
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
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Signup */}
      <div className="bg-[#0071ce] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Stay in the know</h3>
              <p className="text-blue-100">Get special offers and updates</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-[#ffc220] hover:bg-[#ffb800] text-black px-6 py-3 rounded-r-lg font-medium transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="text-[#0071ce] font-bold text-2xl mb-4">
                <span className="bg-[#ffc220] text-[#0071ce] px-2 py-1 rounded-lg">W</span>
                <span className="ml-1">almart</span>
              </div>
              <p className="text-gray-300 mb-4">
                Save money. Live better. Your one-stop shop for everything you need.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
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
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-[#ffc220]" />
              <div>
                <p className="text-sm text-gray-300">Customer Service</p>
                <p className="font-medium">1-800-WALMART</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-[#ffc220]" />
              <div>
                <p className="text-sm text-gray-300">Email Us</p>
                <p className="font-medium">help@walmart.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-[#ffc220]" />
              <div>
                <p className="text-sm text-gray-300">Store Locator</p>
                <p className="font-medium">Find a store near you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>&copy; 2024 Walmart Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}