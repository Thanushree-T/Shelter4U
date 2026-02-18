"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

/**
 * Header Component - Main navigation header for the Shelter4U website
 * Features:
 * - Responsive design (mobile and desktop)
 * - Dropdown menus with hover/click interactions
 * - Mobile hamburger menu
 * - Active page highlighting
 * - Sticky positioning
 */
function Header() {
  // Get current pathname for active link highlighting
  const pathname = usePathname();
  
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State to track which dropdown is currently active (null, "aboutUs", "location", "type", "others")
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Refs for dropdown containers - used for click outside detection
  const aboutUsRef = useRef(null);
  const locationRef = useRef(null);
  const typeRef = useRef(null);
  const othersRef = useRef(null);

  /**
   * Effect to handle clicking outside dropdowns to close them
   * Listens for mousedown events and closes dropdowns if click is outside all dropdown containers
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside all dropdown containers
      if (
        aboutUsRef.current &&
        !aboutUsRef.current.contains(event.target) &&
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        typeRef.current &&
        !typeRef.current.contains(event.target) &&
        othersRef.current &&
        !othersRef.current.contains(event.target)
      ) {
        // Close all dropdowns
        setActiveDropdown(null);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Toggle dropdown visibility
   * @param {string} dropdown - The dropdown identifier ("aboutUs", "location", "type", "others")
   */
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  /**
   * Check if current path matches the given path for active link styling
   * @param {string} path - The path to check against current pathname
   * @returns {boolean} - True if paths match
   */
  const isActive = (path) => {
    return pathname === path;
  };

  /**
   * Close mobile menu and all dropdowns
   * Used when mobile menu items are clicked
   */
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex flex-col xl:flex-row justify-between items-center px-4 md:px-8 py-3">
        
        {/* Logo and Mobile Menu Button Container */}
        <div className="w-full xl:w-auto flex justify-between items-center">
          {/* Logo (uses two variants: icon on mobile, full on desktop) */}
          <Link href="/">
            <div className="pl-2 md:pl-4 flex items-center">
              {/* Mobile icon logo */}
              <span className="block md:hidden">
                <Image
                  src="/image.png"
                  alt="Shelter4U"
                  width={40}
                  height={40}
                  priority
                />
              </span>
              {/* Desktop full logo */}
              <span className="hidden md:block">
                <Image
                  src="/image.png"
                  alt="Shelter4U"
                  width={100}
                  height={40}
                  priority
                />
              </span>
            </div>
          </Link>
          
          {/* Mobile Menu Hamburger Button - only visible on mobile (xl:hidden) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-2xl p-2 cursor-pointer text-red-600"
          >
            ☰
          </button>
        </div>

        {/* Desktop Navigation Links - hidden on mobile, visible on xl screens and up */}
        <div className="hidden xl:flex space-x-1 lg:space-x-2">
          
          {/* Home Link */}
          <Link
            href="/"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Home
            {/* Animated underline on hover */}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>

          {/* About Us Dropdown */}
          <div
            className="relative"
            ref={aboutUsRef}
            onMouseEnter={() => setActiveDropdown("aboutUs")} // Open on hover
            onMouseLeave={() => setActiveDropdown(null)}      // Close when mouse leaves
          >
            {/* Dropdown Trigger Button */}
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              About Us
              {/* Animated underline */}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              {/* Dropdown Arrow Icon */}
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "aboutUs" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu - conditionally rendered */}
            {activeDropdown === "aboutUs" && (
              <div className="absolute left-0 w-56 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/about/companyProfile"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Company Profile
                </Link>
                <Link
                  href="/about/vissionMission"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Our Visions & Mission
                </Link>
                <Link
                  href="/about/privacyPolicy"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/about/career"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Career
                </Link>
                <Link
                  href="/about/team"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Team
                </Link>
                <Link
                  href="/about/event"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Event Photo Gallery
                </Link>
              </div>
            )}
          </div>

          {/* Property By Location Dropdown */}
          <div
            className="relative"
            ref={locationRef}
            onMouseEnter={() => setActiveDropdown("location")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Property By Location
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "location" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Location Dropdown Menu */}
            {activeDropdown === "location" && (
              <div className="absolute left-0 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/search?city=ahmedabad"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Ahmedabad
                </Link>
                <Link
                  href="/search?city=gandhinagar"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Gandhinagar
                </Link>
                <Link
                  href="/search?city=pune"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Pune
                </Link>
                <Link
                  href="/search?city=mumbai"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Mumbai
                </Link>
              </div>
            )}
          </div>

          {/* Property By Type Dropdown */}
          <div
            className="relative"
            ref={typeRef}
            onMouseEnter={() => setActiveDropdown("type")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Property By Type
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "type" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Property Type Dropdown Menu */}
            {activeDropdown === "type" && (
              <div className="absolute left-0 w-44 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/search?projectType=Residential"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Residential
                </Link>
                <Link
                  href="/search?projectType=Commercial"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Commercial
                </Link>
                <Link
                  href="/search?projectType=Land"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Land
                </Link>
              </div>
            )}
          </div>

          {/* Inquiry Link */}
          <Link
            href="/Inquiry"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Inquiry
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>

          {/* Others Dropdown */}
          <div
            className="relative"
            ref={othersRef}
            onMouseEnter={() => setActiveDropdown("others")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Others
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "others" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Others Dropdown Menu */}
            {activeDropdown === "others" && (
              <div className="absolute right--1 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/others/loansForNRI"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Loans for NRIs
                </Link>
                <Link
                  href="/others/legalInfo"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Legal Information
                </Link>
              </div>
            )}
          </div>

          {/* Contact Us Link */}
          <Link
            href="/contactus"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Contact Us
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu - conditionally shown based on isMenuOpen state */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full xl:hidden mt-3 border-t border-gray-100 pt-3`}
        >
          <div className="flex flex-col items-start space-y-1 px-2">
            
            {/* Mobile Home Link */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/") ? "text-red-600 bg-red-50" : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Home
            </Link>

            {/* Mobile About Us Dropdown */}
            <div className="w-full">
              {/* Dropdown Toggle Button */}
              <button
                onClick={() => toggleDropdown("aboutUs")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                About Us
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "aboutUs" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Collapsible Dropdown Content - uses CSS transitions for smooth open/close */}
              <div className={`transition-all duration-300 ${activeDropdown === "aboutUs" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/about/companyProfile"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Company Profile
                  </Link>
                  <Link
                    href="/about/vissionMission"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Our Visions & Mission
                  </Link>
                  <Link
                    href="/about/privacyPolicy"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/about/career"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Career
                  </Link>
                  <Link
                    href="/about/team"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Team
                  </Link>
                  <Link
                    href="/about/event"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Event Photo Gallery
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Property By Location Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("location")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Property By Location
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "location" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className={`transition-all duration-300 ${activeDropdown === "location" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/search?city=ahmedabad"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Ahmedabad
                  </Link>
                  <Link
                    href="/search?city=pune"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Pune
                  </Link>
                  <Link
                    href="/search?city=mumbai"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Mumbai
                  </Link>
                  <Link
                    href="/search?city=gandhinagar"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Gandhinagar
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Property By Type Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("type")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Property By Type
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "type" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className={`transition-all duration-300 ${activeDropdown === "type" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/search?projectType=Residential"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Residential
                  </Link>
                  <Link
                    href="/search?projectType=Commercial"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Commercial
                  </Link>
                  <Link
                    href="/search?projectType=Plot"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Plot
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Inquiry Link */}
            <Link
              href="/Inquiry"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/inquiry")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Inquiry
            </Link>

            {/* Mobile Others Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("others")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Others
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "others" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className={`transition-all duration-300 ${activeDropdown === "others" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/others/loansForNRI"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Loans for NRI
                  </Link>
                  <Link
                    href="/others/legalInfo"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Legal Information
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Contact Us Link */}
            <Link
              href="/contactus"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/contact")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* CSS Animations - Custom keyframe animations for dropdown effects */}
      <style jsx>{`
        /* Fade in animation for desktop dropdowns */
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        
        /* Slide down animation (unused but available) */
        .animate-slideDown {
          animation: slideDown 0.3s ease-in-out;
        }

        /* Keyframe for fade in effect */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Keyframe for slide down effect */
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Header;