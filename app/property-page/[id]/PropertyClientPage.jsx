"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  X,
  Layers,
  Home,
  CheckCircle,
  Phone,
  Mail,
  User,
  Share2,
  Check,
  Compass,
  Grid,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Expand,
  Ruler,
  Calendar,
  Building,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaWhatsapp, FaArrowRight, FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../project-page/style.css";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    position: "absolute",
  }),
};

const PropertyClientPage = ({ property }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Lead / Owner Reveal Form state
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const ratePerSqFt =
    property.price && property.size
      ? Math.round(property.price / property.size)
      : null;

  const formatPrice = (num) => {
    if (!num) return "On Request";
    if (num >= 1e7) {
      return `₹ ${(num / 1e7).toFixed(2)} Cr`;
    } else if (num >= 1e5) {
      return `₹ ${(num / 1e5).toFixed(2)} Lac`;
    }
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const handleShareProperty = async (e) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: `Property for sale: ${property.title}`,
        text: `Explore this property in ${property.area?.name || "Direct Owner"}.`,
        url: window.location.href,
      });
    } catch (err) {
      console.warn("Share failed or not supported:", err);
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (clipErr) {
        console.error("Clipboard copy failed:", clipErr);
      }
    }
  };

  const generateWhatsAppMessage = () => {
    const title = property?.title || "Property";
    const city = property?.city?.name || "";
    const area = property?.area?.name || "";

    return encodeURIComponent(
      `Hello! I'm interested in the property "${title}"${city ? ` in ${city}` : ""}${
        area ? `, ${area}` : ""
      } listed on Shelter4U. Could you please share more details?`,
    );
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/919714512452?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setLeadSubmitted(true);
  };

  const closeLeadModal = () => {
    setLeadModalOpen(false);
    setLeadForm({ name: "", phone: "" });
    setLeadSubmitted(false);
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) =>
      prev === property?.images?.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) =>
      prev === 0 ? property?.images?.length - 1 : prev - 1,
    );
  };

  const toggleAmenities = () => setShowAllAmenities(!showAllAmenities);

  // Specifications table data preparation
  const tableData = [
    {
      bhkConfig: property.bhkType || "N/A",
      type:
        property.propertyType +
        (property.propertySubtype ? ` (${property.propertySubtype})` : ""),
      size: `${property.size || "-"} ${property.areaUnit || "sqft"}`,
      possession: property.ageOfConstruction || "Ready to Move",
      price: formatPrice(property.price),
    },
  ];

  const highlights = [
    {
      icon: Home,
      label: "BHK Config",
      value: property.bhkType || "On Request",
    },
    {
      icon: Ruler,
      label: "Carpet Area",
      value: property.size
        ? `${property.size} ${property.areaUnit || "sqft"}`
        : "On Request",
    },
    {
      icon: Layers,
      label: "Beds & Baths",
      value: property.bedrooms
        ? `${property.bedrooms} Bed / ${property.bathrooms || 0} Bath`
        : "On Request",
    },
    {
      icon: Building,
      label: "Furnishing Status",
      value: property.furnishingStatus || "Unfurnished",
    },
    {
      icon: Grid,
      label: "Parking Spaces",
      value: property.parkingSpaces
        ? `${property.parkingSpaces} Slots`
        : "No slots",
    },
    {
      icon: Calendar,
      label: "Construction Age",
      value: property.ageOfConstruction || "New / Ready",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* ── Breadcrumbs ── */}
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-white border-b border-gray-150 px-4 py-1.5"
      >
        <ol className="max-w-7xl mx-auto flex flex-wrap items-center gap-1 text-sm text-gray-500">
          <li className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>

          {property?.city?.name && (
            <>
              <li className="text-gray-300">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link
                  href={`/search?tab=properties&city=${encodeURIComponent(property.city.name)}`}
                  className="hover:text-red-600 transition-colors"
                >
                  Properties in {property.city.name}
                </Link>
              </li>
            </>
          )}

          {property?.area?.name && (
            <>
              <li className="text-gray-300">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link
                  href={`/search?tab=properties&area=${encodeURIComponent(property.area.name)}`}
                  className="hover:text-red-600 transition-colors"
                >
                  Properties in {property.area.name}
                </Link>
              </li>
            </>
          )}

          <li className="text-gray-300">
            <ChevronRight size={14} />
          </li>
          <li className="font-semibold text-gray-800 break-words">
            {property?.title}
          </li>
        </ol>
      </nav>

      {/* Top Header Grid Section */}
      <div className="px-4 pt-3 pb-1.5 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* Left/Middle Column: Image Slider */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 h-[220px] sm:h-[340px] md:h-[420px] shrink-0 group">
            {property.images && property.images.length > 0 ? (
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentImageIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.25 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -10000) {
                        nextImage();
                      } else if (swipe > 10000) {
                        prevImage();
                      }
                    }}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
                  >
                    <Image
                      src={
                        optimizeCloudinaryUrl(
                          property.images[currentImageIndex]?.url,
                          {
                            width: 1000,
                            height: 600,
                          },
                        ) || "https://placehold.co/600x400?text=Direct+Listing"
                      }
                      alt={
                        property.images[currentImageIndex]?.description ||
                        property.title
                      }
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                      className="object-cover pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Counter Badge */}
                <span className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-md">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm3 2l2.5 3 1.5-1.5L16 12H8l1-4z" />
                  </svg>
                  {property.images.length} Photos
                </span>

                {/* Share Floating Button */}
                <button
                  onClick={handleShareProperty}
                  className="absolute top-4 right-4 z-30 p-2 bg-white/95 hover:bg-white text-gray-500 hover:text-red-600 rounded-full border border-gray-200 shadow-md transition-all duration-200 cursor-pointer backdrop-blur-sm"
                  title="Share Property"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Arrow Controls */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 text-white transition-all cursor-pointer shadow-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 duration-200 z-30"
                      aria-label="Previous image"
                    >
                      <ChevronLeft
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        strokeWidth={2.5}
                      />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 text-white transition-all cursor-pointer shadow-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 duration-200 z-30"
                      aria-label="Next image"
                    >
                      <ChevronRightIcon
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        strokeWidth={2.5}
                      />
                    </button>

                    {/* Dots pagination */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-30">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setDirection(index > currentImageIndex ? 1 : -1);
                            setCurrentImageIndex(index);
                          }}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            index === currentImageIndex
                              ? "bg-red-600 w-3.5 sm:w-4"
                              : "bg-white/60 hover:bg-white w-1.5"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                <Home className="h-12 w-12 text-slate-350 mb-2" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  No Media Available
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Premium Property Details Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col justify-between text-left">
            <div>
              {/* Type, Subtype, Furnishing tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-red-50 text-red-600 border border-red-100/50 tracking-wider">
                  Type: {property.propertyType}
                </span>
                {property.propertySubtype && (
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-slate-50 text-gray-500 border border-gray-200/50 tracking-wider">
                    {property.propertySubtype}
                  </span>
                )}
                {property.furnishingStatus && (
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-slate-50 text-gray-500 border border-gray-200/50 tracking-wider">
                    {property.furnishingStatus}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 mt-2.5 leading-tight tracking-tight">
                {property.title}
              </h1>

              {/* Owner Badge */}
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                <span>By</span>
                <span className="text-red-600 font-black">
                  {property.ownerName || "Direct Owner"}
                </span>
              </p>

              {/* Address / Location */}
              <div className="flex items-center text-gray-550 text-xs mt-2 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
                <MapPin size={16} className="text-red-600 mr-2 shrink-0" />
                <span className="font-semibold break-words">
                  {property.location?.address ||
                    property.address ||
                    "Direct Listing"}
                  , {property.area?.name || "Unknown Area"},{" "}
                  {property.city?.name || "Ahmedabad"}
                </span>
              </div>

              {/* Core Specs Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2.5 mt-3.5 pt-3.5 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    Configuration
                  </span>
                  <span
                    className="text-xs font-bold text-gray-800 mt-1 block"
                    title={property.bhkType}
                  >
                    {property.bhkType} ({property.bedrooms} Beds)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    Total Area
                  </span>
                  <span
                    className="text-xs font-bold text-gray-800 mt-1 block"
                    title={`${property.size} ${property.areaUnit || "sqft"}`}
                  >
                    {property.size} {property.areaUnit || "sqft"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    Baths & Balconies
                  </span>
                  <span className="text-xs font-bold text-gray-800 mt-1 block">
                    {property.bathrooms} Baths • {property.balconies || 0}{" "}
                    Balconies
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    Construction Age
                  </span>
                  <span className="text-xs font-bold text-gray-800 mt-1 block">
                    {property.ageOfConstruction || "New / Ready"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              {/* Pricing Display */}
              <div className="flex flex-col mb-4">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider leading-none mb-1">
                  Listing Price
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight block">
                  {formatPrice(property.price)}
                  {property.priceNegotiable && (
                    <span className="ml-2 inline-block align-middle px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-wider">
                      Negotiable
                    </span>
                  )}
                </span>

                {/* Calculated rate per sqft */}
                {ratePerSqFt && (
                  <div className="mt-2 flex items-center justify-start">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold uppercase tracking-wider">
                      ₹ {ratePerSqFt.toLocaleString("en-IN")} / sqft
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition active:scale-[0.97] text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-500/10 hover:shadow-red-500/20 duration-150"
              >
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content Section */}
      <div className="px-4 py-1.5 max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="mb-3">
          <nav className="flex lg:justify-start overflow-x-auto no-scrollbar space-x-1 bg-gray-100 p-1 rounded-xl md:justify-center">
            {[
              "overview",
              "amenities",
              "gallery",
              "location",
              "specifications",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/40"
                } whitespace-nowrap py-1.5 px-3.5 md:py-2 md:px-6 rounded-lg font-semibold text-xs md:text-sm transition-all duration-150 capitalize cursor-pointer`}
              >
                {tab === "specifications" ? "Price Breakup" : tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column: Tab Panels */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Overview Panel */}
            {activeTab === "overview" && (
              <>
                {/* Property Highlights */}
                <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 text-left">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
                    Property Highlights
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3.5 gap-y-3.5 sm:gap-x-6 sm:gap-y-5">
                    {highlights.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 min-w-0"
                        >
                          <div className="bg-red-50 p-1.5 sm:p-2 rounded-xl text-red-600 shrink-0">
                            <Icon
                              className="h-4 w-4 sm:h-4.5 sm:w-4.5"
                              strokeWidth={1.75}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider leading-none">
                              {item.label}
                            </p>
                            <p
                              className="text-sm font-black text-gray-800 mt-1 leading-tight break-words"
                              title={item.value}
                            >
                              {item.value || "On Request"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 text-left">
                  <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">
                    About This Property
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-1.5">
                    {showFullDescription
                      ? property.description
                      : property.description
                          ?.split("\n")
                          .slice(0, 5)
                          .join("\n") +
                        (property.description?.split("\n").length > 5
                          ? "…"
                          : "")}
                  </p>
                  {property.description?.split("\n").length > 5 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-red-600 font-bold text-sm hover:underline hover:text-red-700 transition cursor-pointer"
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>

                {/* Locality & Building details */}
                <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 text-left">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
                    Locality & Building Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Society/Project
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.societyName || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Floor Level
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.floorNo
                          ? `${property.floorNo} of ${property.totalFloors || "N/A"}`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Lifts on Floor
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.liftsOnFloor !== undefined
                          ? property.liftsOnFloor
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Units on Floor
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.unitsOnFloor !== undefined
                          ? property.unitsOnFloor
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Pin/Zip Code
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.pinCode || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Ownership Type
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.ownershipType || "N/A"}
                      </span>
                    </div>
                  </div>

                  {property.landmark && (
                    <div className="mt-4 p-3 bg-red-50/40 rounded-xl border border-red-100/30">
                      <p className="text-xs text-gray-400 uppercase font-extrabold tracking-wider mb-1">
                        Key Landmark
                      </p>
                      <p className="text-sm font-bold text-red-800">
                        {property.landmark}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Amenities Panel */}
            {activeTab === "amenities" && (
              <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 text-left animate-fade-in">
                <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">
                  Amenities
                </h2>
                {property.amenities && property.amenities.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
                      {(showAllAmenities
                        ? property.amenities
                        : property.amenities.slice(0, 12)
                      ).map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 bg-gray-50 rounded-lg hover:bg-red-55 hover:bg-red-50 transition-colors border border-gray-200"
                        >
                          <div className="bg-red-100 p-1.5 sm:p-2 rounded-lg shrink-0">
                            <Check
                              className="h-4 w-4 sm:h-5 sm:w-5 text-red-600"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-gray-800 font-semibold text-xs sm:text-sm break-words leading-tight">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                    {property.amenities.length > 12 && (
                      <button
                        onClick={toggleAmenities}
                        className="mt-4 text-red-600 hover:text-red-700 font-semibold flex items-center justify-center gap-2 text-sm cursor-pointer"
                      >
                        {showAllAmenities ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            <span>Show Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            <span>Show All Amenities</span>
                          </>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No amenities specified for this property.
                  </p>
                )}
              </div>
            )}

            {/* Gallery Panel */}
            {activeTab === "gallery" && (
              <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 text-left animate-fade-in">
                <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">
                  Property Gallery
                </h2>
                {property.images && property.images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {property.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setExpandedImage(img)}
                        className="relative h-28 sm:h-36 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300 group bg-gray-50"
                      >
                        <Image
                          src={
                            optimizeCloudinaryUrl(img.url, {
                              width: 600,
                              height: 400,
                            }) ||
                            "https://placehold.co/600x400?text=Direct+Listing"
                          }
                          alt={img.description || `Gallery view ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-end p-5 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all">
                          <Expand className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No images available in the gallery.
                  </p>
                )}
              </div>
            )}

            {/* Location Panel */}
            {activeTab === "location" && (
              <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 text-left animate-fade-in">
                <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">
                  Location
                </h2>
                <div className="h-56 sm:h-72 md:h-80 lg:h-[380px] w-full bg-gray-100 rounded-xl mb-3 relative overflow-hidden border border-gray-200">
                  {property.mapLink && property.mapLink.trim() !== "" ? (
                    <iframe
                      src={property.mapLink}
                      width="800"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-slate-400">
                      <Compass className="h-10 w-10 text-slate-350 mb-2" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Map details stored
                      </span>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm text-center px-4">
                        {property.location?.address ||
                          property.address ||
                          "Address details: Ahmedabad, Gujarat, India"}
                      </p>
                    </div>
                  )}
                </div>

                {property.landmark && (
                  <div className="mt-4">
                    <p className="text-gray-700 text-base leading-relaxed">
                      {property.landmark}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Price Breakup / Details Panel */}
            {activeTab === "specifications" && (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100 text-left">
                <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">
                  Price Breakup
                </h2>

                <div className="overflow-x-auto mt-2">
                  <DataTable
                    value={tableData}
                    className="text-sm"
                    showGridlines
                  >
                    <Column field="bhkConfig" header="Units" />
                    <Column field="type" header="Type" />
                    <Column field="size" header="Size" />
                    <Column field="possession" header="Possession" />
                    <Column field="price" header="Price" />
                  </DataTable>
                </div>

                {/* Additional ownership details list */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h3 className="text-base font-semibold mb-3 text-gray-800">
                    Additional Financial Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Maintenance Charges
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.maintenanceCharges > 0
                          ? `₹ ${property.maintenanceCharges.toLocaleString("en-IN")} / ${property.maintenanceType || "Month"}`
                          : "No charges"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Price Negotiability
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.priceNegotiable
                          ? "Yes (Negotiable)"
                          : "Fixed Price"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Brokerage Fee
                      </span>
                      <span className="font-bold text-emerald-600">
                        Zero Brokerage (Direct Owner listing)
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-400 font-semibold">
                        Ownership Type
                      </span>
                      <span className="font-bold text-gray-800">
                        {property.ownershipType || "Freehold"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar Widgets */}
          <div className="space-y-4 lg:space-y-5 lg:sticky lg:top-[90px] h-fit">
            {/* Direct Inquiry Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-left">
              <div className="p-3.5 sm:p-4.5">
                <div className="text-center mb-3">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2.5">
                    <User className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Direct Inquiry
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Get phone & email credentials of the homeowner to connect
                    directly.
                  </p>
                </div>
                <button
                  onClick={() => setLeadModalOpen(true)}
                  className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Get Direct Owner Details</span>
                </button>
              </div>
            </div>

            {/* WhatsApp Contact Widget */}
            <div className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl border-2 border-green-100 overflow-hidden group hover:shadow-xl transition-all duration-300 text-left">
              {/* Decorative background circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/30 to-emerald-100/30 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative p-3.5 sm:p-4.5">
                <div className="flex items-start gap-3 mb-3.5">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-11 h-11 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <FaComments className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">
                      Let's Chat!
                    </h3>
                    <p className="text-gray-500 text-xs leading-normal">
                      Connect instantly via WhatsApp for personalized property
                      assistance
                    </p>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 mb-3 border border-green-100">
                  <div className="flex items-center gap-3 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Online Now</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <span>Avg. response: 2 min</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full group/btn bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-700 hover:via-green-600 hover:to-emerald-600 text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 relative overflow-hidden cursor-pointer"
                >
                  {/* Animated button background sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>

                  <div className="relative flex items-center justify-center gap-2.5">
                    <FaWhatsapp className="h-5.5 w-5.5 group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span>Start WhatsApp Chat</span>
                    <FaArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>

                {/* Trust indicator section */}
                <div className="mt-3.5 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-green-600 text-lg mb-0.5">⚡</div>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                      Instant
                      <br />
                      Connect
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-600 text-lg mb-0.5">🔐</div>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                      100%
                      <br />
                      Secure
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 text-lg mb-0.5">🎯</div>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                      Direct
                      <br />
                      Deal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Image Modal overlay */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-6 right-6 bg-gray-800 text-white p-3 rounded-full z-10 hover:bg-gray-700 transition cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image
              src={expandedImage.url}
              alt={expandedImage.description || "Expanded view"}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Get Owner Details Form Modal */}
      <AnimatePresence>
        {leadModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLeadModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full z-[1010] p-6 border border-gray-100 text-left"
            >
              <button
                onClick={closeLeadModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={20} />
              </button>

              {!leadSubmitted ? (
                /* Contact Request Form */
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="text-center pb-2 border-b border-gray-100">
                    <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 border border-red-100 shadow-inner">
                      <User size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Get Owner Contact Details
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                      Please provide your contact details to connect directly
                      with the homeowner of{" "}
                      <span className="font-semibold text-gray-800">
                        "{property.title}"
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
                      <CheckCircle size={24} className="animate-pulse" />
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
                        {property.ownerName || "Direct Poster"}
                      </span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Phone Number</span>
                      <a
                        href={`tel:${property.ownerPhone}`}
                        className="font-bold text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Phone size={12} /> {property.ownerPhone}
                      </a>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Email Address</span>
                      <a
                        href={`mailto:${property.ownerEmail}`}
                        className="font-medium text-gray-900 hover:underline flex items-center gap-1"
                      >
                        <Mail size={12} /> {property.ownerEmail}
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
    </div>
  );
};

export default PropertyClientPage;

