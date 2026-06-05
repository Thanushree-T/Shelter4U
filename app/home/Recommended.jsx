"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiMapPin,
  FiLayers,
  FiCheckCircle,
  FiUser,
  FiPhone,
  FiMail,
  FiX,
  FiCheck,
  FiCompass,
  FiVideo,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiGlobe,
  FiGrid,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import Cards from "../Components/Cards.jsx";

// Horizontal Card for Owner Properties to match New Projects horizontal layout
const OwnerPropertyHorizontalCard = ({
  property,
  setLeadProperty,
  formatPrice,
}) => {
  const router = useRouter();
  const coverImg =
    property.images?.[0]?.url ||
    "https://placehold.co/600x400?text=Direct+Listing";

  const handleShareProperty = async (e, prop) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share({
        title: `Check out this property: ${prop.title}`,
        text: `Explore the details of ${prop.title} in ${prop.area?.name || "Direct Owner"}.`,
        url: `${window.location.origin}/property-page/${prop._id}`,
      });
    } catch (err) {
      console.warn("Share failed or not supported:", err);
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/property-page/${prop._id}`,
        );
        alert("Link copied to clipboard!");
      } catch (clipErr) {
        console.error("Clipboard copy failed:", clipErr);
      }
    }
  };

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      router.push(`/property-page/${property._id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative flex flex-row bg-white rounded-2xl overflow-hidden w-full border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-red-200/60 transition-all duration-300 group min-h-[120px] md:h-auto cursor-pointer"
    >
      {/* Floating Share Button in Top-Right */}
      <div className="absolute top-3 right-3 z-40 hidden md:block">
        <button
          onClick={(e) => handleShareProperty(e, property)}
          className="p-1.5 bg-white/90 hover:bg-white text-gray-550 hover:text-red-650 rounded-full border border-gray-200/80 shadow-sm transition-all duration-200 active:scale-90 cursor-pointer flex items-center justify-center backdrop-blur-sm"
          title="Share Property"
        >
          <FiShare2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Left Section: Cover Image */}
      <div className="relative w-28 md:w-[40%] shrink-0 overflow-hidden group/img bg-gray-50 border-r border-gray-100 min-h-[120px] md:min-h-[160px]">
        <Link
          href={`/property-page/${property._id}`}
          onClick={(e) => {
            if (window.innerWidth < 768) {
              e.preventDefault();
            }
          }}
          className="absolute inset-0 block cursor-pointer"
        >
          <img
            src={optimizeCloudinaryUrl(coverImg, {
              width: 600,
              height: 400,
            })}
            alt={property.title}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Zero Brokerage Overlay Badge */}
        <div className="absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5 z-30">
          <span className="bg-red-600 text-white text-[8px] md:text-[9px] font-black uppercase px-1 md:px-1.5 py-0.5 rounded shadow-sm tracking-wider flex items-center gap-0.5">
            <FiCheck size={8} strokeWidth={4} /> Zero Brokerage
          </span>
        </div>
      </div>

      {/* Right Section: Content */}
      <div className="flex-1 min-w-0 p-3 md:p-5 flex flex-col justify-between">
        <div className="space-y-0.5 md:space-y-1 text-left">
          {/* BHK & Property Type tag */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[8px] md:text-[9px] font-black text-red-600 bg-red-50 px-1 md:px-1.5 py-0.5 rounded uppercase tracking-wider border border-red-100/50">
              {property.bhkType} • {property.propertyType}
            </span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-1 md:gap-1.5 flex-wrap pt-0.5 md:pt-1">
            <Link
              href={`/property-page/${property._id}`}
              onClick={(e) => {
                if (window.innerWidth < 768) {
                  e.preventDefault();
                }
              }}
              className="group/title inline-block min-w-0"
            >
              <h3 className="text-gray-950 text-xs md:text-base font-extrabold hover:text-red-600 transition-colors line-clamp-none md:line-clamp-2 leading-snug cursor-pointer font-bold">
                {property.title}
              </h3>
            </Link>
          </div>

          {/* Owner & Locality Info row */}
          <div className="flex flex-wrap items-center gap-x-2 pt-0.5 text-[10px] md:text-xs text-gray-500 font-semibold">
            <span className="hidden md:flex items-center gap-0.5">
              <FiUser className="h-3 w-3 text-red-500 shrink-0" />
              <span>By {property.ownerName || "Direct Owner"}</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="text-gray-400 font-normal hidden md:inline">
                •
              </span>
              <FiMapPin className="h-3 w-3 text-red-655 shrink-0 hidden md:block" />
              <span>
                {property.area?.name || "Unknown Area"}
                {property.city?.name ? `, ${property.city.name}` : ""}
              </span>
            </span>
          </div>

          {/* Specifications - Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 bg-gray-50 border border-gray-100 rounded-xl my-2.5 py-1.5 px-1.5 text-xs divide-x divide-gray-200">
            {/* Carpet Area */}
            <div className="flex items-center gap-1.5 px-1.5 min-w-0">
              <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                <FiLayers className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] text-gray-400 font-extrabold uppercase leading-none">
                  Carpet Area
                </p>
                <p className="text-[10px] font-black text-gray-800 mt-0.5 leading-tight truncate">
                  {property.size} {property.areaUnit || "sqft"}
                </p>
              </div>
            </div>

            {/* Configuration */}
            <div className="flex items-center gap-1.5 px-2 min-w-0">
              <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                <FiHome className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] text-gray-400 font-extrabold uppercase leading-none">
                  Configuration
                </p>
                <p className="text-[10px] font-black text-gray-800 mt-0.5 leading-tight truncate">
                  {property.bedrooms} Bed • {property.bathrooms} Bath
                </p>
              </div>
            </div>
          </div>

          {/* Specifications - Mobile inline list */}
          <div className="block md:hidden text-[9px] text-gray-400 font-bold mt-0.5">
            {property.size} {property.areaUnit || "sqft"}
            {property.bedrooms && ` • ${property.bedrooms} BHK`}
          </div>
        </div>

        {/* Bottom Section: Pricing & Action Buttons */}
        <div className="mt-0.5 md:mt-3 md:pt-3 md:border-t md:border-gray-100 flex items-center justify-between gap-1 w-full">
          {/* Price */}
          <span className="text-xs md:text-base font-black text-gray-900 tracking-tight leading-none block">
            {formatPrice(property.price)}
          </span>

          {/* Action CTAs - Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 gap-2 w-full sm:w-auto shrink-0">
            <Link
              href={`/property-page/${property._id}`}
              className="bg-white hover:bg-slate-50 text-gray-700 hover:text-red-600 font-extrabold text-[10px] uppercase tracking-wider py-2 px-2.5 rounded-lg border border-gray-200 hover:border-red-200 transition active:scale-[0.97] cursor-pointer shadow-sm duration-150 text-center flex items-center justify-center"
            >
              View Details
            </Link>
            <button
              onClick={() => setLeadProperty(property)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 px-2.5 rounded-lg transition active:scale-[0.97] cursor-pointer shadow-sm hover:shadow-red-500/10 duration-150 text-center flex items-center justify-center"
            >
              Get Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Recommended({ projects = [], properties = [] }) {
  const [activeTab, setActiveTab] = useState("projects"); // "projects" or "properties"
  const [isMobile, setIsMobile] = useState(false);
  const [projectActiveIndex, setProjectActiveIndex] = useState(0);
  const [propertyActiveIndex, setPropertyActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollContainerRef = useRef(null);
  const mobileScrollContainerRef = useRef(null);
  const propertiesScrollContainerRef = useRef(null);
  const mobilePropertiesScrollContainerRef = useRef(null);

  const scrollNext = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const card = container.querySelector(".project-card-wrapper");
      const cardWidth = card ? card.clientWidth + 24 : 320;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const card = container.querySelector(".project-card-wrapper");
      const cardWidth = card ? card.clientWidth + 24 : 320;
      if (container.scrollLeft <= 10) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const scrollNextMobile = () => {
    const container = mobileScrollContainerRef.current;
    if (container) {
      const card = container.querySelector(".project-card-wrapper");
      const cardWidth = card ? card.clientWidth + 24 : 320;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const container = isMobile
      ? mobileScrollContainerRef.current
      : scrollContainerRef.current;
    const shouldAutoplay = isMobile ? projects.length > 1 : projects.length > 4;
    if (!container || !shouldAutoplay) return;

    let intervalId = setInterval(() => {
      if (isMobile) {
        scrollNextMobile();
      } else {
        scrollNext();
      }
    }, 4500);

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (isMobile) {
          scrollNextMobile();
        } else {
          scrollNext();
        }
      }, 4500);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [projects, isMobile]);

  const propertiesScrollNext = () => {
    const container = propertiesScrollContainerRef.current;
    if (container) {
      const card = container.querySelector(".property-card-wrapper");
      const cardWidth = card ? card.clientWidth + 24 : 320;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };

  const propertiesScrollPrev = () => {
    const container = propertiesScrollContainerRef.current;
    if (container) {
      const card = container.querySelector(".property-card-wrapper");
      const cardWidth = card ? card.clientWidth + 24 : 320;
      if (container.scrollLeft <= 10) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const scrollNextPropertiesMobile = () => {
    const container = mobilePropertiesScrollContainerRef.current;
    if (container) {
      const card = container.querySelector(".property-card-wrapper");
      const cardWidth = card ? card.clientWidth + 24 : 320;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const container = isMobile
      ? mobilePropertiesScrollContainerRef.current
      : propertiesScrollContainerRef.current;
    const shouldAutoplay = isMobile
      ? properties.length > 1
      : properties.length > 4;
    if (!container || !shouldAutoplay) return;

    let intervalId = setInterval(() => {
      if (isMobile) {
        scrollNextPropertiesMobile();
      } else {
        propertiesScrollNext();
      }
    }, 4500);

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (isMobile) {
          scrollNextPropertiesMobile();
        } else {
          propertiesScrollNext();
        }
      }, 4500);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [properties, isMobile]);

  // "Get Owner Details" Modal State
  const [leadProperty, setLeadProperty] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Format price into Indian Units
  const formatPrice = (num) => {
    if (!num) return "On Request";
    if (num >= 1e7) {
      return `₹ ${(num / 1e7).toFixed(2)} Cr`;
    } else if (num >= 1e5) {
      return `₹ ${(num / 1e5).toFixed(2)} Lac`;
    }
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setLeadSubmitted(true);
  };

  const closeLeadModal = () => {
    setLeadProperty(null);
    setLeadForm({ name: "", phone: "" });
    setLeadSubmitted(false);
  };

  const projectGroups = [];
  for (let i = 0; i < projects.length; i += 4) {
    projectGroups.push(projects.slice(i, i + 4));
  }

  const propertyGroups = [];
  for (let i = 0; i < properties.length; i += 4) {
    propertyGroups.push(properties.slice(i, i + 4));
  }

  return (
    <section className="pt-8 px-4 sm:px-6 lg:px-8 bg-white select-none">
      <div className="max-w-7xl mx-auto">
        {/* ── Unified Tab Navigation (Inspired by Vital Space) ── */}
        <div className="flex border-b border-gray-200 gap-6 mb-5 relative">
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-2 text-base font-extrabold border-b-2 cursor-pointer transition-all duration-200 ${
              activeTab === "projects"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            New Projects
          </button>

          {properties && properties.length > 0 && (
            <button
              onClick={() => setActiveTab("properties")}
              className={`relative pb-2 text-base font-extrabold border-b-2 cursor-pointer transition-all duration-200 ${
                activeTab === "properties"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Owner Properties
              <span className="absolute -top-1.5 -right-6 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[7px] font-black uppercase shadow-sm tracking-wide">
                New
              </span>
            </button>
          )}
        </div>

        {/* ── TAB CONTENT: Projects ── */}
        {activeTab === "projects" && (
          <div>
            {/* Header Row: Description + Link */}
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between mb-5">
              <p className="text-gray-400 text-xs mt-0.5 font-medium">
                The Perfect Project Hub for your next home
              </p>
              <Link
                href="/search"
                className="text-red-600 font-extrabold text-xs hover:underline flex items-center gap-1"
              >
                View all Projects →
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-10 text-gray-500 font-medium">
                No recommended projects available at the moment.
              </div>
            ) : (
              <>
                {/* Mobile View Slider */}
                <div className="block md:hidden relative w-full group/slider">
                  <div
                    ref={mobileScrollContainerRef}
                    onScroll={(e) => {
                      const container = e.target;
                      const card = container.querySelector(
                        ".project-card-wrapper",
                      );
                      if (card) {
                        const cardWidth = card.clientWidth + 24;
                        const index = Math.round(
                          container.scrollLeft / cardWidth,
                        );
                        setProjectActiveIndex(index);
                      }
                    }}
                    className="flex gap-6 overflow-x-auto scrollbar-none pb-4 scroll-smooth w-full px-4 -mx-4"
                  >
                    {projects.map((project) => (
                      <div
                        key={project._id}
                        className="project-card-wrapper w-[300px] sm:w-[340px] shrink-0"
                      >
                        <Cards
                          project={project}
                          layout="new-project-horizontal"
                        />
                      </div>
                    ))}
                  </div>

                  {projects.length > 1 && (
                    <div className="flex justify-center items-center gap-1.5 mt-2">
                      {projects.map((_, idx) => {
                        const distance = Math.abs(idx - projectActiveIndex);
                        let sizeClass = "w-1.5 h-1.5";
                        let colorClass = "bg-gray-300";

                        if (distance === 0) {
                          sizeClass = "w-2.5 h-2.5";
                          colorClass = "bg-slate-900";
                        } else if (distance === 1) {
                          sizeClass = "w-2 h-2";
                          colorClass = "bg-slate-450";
                        } else if (distance === 2) {
                          sizeClass = "w-1.5 h-1.5";
                          colorClass = "bg-slate-300/80";
                        } else {
                          sizeClass = "w-1 h-1";
                          colorClass = "bg-slate-200/40";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const container =
                                mobileScrollContainerRef.current;
                              if (container) {
                                const card = container.querySelector(
                                  ".project-card-wrapper",
                                );
                                if (card) {
                                  const cardWidth = card.clientWidth + 24;
                                  container.scrollTo({
                                    left: idx * cardWidth,
                                    behavior: "smooth",
                                  });
                                }
                              }
                            }}
                            className={`rounded-full transition-all duration-300 ${sizeClass} ${colorClass} focus:outline-none cursor-pointer`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block w-full">
                  {projects.length <= 4 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      {projects.map((project) => (
                        <div key={project._id} className="w-full">
                          <Cards
                            project={project}
                            layout="new-project-horizontal"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative w-full group/slider md:min-h-[360px]">
                      {/* Navigation Arrows */}
                      <button
                        type="button"
                        onClick={scrollPrev}
                        className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 w-9 h-9 rounded-full border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100 hover:scale-105 active:scale-95"
                        aria-label="Previous slide"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={scrollNext}
                        className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 w-9 h-9 rounded-full border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100 hover:scale-105 active:scale-95"
                        aria-label="Next slide"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </button>

                      {/* Slider Scrollable Area */}
                      <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth w-full px-0 mx-0"
                      >
                        {projectGroups.map((group, idx) => (
                          <div
                            key={idx}
                            className="project-card-wrapper w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6"
                          >
                            {group.map((project) => (
                              <div key={project._id} className="w-full">
                                <Cards
                                  project={project}
                                  layout="new-project-horizontal"
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <style jsx>{`
              .scrollbar-none::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-none {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        )}

        {/* ── TAB CONTENT: Owner Properties ── */}
        {activeTab === "properties" && (
          <div>
            {/* Header Row: Description + Count */}
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between mb-5">
              <p className="text-gray-400 text-xs mt-0.5 font-medium">
                Direct homeowner listings with verified details.
              </p>
              <Link
                href="/search?tab=properties"
                className="text-red-600 font-extrabold text-xs hover:underline flex items-center gap-1"
              >
                View all Properties →
              </Link>
            </div>

            {properties.length === 0 ? (
              <div className="text-center py-10 text-gray-500 font-medium">
                No recommended owner properties available at the moment.
              </div>
            ) : (
              <>
                {/* Mobile View Slider */}
                <div className="block md:hidden relative w-full group/slider">
                  <div
                    ref={mobilePropertiesScrollContainerRef}
                    onScroll={(e) => {
                      const container = e.target;
                      const card = container.querySelector(
                        ".property-card-wrapper",
                      );
                      if (card) {
                        const cardWidth = card.clientWidth + 24;
                        const index = Math.round(
                          container.scrollLeft / cardWidth,
                        );
                        setPropertyActiveIndex(index);
                      }
                    }}
                    className="flex gap-6 overflow-x-auto scrollbar-none pb-4 scroll-smooth w-full px-4 -mx-4"
                  >
                    {properties.map((property) => (
                      <div
                        key={property._id}
                        className="property-card-wrapper w-[300px] sm:w-[340px] shrink-0"
                      >
                        <OwnerPropertyHorizontalCard
                          property={property}
                          setLeadProperty={setLeadProperty}
                          formatPrice={formatPrice}
                        />
                      </div>
                    ))}
                  </div>

                  {properties.length > 1 && (
                    <div className="flex justify-center items-center gap-1.5 mt-2">
                      {properties.map((_, idx) => {
                        const distance = Math.abs(idx - propertyActiveIndex);
                        let sizeClass = "w-1.5 h-1.5";
                        let colorClass = "bg-gray-300";

                        if (distance === 0) {
                          sizeClass = "w-2.5 h-2.5";
                          colorClass = "bg-slate-900";
                        } else if (distance === 1) {
                          sizeClass = "w-2 h-2";
                          colorClass = "bg-slate-450";
                        } else if (distance === 2) {
                          sizeClass = "w-1.5 h-1.5";
                          colorClass = "bg-slate-300/80";
                        } else {
                          sizeClass = "w-1 h-1";
                          colorClass = "bg-slate-200/40";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const container =
                                mobilePropertiesScrollContainerRef.current;
                              if (container) {
                                const card = container.querySelector(
                                  ".property-card-wrapper",
                                );
                                if (card) {
                                  const cardWidth = card.clientWidth + 24;
                                  container.scrollTo({
                                    left: idx * cardWidth,
                                    behavior: "smooth",
                                  });
                                }
                              }
                            }}
                            className={`rounded-full transition-all duration-300 ${sizeClass} ${colorClass} focus:outline-none cursor-pointer`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block w-full">
                  {properties.length <= 4 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      {properties.map((property) => (
                        <div key={property._id} className="w-full">
                          <OwnerPropertyHorizontalCard
                            property={property}
                            setLeadProperty={setLeadProperty}
                            formatPrice={formatPrice}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative w-full group/slider md:min-h-[360px]">
                      {/* Navigation Arrows */}
                      <button
                        type="button"
                        onClick={propertiesScrollPrev}
                        className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 w-9 h-9 rounded-full border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100 hover:scale-105 active:scale-95"
                        aria-label="Previous slide"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={propertiesScrollNext}
                        className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 w-9 h-9 rounded-full border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100 hover:scale-105 active:scale-95"
                        aria-label="Next slide"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </button>

                      <div
                        ref={propertiesScrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth w-full px-0 mx-0"
                      >
                        {propertyGroups.map((group, idx) => (
                          <div
                            key={idx}
                            className="property-card-wrapper w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6"
                          >
                            {group.map((property) => (
                              <div key={property._id} className="w-full">
                                <OwnerPropertyHorizontalCard
                                  property={property}
                                  setLeadProperty={setLeadProperty}
                                  formatPrice={formatPrice}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <style jsx>{`
              .scrollbar-none::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}
      </div>

      {/* Get Owner Details Micro-Modal */}
      <AnimatePresence>
        {leadProperty && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLeadModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full z-[1010] p-6 border border-gray-100"
            >
              <button
                onClick={closeLeadModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <FiX size={20} />
              </button>

              {!leadSubmitted ? (
                /* Contact Request Form */
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="text-center pb-2 border-b border-gray-100">
                    <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 border border-red-100 shadow-inner">
                      <FiUser size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Get Owner Contact Details
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                      Please provide your contact details to connect directly
                      with the homeowner of{" "}
                      <span className="font-semibold text-gray-800">
                        "{leadProperty.title}"
                      </span>
                      .
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bhavesh Patel"
                      value={leadForm.name}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Your Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 99887 76655"
                      value={leadForm.phone}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md transition cursor-pointer active:scale-95"
                  >
                    Reveal Owner Contact Info
                  </button>
                </form>
              ) : (
                /* Owner Details Revealed */
                <div className="text-center space-y-6 py-2">
                  <div>
                    <div className="h-12 w-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-3 border border-green-100 shadow-inner">
                      <FiCheckCircle size={24} className="animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Owner Contact Info
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Direct homeowner credentials revealed. Deal safely!
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left divide-y divide-gray-200/60 text-sm">
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Owner Name</span>
                      <span className="font-semibold text-gray-900">
                        {leadProperty.ownerName || "Direct Poster"}
                      </span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Phone Number</span>
                      <a
                        href={`tel:${leadProperty.ownerPhone}`}
                        className="font-bold text-red-600 hover:underline flex items-center gap-1"
                      >
                        <FiPhone size={12} /> {leadProperty.ownerPhone}
                      </a>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Email Address</span>
                      <a
                        href={`mailto:${leadProperty.ownerEmail}`}
                        className="font-medium text-gray-900 hover:underline flex items-center gap-1"
                      >
                        <FiMail size={12} /> {leadProperty.ownerEmail}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={closeLeadModal}
                    className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-xs font-bold rounded-xl text-gray-700 transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

