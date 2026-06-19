"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, MapPin } from "lucide-react";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

import ProjectTabSwitcher from "../Components/ProjectPageTabSwitcher.jsx";
import ProjectHeroSlider from "../Components/ProjectPageHeroSilder.jsx";
import ProjectHighlights from "../Components/overview/ProjectHighlights.jsx";
import ProjectDescription from "../Components/overview/ProjectDescription.jsx";
import ProjectLayoutPlans from "../Components/overview/ProjectLayoutPlans.jsx";
import dynamic from "next/dynamic";

const AmenitiesSection = dynamic(
  () => import("../Components/ProjectAmenities.jsx"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
    ),
  },
);
const ProjectGallery = dynamic(
  () => import("../Components/ProjectGallery.jsx"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
    ),
  },
);
const ProjectLocation = dynamic(
  () => import("../Components/ProjectLocation.jsx"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
    ),
  },
);
const ProjectSpecificationTable = dynamic(
  () => import("../Components/ProjectSpecification.jsx"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
    ),
  },
);

const ProjectBrochure = dynamic(
  () => import("../Components/ProjectBroucher.jsx"),
);
const ProjectInquiryCard = dynamic(
  () => import("../Components/ProjectInquiryCard.jsx"),
);
const PropertyEnquiryForm = dynamic(
  () => import("../Components/ProjectEnquiryForm.jsx"),
);
const ProjectChatOnWhatsApp = dynamic(
  () => import("../Components/ProjectChatOnWhatsApp.jsx"),
);
const SimilarProject = dynamic(
  () => import("../../Components/SimilarProject.jsx"),
);

