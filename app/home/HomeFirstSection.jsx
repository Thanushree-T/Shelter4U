"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Dropdown } from "primereact/dropdown";
import '../project-page/style.css';

/**
 * HomeFirstSection Component
 * 
 * A comprehensive hero section component for a real estate website that includes:
 * - Animated typing text display
 * - Search functionality with autocomplete
 * - Background image overlay
 * - Statistical counters
 * - Responsive design
 * 
 * @param {Object} data - Configuration object containing:
 *   - firstLine: First line of animated text
 *   - secondLine: Second line of animated text
 *   - img: Background image URL
 *   - paragraphOne: First descriptive paragraph
 *   - paragraphTwo: Second descriptive paragraph
 *   - counts: Array of statistical data for counters
 */
function HomeFirstSection( { data } ) {
  // Next.js router for navigation
  const router = useRouter();
  
  // State for search functionality
  const [location, setLocation] = useState(""); // User input for location search
  const [cities, setCities] = useState([]); // Array of available cities
  const [selectedCity, setSelectedCity] = useState(null); // Selected city from dropdown
  const [isClient, setIsClient] = useState(false); // Client-side rendering flag for hydration
  
  // Base URL for API calls from environment variables (fallback to relative in dev)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  
  // State for search autocomplete suggestions
  const [suggestions, setSuggestions] = useState({
    value: "", // Current search value
    areas: [], // Array of area suggestions
    projects: [], // Array of project suggestions
    cities: [], // Array of city suggestions
  });

  // State for animated typing text effect
  const [displayText, setDisplayText] = useState(""); // Currently displayed text
  const [currentIndex, setCurrentIndex] = useState(0); // Current character index in typing animation
  const [typingComplete, setTypingComplete] = useState(false); // Flag to track if typing cycle is complete

  // Extract data props for typing animation
  const firstLine = data?.firstLine;
  const secondLine = data?.secondLine;

  /**
   * Effect to set client-side rendering flag
   * Prevents hydration mismatches for components that behave differently on server vs client
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Handle search form submission
   * Constructs URL parameters and navigates to search results page
   * 
   * @param {Event} e - Form submission event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    // Add location parameter if provided
    if (location && location.trim()) {
      params.set("q", location.trim());
    }
    
    // Add city parameter if selected and not "All Cities"
    if (selectedCity && selectedCity !== "All Cities") {
      params.set("city", selectedCity);
    }
    
    // Navigate to search results page with parameters
    router.push(`/search?${params.toString()}`);
  };

  // Ref for search location input to handle outside clicks
  const searchLocationRef = useRef(null);

  /**
   * Typing animation effect
   * Creates a typewriter effect that cycles through firstLine and secondLine
   * Automatically restarts after completion with a 3-second delay
   */
  useEffect(() => {
    // Guard clause: don't run if data isn't available
    if (!firstLine || !secondLine) return;
    
    const handleTyping = () => {
      // Typing first line
      if (currentIndex < firstLine.length) {
        setDisplayText((prevText) => prevText + firstLine[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } 
      // Add line break after first line
      else if (currentIndex === firstLine.length) {
        setDisplayText((prevText) => prevText + "\n");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } 
      // Typing second line
      else if (currentIndex < firstLine.length + secondLine.length + 1) {
        const secondLineIndex = currentIndex - firstLine.length - 1;
        setDisplayText((prevText) => prevText + secondLine[secondLineIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } 
      // Typing complete - reset after delay
      else {
        setTypingComplete(true);
        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setTypingComplete(false);
        }, 3000); // 3-second pause before restarting
      }
    };

    // Only run typing animation if not in complete state
    if (!typingComplete) {
      const timer = setTimeout(handleTyping, 75); // 75ms delay between characters
      return () => clearTimeout(timer);
    }
  }, [currentIndex, typingComplete, firstLine, secondLine]);

  /**
   * Effect to handle clicks outside search suggestions
   * Closes the suggestions dropdown when user clicks elsewhere
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchLocationRef.current && !searchLocationRef.current.contains(event.target)) {
        setSuggestions({ value: "", areas: [], projects: [], cities: [] });
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/city`);
        let citiesData = await response.json();
        citiesData.unshift({"name":"All Cities"}); // Add "All Cities" option at the beginning
        setCities(citiesData);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]); // Set empty array on error
      }
    };
    
    fetchCities();
  }, [baseUrl]);

  return (
    <div className="overflow-x-hidden">
      {/* Main hero section container */}
      <div className="relative lg:static lg:min-h-[100vh]">
        
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${data?.img}')`,
            backgroundPosition: "center bottom",
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/80"></div>
        </div>

        {/* Main content area with increased padding bottom for more space */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-48 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Left content section */}
            <div className="space-y-8 lg:mt-0">
              
              {/* Animated typing text container with fixed height to prevent layout shifts */}
              <div className="min-h-[80px] sm:min-h-[150px] md:min-h-[150px]">
                <h1 className="text-2xl sm:text-5xl md:text-5xl lg:text-5xl font-bold text-gray-700 leading-tight whitespace-pre-line">
                  {/* Display animated text with HTML support */}
                  <span dangerouslySetInnerHTML={{ __html: displayText }} />
                  {/* Animated cursor */}
                  <span className="typing-cursor inline-block w-[1ch]">|</span>
                </h1>
              </div>
              
              {/* Descriptive paragraphs with glass morphism effect */}
              <div className="space-y-6 max-w-xl">
                {data?.paragraphOne && (
                  <p className="text-base sm:text-lg text-gray-700 p-3 px-4 backdrop-blur-sm bg-white/50 rounded-full">
                    {data.paragraphOne}
                  </p>
                )}
                {data?.paragraphTwo && (
                  <span className="text-base sm:text-lg text-gray-700 font-medium p-2 px-3 backdrop-blur-sm bg-white/50 rounded-full">
                    {data.paragraphTwo}
                  </span>
                )}
              </div>
            </div>

            {/* Right content - Search card with sticky positioning on large screens */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full lg:sticky lg:top-20">
              
              {/* Search card header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Search
                </h3>
              </div>
              
              {/* Search form */}
              <form
                onSubmit={handleSearch}
                className="space-y-4 sm:space-y-6"
              >
                
                {/* City selection dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    City
                  </label>
                  <Dropdown
                    className="w-full border border-gray-300 rounded-lg text-sm sm:text-base p-dropdown-input-text:py-2 sm:p-dropdown-input-text:py-3"
                    value={selectedCity? selectedCity : "All Cities"}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={cities.map((c) => ({
                      label: c.name,
                      value: c.name
                    }))}
                    placeholder="Select City"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>

                {/* Location input with autocomplete functionality */}
                <div className="relative" ref={searchLocationRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Location
                  </label>
                  <div className="relative">
                    {/* Location marker icon */}
                    <HiLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                    
                    {/* Location input field */}
                    <input
                      type="text"
                      value={location}
                      onChange={async (e) => {
                        const value = e.target.value;
                        setLocation(value);

                        // Don't fetch suggestions for queries shorter than 3 characters
                        if (value.length < 3) {
                          setSuggestions({
                            value: value,
                            areas: [],
                            projects: [],
                            cities: [],
                          });
                          return;
                        }

                        // Fetch autocomplete suggestions from API
                        try {
                          const res = await fetch(
                            `${baseUrl}/api/search/autocomplete?q=${value}`
                          );
                          const data = await res.json();
                          setSuggestions({ ...data, value: value });
                        } catch (err) {
                          // Silently handle errors and reset suggestions
                          setSuggestions({
                            value: "",
                            areas: [],
                            projects: [],
                            cities: [],
                          });
                        }
                      }}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Enter your desired location"
                    />
                  </div>
                  
                  {/* Autocomplete suggestions dropdown */}
                  {((suggestions.areas && suggestions.areas.length > 0) ||
                    (suggestions.projects && suggestions.projects.length > 0) ||
                    (suggestions.cities && suggestions.cities.length > 0) ||
                    suggestions.value) && (
                    <div className="absolute top-full mt-1 sm:mt-2 w-full bg-white shadow-lg rounded-md z-50 max-h-60 sm:max-h-64 overflow-y-auto border border-gray-200">
                      
                      {/* General search option */}
                      {suggestions.value && (
                        <div
                          className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                          onClick={() => {
                            const params = new URLSearchParams();
                            params.set("q", suggestions.value);
                            if (selectedCity && selectedCity !== "All Cities") {  
                              params.set("city", selectedCity);
                            }
                            router.push(`/search?${params.toString()}`);
                            setSuggestions({
                              value: "",
                              areas: [],
                              projects: [],
                              cities: [],
                            });
                          }}
                        >
                          Search for "{suggestions.value}"
                        </div>
                      )}
                      
                      {/* Areas suggestions section */}
                      {suggestions.areas.length > 0 && (
                        <>
                          <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-gray-100 text-xs font-bold text-gray-500">
                            Areas
                          </div>
                          {suggestions.areas.map((area) => (
                            <div
                              key={area._id}
                              onClick={() => {
                                const params = new URLSearchParams();
                                params.set("area", area.name);
                                if (selectedCity && selectedCity !== "All Cities") {
                                  params.set("city", selectedCity);
                                }
                                router.push(`/search?${params.toString()}`);
                                setSuggestions({
                                  value: "",
                                  areas: [],
                                  projects: [],
                                  cities: [],
                                });
                              }}
                              className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                            >
                              {area.name}
                            </div>
                          ))}
                        </>
                      )}
                      
                      {/* Cities suggestions section */}
                      {suggestions.cities.length > 0 && (
                        <>
                          <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-gray-100 text-xs font-bold text-gray-500">
                            Cities
                          </div>
                          {suggestions.cities.map((city) => (
                            <div
                              key={city._id}
                              className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                              onClick={() => {
                                const params = new URLSearchParams();
                                params.set("city", city.name);
                                router.push(`/search?${params.toString()}`);
                                setSuggestions({
                                  value: "",
                                  areas: [],
                                  projects: [],
                                  cities: [],
                                });
                              }}
                            >
                              {city.name}
                            </div>
                          ))}
                        </>
                      )}
                      
                      {/* Projects suggestions section */}
                      {suggestions.projects.length > 0 && (
                        <>
                          <div className="px-3 sm:px-4 py-1 sm:py-2 border-t border-gray-100 text-xs font-bold text-gray-500">
                            Projects
                          </div>
                          {suggestions.projects.map((project) => (
                            <div
                              key={project._id}
                              onClick={() => {
                                router.push(`/project-page/${project._id}`);
                                setSuggestions({
                                  value: "",
                                  areas: [],
                                  projects: [],
                                  cities: [],
                                });
                              }}
                              className="px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
                            >
                              {project.projectName}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Animated search button */}
                <motion.button
                  className="w-full bg-gray-900 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200 text-sm sm:text-base"
                  type="submit"
                  whileHover={{ scale: 1.02 }} // Subtle scale on hover
                  whileTap={{ scale: 0.98 }} // Subtle scale on tap/click
                >
                  Search
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Statistics section at bottom with gradient background */}
        <div className="absolute bottom-0 left-0 right-0 gradient-vertical from-bg-transparent to-bg-black py-6 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Map through statistical data and create animated counters */}
              {data?.counts?.map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {/* Use CountUp animation only on client side to prevent hydration issues */}
                    {isClient ? (
                        <CountUp
                        start={item.start || 0} // Starting number (default 0)
                        end={item.end} // Ending number
                        duration={item.duration || 2.5} // Animation duration (default 2.5s)
                        separator="," // Thousands separator
                        useEasing={true} // Smooth easing animation
                        />
                    ) : (
                        item.end // Show final number immediately on server-side
                    )}
                    <span className="text-white">+</span>
                  </h3>
                  <p className="text-sm md:text-base text-white/80">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Component-specific styles using styled-jsx */}
      <style jsx>{`
        /* Blinking cursor animation for typing effect */
        .typing-cursor {
          display: inline-block;
          animation: blink 1s step-end infinite;
        }

        /* Keyframes for cursor blinking animation */
        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        /* Preserve line breaks in typing text */
        .whitespace-pre-line {
          white-space: pre-line;
        }

        /* Responsive text sizing for mobile devices */
        @media (max-width: 640px) {
          .text-2xl.sm\:text-3xl.md\:text-4xl.lg\:text-5xl {
            font-size: 1.75rem; /* Slightly larger than default for better impact */
            line-height: 1.4;
          }
        }
        
        /* Extra small screen adjustments */
        @media (max-width: 420px) {
          .text-2xl.sm\:text-3xl.md\:text-4xl.lg\:text-5xl {
            font-size: 1.5rem;
            line-height: 1.3;
          }
        }

        /* 
         * Custom styling for PrimeReact dropdown component
         * These styles target global classes to customize the dropdown appearance
         */
        :global(.p-dropdown .p-dropdown-label) {
          padding-top: 0.5rem; /* Corresponds to py-2 */
          padding-bottom: 0.5rem; /* Corresponds to py-2 */
        }
        
        /* Responsive padding for dropdown on larger screens */
        @media (min-width: 640px) {
          :global(.p-dropdown .p-dropdown-label) {
            padding-top: 0.75rem; /* Corresponds to sm:py-3 */
            padding-bottom: 0.75rem; /* Corresponds to sm:py-3 */
          }
        }
      `}</style>
    </div>
  );
}

export default HomeFirstSection;