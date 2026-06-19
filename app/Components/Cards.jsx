"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import PropertyEnquiryForm from "../project-page/Components/ProjectEnquiryForm.jsx";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import {
  FiMapPin,
  FiGrid,
  FiLayers,
  FiHome,
  FiCheckCircle,
  FiEye,
  FiShare2,
  FiGlobe,
} from "react-icons/fi";

// Blue checkmark SVG icon for verification
const VerifiedBadge = () => (
  <svg
    className="w-4 h-4 text-blue-500 fill-current shrink-0"
    viewBox="0 0 24 24"
    style={{ color: "#1d9bf0" }}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const Cards = ({ project, layout = "grid", priority = false }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormSubmitted(false);
  };

  // Extract necessary fields from the project object
  const {
    projectName,
    minPrice,
    maxPrice,
    projectType,
    projectSpecification,
    status,
    coverImages,
    minSize,
    maxSize,
    builder,
    area,
    slug,
    _id,
  } = project;

  // Get unique unit types from project specifications
  const unitTypes = [
    ...new Set(projectSpecification?.map((spec) => spec.unitType) || []),
  ].join(", ");

  // Format price into readable Indian currency units
  const formatToIndianUnits = (num) => {
    if (!num || num <= 0) return "On Request";
    if (num >= 1e7) {
      return `₹ ${(num / 1e7).toFixed(2)} Cr`;
    } else if (num >= 1e5) {
      return `₹ ${(num / 1e5).toFixed(2)} Lac`;
    } else {
      return `₹ ${num.toLocaleString("en-IN")}`;
    }
  };

  // Share button handler using Web Share API
  const handleShare = async (e, slug) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: `Check out this project: ${projectName}`,
        text: `Explore the details of ${projectName} by ${builder?.name} in ${area?.name}.`,
        url: `${window.location.origin}/project-page/${slug}`,
      });
    } catch (err) {
      console.warn("Share failed or not supported:", err);
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/project-page/${slug}`,
        );
        alert("Link copied to clipboard!");
      } catch (clipErr) {
        console.error("Clipboard copy failed:", clipErr);
      }
    }
  };

  const minPriceNum = Number(minPrice);
  const maxPriceNum = Number(maxPrice);
  const minPriceFormatted = formatToIndianUnits(minPriceNum);
  const maxPriceFormatted =
    maxPriceNum && maxPriceNum > minPriceNum ? formatToIndianUnits(maxPriceNum) : null;

  if (layout === "new-project-horizontal") {
    const configText = unitTypes ? unitTypes.split(",")[0] : "Premium";
    const displayTag = `${configText} • ${projectType?.[0] || "Property"}`;

    const handleCardClick = () => {
      if (window.innerWidth < 768) {
        router.push(`/project-page/${encodeURIComponent(slug)}`);
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
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e, slug);
            }}
            className="p-1.5 bg-white/90 hover:bg-white text-gray-500 hover:text-red-600 rounded-full border border-gray-200/80 shadow-sm transition-all duration-200 active:scale-90 cursor-pointer flex items-center justify-center backdrop-blur-sm"
            title="Share Project"
          >
            <FiShare2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Left Section: Cover Image */}
        <div className="relative w-28 md:w-[40%] shrink-0 overflow-hidden group/img bg-gray-50 border-r border-gray-100 min-h-[120px] md:min-h-[160px]">
          <Link
            href={`/project-page/${encodeURIComponent(slug)}`}
            onClick={(e) => {
              if (window.innerWidth < 768) {
                e.preventDefault();
              }
            }}
            className="absolute inset-0 block"
          >
            <Image
              src={
                optimizeCloudinaryUrl(coverImages?.[0]?.url, {
                  width: 600,
                  height: 400,
                }) || "https://placehold.co/600x400?text=Coming+Soon"
              }
              alt={projectName}
              fill
              sizes="(max-width: 768px) 112px, 280px"
              quality={75}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* RERA status overlay */}
          {project.reraNumber && (
            <div className="absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5 z-30">
              <span className="bg-emerald-600 text-white text-[8px] md:text-[9px] font-black uppercase px-1 md:px-1.5 py-0.5 rounded shadow-sm tracking-wider">
                RERA
              </span>
            </div>
          )}

          {/* Status pill overlay - bottom left */}
          {status && (
            <div className="absolute bottom-1.5 left-1.5 md:bottom-2.5 md:left-2.5 z-30">
              <span className="bg-black/75 backdrop-blur-sm text-white text-[8px] md:text-[9px] font-extrabold uppercase px-1 md:px-1.5 py-0.5 rounded shadow-sm tracking-wider whitespace-nowrap">
                {status}
              </span>
            </div>
          )}
        </div>

        {/* Right Section: Content */}
        <div className="flex-1 min-w-0 p-3 md:p-5 flex flex-col justify-between">
          <div className="space-y-0.5 md:space-y-1 text-left">
            {/* BHK & Property Type tag */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[8px] md:text-[9px] font-black text-red-600 bg-red-50 px-1 md:px-1.5 py-0.5 rounded uppercase tracking-wider border border-red-100/50">
                {displayTag}
              </span>
            </div>

            {/* Title with Verified Badge */}
            <div className="flex items-center gap-1 md:gap-1.5 flex-wrap pt-0.5 md:pt-1">
              <Link
                href={`/project-page/${encodeURIComponent(slug)}`}
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    e.preventDefault();
                  }
                }}
                className="group/title inline-block min-w-0"
              >
                <h3 className="text-gray-950 text-xs md:text-base font-extrabold group-hover/title:text-red-600 transition-colors line-clamp-none md:line-clamp-2 leading-snug">
                  {projectName}
                </h3>
              </Link>
              <VerifiedBadge />
            </div>

            {/* Builder and Locality Info row */}
            <div className="flex flex-wrap items-center gap-x-2 pt-0.5 text-[10px] md:text-xs text-gray-500 font-semibold">
              {builder && (
                <span className="hidden md:flex items-center gap-0.5">
                  <FiGlobe className="h-3 w-3 text-red-500 shrink-0" />
                  <span>By {builder.name}</span>
                </span>
              )}
              {area && (
                <span className="flex items-center gap-0.5">
                  <span className="text-gray-400 font-normal hidden md:inline">•</span>
                  <FiMapPin className="h-3 w-3 text-red-600 shrink-0 hidden md:block" />
                  <span>
                    {area.name}{project.city?.name ? `, ${project.city.name}` : ""}
                  </span>
                </span>
              )}
            </div>

            {/* Specifications - Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 bg-gray-50 border border-gray-100 rounded-xl my-2.5 py-1.5 px-1.5 text-xs divide-x divide-gray-200">
              {/* Area */}
              <div className="flex items-center gap-1.5 px-1.5 min-w-0">
                <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                  <FiLayers className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-gray-400 font-extrabold uppercase leading-none">
                    Super Area
                  </p>
                  <p className="text-[10px] font-black text-gray-800 mt-0.5 leading-tight truncate">
                    {minSize && maxSize ? `${minSize}-${maxSize}` : minSize || "-"} {projectSpecification?.[0]?.measurementUnit || "sqft"}
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
                    {unitTypes || "Residential"}
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications - Mobile inline list */}
            <div className="block md:hidden text-[9px] text-gray-400 font-bold mt-0.5">
              {minSize || maxSize ? `${minSize}-${maxSize} sqft` : ""}
              {unitTypes && ` • ${unitTypes.split(",")[0]}`}
            </div>
          </div>

          {/* Pricing & View Details footer */}
          <div className="mt-0.5 md:mt-3 md:pt-3 md:border-t md:border-gray-100 flex items-center justify-between gap-1 w-full">
            {/* Price display */}
            <div className="text-left">
              <span className="text-xs md:text-base font-black text-gray-900 tracking-tight leading-none block">
                {minPriceFormatted === "On Request" ? (
                  "Price On Request"
                ) : (
                  <>
                    {minPriceFormatted}
                    {maxPriceFormatted && ` - ${maxPriceFormatted}`}
                    {!maxPriceFormatted && (
                      <span className="text-[8px] md:text-[10px] text-gray-500 font-semibold ml-0.5 inline-block">
                        onwards
                      </span>
                    )}
                  </>
                )}
              </span>
            </div>

            {/* Action CTAs - Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 gap-2 w-full sm:w-auto shrink-0">
              <Link
                href={`/project-page/${encodeURIComponent(slug)}`}
                className="bg-white hover:bg-slate-50 text-gray-700 hover:text-red-600 font-extrabold text-[10px] uppercase tracking-wider py-2 px-2.5 rounded-lg border border-gray-200 hover:border-red-200 transition active:scale-[0.97] cursor-pointer shadow-sm duration-150 text-center flex items-center justify-center"
              >
                View Details
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 px-2.5 rounded-lg transition active:scale-[0.97] cursor-pointer shadow-sm hover:shadow-red-500/10 duration-150 text-center flex items-center justify-center"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Enquiry Modal - Rendered via Portal to avoid stacking context & transform issues */}
        {isModalOpen &&
          mounted &&
          typeof document !== "undefined" &&
          createPortal(
            <PropertyEnquiryForm
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              projectId={_id}
              projectName={projectName}
              onSubmitSuccess={() => setFormSubmitted(true)}
              onSubmitError={(err) => alert("Enquiry failed: " + err)}
              formSubmitted={formSubmitted}
            />,
            document.body,
          )}
      </div>
    );
  }

  if (layout === "list") {
    // Dynamic description builder similar to MagicBricks description
    const configText = unitTypes ? unitTypes.split(",")[0] : "Premium";
    const titleText = `${configText} ${status || "Ready to Occupy"} ${projectType?.[0] || "Property"} for sale in ${projectName}`;

    const handleCardClick = () => {
      if (window.innerWidth < 768) {
        router.push(`/project-page/${encodeURIComponent(slug)}`);
      }
    };

    return (
      <div
        onClick={handleCardClick}
        className="relative flex flex-row bg-white rounded-2xl overflow-hidden w-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group min-h-[120px] md:h-auto cursor-pointer"
      >
        {/* Floating Share Button in Top-Right */}
        <div className="absolute top-4 right-4 z-40 hidden md:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e, slug);
            }}
            className="p-2 bg-white hover:bg-gray-50 text-gray-500 hover:text-red-600 rounded-full border border-gray-200/80 shadow-sm transition-all duration-200 active:scale-90 cursor-pointer flex items-center justify-center"
            title="Share Property"
          >
            <FiShare2 className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Left Section: Cover Image with dynamic overlays */}
        <div className="relative w-28 md:w-[260px] lg:w-[280px] shrink-0 overflow-hidden group/img bg-gray-50 border-r border-gray-100 min-h-[120px] md:min-h-0">
          <Link
            href={`/project-page/${encodeURIComponent(slug)}`}
            onClick={(e) => {
              if (window.innerWidth < 768) {
                e.preventDefault();
              }
            }}
            className="absolute inset-0 block"
          >
            <Image
              src={
                optimizeCloudinaryUrl(coverImages?.[0]?.url, {
                  width: 600,
                  height: 400,
                }) || "https://placehold.co/600x400?text=Coming+Soon"
              }
              alt={projectName}
              fill
              sizes="(max-width: 768px) 112px, 280px"
              quality={75}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Photos count overlay - exactly like MagicBricks "3+ Photos" */}
          {coverImages && coverImages.length > 0 && (
            <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 z-30 bg-black/60 backdrop-blur-sm text-white text-[8px] md:text-[11px] font-bold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded flex items-center gap-1 shadow-md whitespace-nowrap">
              <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm3 2l2.5 3 1.5-1.5L16 12H8l1-4z" />
              </svg>
              {coverImages.length}+ Photos
            </span>
          )}

          {/* Status pill overlay - bottom left */}
          {status && (
            <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 z-30">
              <span className="bg-black/75 backdrop-blur-sm text-white text-[8px] md:text-[10px] font-extrabold uppercase px-1 md:px-2 py-0.5 rounded shadow-sm tracking-wider whitespace-nowrap">
                {status}
              </span>
            </div>
          )}
        </div>

        {/* Middle Section: Project Details & Horizontal Specs Block */}
        <div className="flex-1 min-w-0 p-3 md:p-6 flex flex-col pr-4 md:pr-14 text-left justify-between">
          <div>
            {/* Title & info row */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <Link
                  href={`/project-page/${encodeURIComponent(slug)}`}
                  onClick={(e) => {
                    if (window.innerWidth < 768) {
                      e.preventDefault();
                    }
                  }}
                  className="group/title inline-block min-w-0"
                >
                  <h3 className="text-gray-900 text-xs md:text-xl font-bold group-hover/title:text-red-600 group-hover/title:underline transition-colors line-clamp-none md:line-clamp-2 leading-snug">
                    {titleText}
                  </h3>
                </Link>
                <div className="flex flex-wrap items-center gap-x-2 pt-0.5 text-[10px] md:text-xs text-gray-500 font-semibold">
                  {builder && (
                    <span className="hidden md:flex items-center gap-1 hover:text-red-600 cursor-pointer">
                      <FiGlobe className="h-3.5 w-3.5 text-red-600 shrink-0" />
                      By {builder.name}
                    </span>
                  )}
                  {area && (
                    <span className="flex items-center gap-0.5">
                      <span className="text-gray-400 font-normal hidden md:inline">•</span>
                      <FiMapPin className="h-3 w-3 text-red-600 shrink-0 hidden md:block" />
                      <span>
                        {area.name}{project.city?.name ? `, ${project.city.name}` : ""}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Premium Grey Specs block with grid (MagicBricks visual layout) */}
            <div className="hidden md:grid grid-cols-3 bg-gray-50 border border-gray-100 rounded-xl my-4 py-2 px-1 text-xs divide-x divide-gray-200">
              {/* Size Specification */}
              <div className="flex items-center gap-1.5 px-1.5 min-w-0">
                <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                  <FiLayers className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] text-gray-400 font-extrabold uppercase leading-none">
                    Super Area
                  </p>
                  <p className="text-[11px] sm:text-xs font-black text-gray-800 mt-0.5 sm:mt-1 leading-tight truncate">
                    {minSize && maxSize
                      ? `${minSize}-${maxSize}`
                      : minSize || "-"}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold leading-none mt-0.5">
                    {projectSpecification?.[0]?.measurementUnit || "sqft"}
                  </p>
                </div>
              </div>

              {/* Status Specification - Truncation Removed */}
              <div className="flex items-center gap-1.5 px-1.5 min-w-0">
                <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                  <FiHome className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] text-gray-400 font-extrabold uppercase leading-none">
                    Status
                  </p>
                  <p
                    className="text-[11px] sm:text-xs font-black text-gray-800 mt-0.5 sm:mt-1 leading-tight"
                    title={status || "Ready to Move"}
                  >
                    {status || "Ready to Move"}
                  </p>
                </div>
              </div>

              {/* Unit Type Specification - Truncation Removed */}
              <div className="flex items-center gap-1.5 px-1.5 min-w-0">
                <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                  <FiGrid className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] text-gray-400 font-extrabold uppercase leading-none">
                    Configuration
                  </p>
                  <p
                    className="text-[11px] sm:text-xs font-black text-gray-800 mt-0.5 sm:mt-1 leading-tight"
                    title={unitTypes}
                  >
                    {unitTypes ? unitTypes : "Residential"}
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications - Mobile inline list */}
            <div className="block md:hidden text-[9px] text-gray-400 font-bold mt-0.5">
              {minSize || maxSize ? `${minSize}-${maxSize} sqft` : ""}
              {unitTypes && ` • ${unitTypes.split(",")[0]}`}
            </div>
          </div>

          {/* Bottom Section: RERA status & View Details */}
          <div className="hidden md:flex mt-auto pt-4 border-t border-gray-100 flex-wrap items-center justify-start gap-x-4 gap-y-2">
            {project.reraNumber && (
              <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-xs shrink-0">
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="truncate max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-none">
                  RERA Registered (No. {project.reraNumber})
                </span>
              </div>
            )}

            <Link
              href={`/project-page/${encodeURIComponent(slug)}`}
              className="text-red-600 font-extrabold text-xs hover:text-red-800 transition-colors uppercase tracking-wider inline-flex items-center gap-1 group/details shrink-0"
            >
              <span>View Project Details</span>
              <span className="transform group-hover/details:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Mobile Price display */}
          <div className="block md:hidden mt-auto">
            <span className="text-xs font-black text-gray-900 tracking-tight leading-none block">
              {minPriceFormatted === "On Request" ? (
                "Price On Request"
              ) : (
                <>
                  {minPriceFormatted}
                  {maxPriceFormatted && ` - ${maxPriceFormatted}`}
                  {!maxPriceFormatted && (
                    <span className="text-[8px] text-gray-500 font-semibold ml-0.5 inline-block">
                      onwards
                    </span>
                  )}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Right Section: Pricing & Call buttons (Divider desktop, vertical alignment) */}
        <div className="hidden md:flex border-t md:border-t-0 md:border-l border-gray-100 flex-col justify-center items-center p-5 w-full md:w-[200px] shrink-0 text-center bg-gray-50/15 relative">
          {/* Price display */}
          <div className="mb-4 flex flex-col items-center">
            <span className="text-2xl font-black text-gray-900 tracking-tight leading-tight block">
              {minPriceFormatted === "On Request" ? (
                "On Request"
              ) : (
                <>
                  {minPriceFormatted}
                  {maxPriceFormatted && (
                    <span className="text-sm font-semibold text-gray-500 block mt-0.5">
                      to {maxPriceFormatted}
                    </span>
                  )}
                </>
              )}
            </span>
            
            {/* Dynamically calculated price per sqft - Premium Accent Pill */}
            {minPrice && minPrice > 0 && minSize && (
              <span className="inline-block mt-2.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold uppercase tracking-wider">
                ₹{Math.round(minPrice / minSize).toLocaleString("en-IN")} / sqft
              </span>
            )}
            
            {/* Zero Brokerage - Premium Styled Tag */}
            <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest mt-2 bg-slate-100/50 px-2 py-0.5 rounded-md inline-block border border-slate-200/30">
              Zero Brokerage
            </p>
          </div>

          {/* Solid Red CTA: Enquire Now */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition active:scale-[0.97] text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-500/10 hover:shadow-red-500/20 duration-150"
          >
            Enquire Now
          </button>
        </div>

        {/* Enquiry Modal - Rendered via Portal to avoid stacking context & transform issues */}
        {isModalOpen &&
          mounted &&
          typeof document !== "undefined" &&
          createPortal(
            <PropertyEnquiryForm
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              projectId={_id}
              projectName={projectName}
              onSubmitSuccess={() => setFormSubmitted(true)}
              onSubmitError={(err) => alert("Enquiry failed: " + err)}
              formSubmitted={formSubmitted}
            />,
            document.body,
          )}
      </div>
    );
  }

  // Fallback / Grid mode (matches previous grid-based aesthetic for Recommended items)
  const price = formatToIndianUnits(minPrice);
  return (
    <div key={_id} className="relative w-full">
      {/* RERA status ribbon */}
      {project.reraNumber && (
        <div className="absolute top-[14.25rem] -left-2 z-10">
          <div className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-sm flex items-center shadow-lg relative">
            <span>{project.reraNumber}</span>
          </div>
          <div
            className="absolute top-full left-1 w-0 h-0"
            style={{
              borderLeft: "7px solid transparent",
              borderTop: "7px solid #dc2626",
              marginLeft: "-1px",
            }}
          ></div>
        </div>
      )}

      {/* Project card layout */}
      <div className="relative w-full overflow-hidden rounded-xl">
        {/* Floating Share Button in Top-Right */}
        <div className="absolute top-4 right-4 z-40">
          <button
            onClick={(e) => handleShare(e, slug)}
            className="p-2 bg-white hover:bg-gray-50 text-gray-500 hover:text-red-600 rounded-full border border-gray-200/80 shadow-sm transition-all duration-200 active:scale-90 cursor-pointer flex items-center justify-center"
            title="Share Property"
          >
            <FiShare2 className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="bg-white overflow-hidden flex flex-col h-full">
          {/* Image section with overlay - hover zoom and overlay removed */}
          <div className="relative h-60 w-full overflow-hidden">
            <Link
              href={`/project-page/${encodeURIComponent(slug)}`}
              className="w-full h-full block"
            >
              <Image
                src={
                  optimizeCloudinaryUrl(coverImages?.[0]?.url, {
                    width: 600,
                    height: 400,
                  }) || "https://placehold.co/600x400?text=Coming+Soon"
                }
                alt={projectName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                quality={75}
                priority={priority}
                loading={priority ? undefined : "lazy"}
                className="object-cover"
              />
            </Link>
          </div>

          {/* Project information section */}
          <div className="p-5 pb-3 flex-1">
            <div className="flex justify-between items-start">
              {/* Project title */}
              <div className="min-h-[3.5rem] w-full mr-4">
                <h3 className="text-gray-900 text-xl font-bold line-clamp-2 h-full">
                  {projectName}
                </h3>
              </div>

              {/* Price display */}
              <div className="text-right flex-shrink-0">
                <div className="text-red-600 text-2xl font-bold flex items-center justify-end">
                  <span>
                    {price === "On Request" ? (
                      "On Request"
                    ) : (
                      <div>
                        {price}
                        <p className="text-sm ml-1">onwards</p>
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Builder and location */}
            <div className="grid grid-cols-2 mb-5">
              <div className="mt-3 flex items-center text-gray-600">
                <FiGlobe className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm">
                  {builder ? builder.name : "Unknown"}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-end text-gray-600">
                <FiMapPin className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm">{area ? area.name : "Unknown"}</span>
              </div>
            </div>

            {/* Details grid: size, units, type */}
            <div className="grid grid-cols-1 gap-5 mt-4">
              {/* Size */}
              <div className="flex items-center">
                <FiLayers className="h-4 w-4 text-red-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Size</p>
                  <p className="text-sm font-medium">
                    {minSize} - {maxSize}{" "}
                    {projectSpecification?.[0]?.measurementUnit || ""}
                  </p>
                </div>
              </div>

              {/* Units */}
              <div className="flex items-center">
                <FiGrid className="h-4 w-4 text-red-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Units</p>
                  <p className="text-sm font-medium">{unitTypes || "-"}</p>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex items-start space-x-2">
                <div className="shrink-0 mt-1">
                  <FiHome className="h-4 w-4 text-red-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium break-words">
                    {projectType?.map((pType) => pType).join(", ") ||
                      "Residential"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons: Centered View Details button */}
          <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex justify-center">
            <Link
              href={`/project-page/${encodeURIComponent(slug)}`}
              className="text-red-600 text-sm font-bold flex items-center hover:text-red-800 transition-colors gap-1 uppercase tracking-wider"
            >
              <FiEye className="w-4 h-4 shrink-0" />
              <span>View Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