const ProjectClientPage = ({ project }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Slider index
  const [showFullForm, setShowFullForm] = useState(false);

  // Key specifications for the Summary Card
  const unitTypes =
    [
      ...new Set(
        project?.projectSpecification
          ?.map((spec) => spec?.unitType)
          .filter(Boolean) || [],
      ),
    ].join(", ") || "On Request";

  const areaRange =
    project?.minSize && project?.maxSize
      ? `${project.minSize} - ${project.maxSize} ${project.projectSpecification?.[0]?.measurementUnit || "sqft"}`
      : "On Request";

  const possessionStatus =
    [
      ...new Set(
        project?.projectSpecification
          ?.map((spec) => spec?.status)
          .filter(Boolean) || [],
      ),
    ].join(", ") || "On Request";

  const reraVal = project?.reraNumber || "On Request";

  const toggleAmenities = () => setShowAllAmenities(!showAllAmenities);
  const openImageExpanded = (image) => setExpandedImage(image);
  const closeImageExpanded = () => setExpandedImage(null);

  //  Image navigation handlers
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project?.coverImages?.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project?.coverImages?.length - 1 : prev - 1,
    );
  };

  return (
    <div className="bg-gray-50">
      {/* ── Breadcrumbs ── */}
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-white border-b border-gray-150 px-4 py-1.5"
      >
        <ol className="max-w-7xl mx-auto flex flex-wrap items-center gap-1 text-sm text-gray-500">
          {/* Home */}
          <li className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>

          {/* City crumb */}
          {project?.city?.name && (
            <>
              <li className="text-gray-300">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link
                  href={`/search?projectType=${encodeURIComponent(project?.projectType?.[0] || "")}&city=${encodeURIComponent(project.city.name)}`}
                  className="hover:text-red-600 transition-colors"
                >
                  {project?.projectSubType?.[0] === "Apartment"
                    ? "Flat for Sale"
                    : project?.projectSubType?.[0] ===
                        "Bunglows/Villa/Row House"
                      ? "Villa for Sale"
                      : project?.projectSubType?.[0]
                        ? `${project.projectSubType[0]} for Sale`
                        : project?.projectType?.[0]
                          ? `${project.projectType[0]} for Sale`
                          : "Property for Sale"}{" "}
                  in {project.city.name}
                </Link>
              </li>
            </>
          )}

          {/* Area crumb */}
          {project?.area?.name && (
            <>
              <li className="text-gray-300">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link
                  href={`/search?projectType=${encodeURIComponent(project?.projectType?.[0] || "")}&area=${encodeURIComponent(project.area.name)}`}
                  className="hover:text-red-600 transition-colors"
                >
                  {project?.projectSubType?.[0] === "Apartment"
                    ? "Flat for Sale"
                    : project?.projectSubType?.[0] ===
                        "Bunglows/Villa/Row House"
                      ? "Villa for Sale"
                      : project?.projectSubType?.[0]
                        ? `${project.projectSubType[0]} for Sale`
                        : project?.projectType?.[0]
                          ? `${project.projectType[0]} for Sale`
                          : "Property for Sale"}{" "}
                  in {project.area.name}
                </Link>
              </li>
            </>
          )}

          {/* Current project (non-clickable) */}
          <li className="text-gray-300">
            <ChevronRight size={14} />
          </li>
          <li className="font-semibold text-gray-800 break-words">
            {project?.projectName}
          </li>
        </ol>
      </nav>

      {/* Top Header Grid Section */}
      <div className="px-4 pt-3 pb-1.5 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* Column 1 & 2: Responsive Image Slider */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 h-[220px] sm:h-[340px] md:h-[420px] shrink-0">
            <ProjectHeroSlider
              project={project}
              prevImage={prevImage}
              nextImage={nextImage}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          </div>

          {/* Column 3: Premium Property Summary Details Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col justify-between text-left">
            <div>
              {/* Type & Status Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                {Array.isArray(project?.projectType) &&
                  project.projectType.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-red-50 text-red-600 border border-red-100/50 tracking-wider"
                    >
                      {type}
                    </span>
                  ))}
                {Array.isArray(project?.projectSpecification) &&
                  [
                    ...new Set(
                      project?.projectSpecification?.map((spec) => spec.status),
                    ),
                  ]
                    .slice(0, 1)
                    .map((status) => (
                      <span
                        key={status}
                        className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-slate-50 text-gray-500 border border-gray-200/50 tracking-wider"
                      >
                        {status}
                      </span>
                    ))}
              </div>

              {/* Title & Builder */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 mt-2.5 leading-tight tracking-tight">
                {project?.projectName || "Property Details"}
              </h1>
              {project?.builder?.name && (
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                  <span>By</span>
                  <span className="text-red-600 font-black">
                    {project.builder.name}
                  </span>
                </p>
              )}

              {/* Location */}
              {project?.area?.name && (
                <div className="flex items-center text-gray-500 text-xs mt-2 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
                  {/* <svg className="h-4 w-4 text-red-500 mr-2 shrink-0 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg> */}
                  <MapPin size={16} className="text-red-600 mr-2 shrink-0" />
                  <span className="font-semibold break-words">
                    {project.area.name}, {project.city?.name || "Ahmedabad"}
                  </span>
                </div>
              )}

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2.5 mt-3.5 pt-3.5 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    Configurations
                  </span>
                  <span
                    className="text-xs font-bold text-gray-800 mt-1 block break-words"
                    title={unitTypes}
                  >
                    {unitTypes}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    Area Range
                  </span>
                  <span
                    className="text-xs font-bold text-gray-800 mt-1 block break-words"
                    title={areaRange}
                  >
                    {areaRange}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    Possession
                  </span>
                  <span
                    className="text-xs font-bold text-gray-800 mt-1 block break-words"
                    title={possessionStatus}
                  >
                    {possessionStatus}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">
                    RERA Reg.
                  </span>
                  <span
                    className="text-xs font-bold text-gray-800 mt-1 block break-all"
                    title={reraVal}
                  >
                    {reraVal}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              {/* Pricing Display */}
              <div className="flex flex-col mb-4">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider leading-none mb-1">
                  Pricing Range
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight block">
                  {Array.isArray(project?.projectSpecification) &&
                  project?.projectSpecification?.length > 0 &&
                  project?.projectSpecification[0]?.price ? (
                    <>
                      {(() => {
                        const prices = project.projectSpecification
                          .map((s) => parseFloat(s.price))
                          .filter((p) => !isNaN(p) && p > 0);
                        if (prices.length === 0) return "On Request";
                        const min = Math.min(...prices);
                        const max = Math.max(...prices);
                        const formatPriceVal = (num) => {
                          if (num >= 1e7)
                            return `₹ ${(num / 1e7).toFixed(2)} Cr`;
                          if (num >= 1e5)
                            return `₹ ${(num / 1e5).toFixed(2)} Lac`;
                          return `₹ ${num.toLocaleString("en-IN")}`;
                        };
                        return max > min
                          ? `${formatPriceVal(min)} - ${formatPriceVal(max)}`
                          : `${formatPriceVal(min)} onwards`;
                      })()}
                    </>
                  ) : (
                    "On Request"
                  )}
                </span>

                {/* Dynamically calculated rate per sqft */}
                {project?.minPrice > 0 && project?.minSize && (
                  <div className="mt-2 flex items-center justify-start">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold uppercase tracking-wider">
                      ₹{" "}
                      {Math.round(
                        project.minPrice / project.minSize,
                      ).toLocaleString("en-IN")}{" "}
                      / sqft
                    </span>
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => setShowFullForm(true)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition active:scale-[0.97] text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-500/10 hover:shadow-red-500/20 duration-150"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-1.5 max-w-7xl mx-auto">
        {/* Navigation Tabs - Modern Design */}
        <ProjectTabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <>
                {/* Highlights Section */}
                <ProjectHighlights project={project} />

                {/* Description Section */}
                <ProjectDescription project={project} />

                {/* Layout Plans Section */}
                {project?.layoutPlan?.length > 0 && (
                  <ProjectLayoutPlans
                    project={project}
                    setShowFullForm={setShowFullForm}
                  />
                )}
              </>
            )}

            {/* Amenities Tab Content */}
            {activeTab === "amenities" && (
              <AmenitiesSection
                project={project}
                showAllAmenities={showAllAmenities}
                toggleAmenities={toggleAmenities}
              />
            )}

            {/* Gallery Tab Content */}
            {activeTab === "gallery" && (
              <ProjectGallery
                galleryImages={project?.galleryImages}
                openImageExpanded={openImageExpanded}
              />
            )}

            {/* Location Tab Content */}
            {activeTab === "location" && <ProjectLocation project={project} />}

            {/* Project Specifications Table Tab */}
            {activeTab === "specifications" && (
              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <ProjectSpecificationTable
                  specifications={project?.projectSpecification}
                  status={project?.status}
                />
              </div>
            )}
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="space-y-4 lg:space-y-5 lg:sticky lg:top-[90px] h-fit">
            {/* Brochure Download Card */}
            <ProjectBrochure
              project={project}
              setShowFullForm={setShowFullForm}
            />

            {/* Enquire now (Hidden on mobile/tablet since top card and brochure card are primary CTAs) */}
            <div className="hidden lg:block">
              <ProjectInquiryCard setShowFullForm={setShowFullForm} />
            </div>

            {/* Chat on WhatsApp */}
            <ProjectChatOnWhatsApp
              project={project}
              setShowFullForm={setShowFullForm}
            />
          </div>
        </div>

        {/* Similar Projects Section (Lazy Loaded) */}
        <SimilarProject id={project?._id} />
      </div>

      {showFullForm && (
        <PropertyEnquiryForm
          isOpen={showFullForm}
          onClose={() => {
            setShowFullForm(false);
            setFormSubmitted(false); // Reset
          }}
          projectId={project._id}
          projectName={project.projectName}
          onSubmitSuccess={() => setFormSubmitted(true)}
          onSubmitError={(msg) => console.error("Enquiry Error:", msg)}
          formSubmitted={formSubmitted}
        />
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeImageExpanded}
            className="absolute top-6 right-6 bg-gray-800 text-white p-3 rounded-full z-10 hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative w-full max-w-6xl h-[90vh]">
            <Image
              src={
                optimizeCloudinaryUrl(expandedImage?.url, {
                  width: 1400,
                  height: 900,
                }) || "https://placehold.co/600x400?text=Coming+Soon"
              }
              alt="Expanded Image"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectClientPage;
