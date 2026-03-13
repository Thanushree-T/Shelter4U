"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
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
        className="w-full bg-gray-50 border-y border-gray-200 shadow-sm px-4 py-2.5"
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
              <li className="text-gray-300"><ChevronRight size={14} /></li>
              <li>
                <Link
                  href={`/search?projectType=${encodeURIComponent(project?.projectType?.[0] || "")}&city=${encodeURIComponent(project.city.name)}`}
                  className="hover:text-red-600 transition-colors"
                >
                  {project?.projectSubType?.[0] === "Apartment" ? "Flat for Sale" : 
                   project?.projectSubType?.[0] === "Bunglows/Villa/Row House" ? "Villa for Sale" :
                   project?.projectSubType?.[0] ? `${project.projectSubType[0]} for Sale` :
                   project?.projectType?.[0] ? `${project.projectType[0]} for Sale` : "Property for Sale"} in {project.city.name}
                </Link>
              </li>
            </>
          )}

          {/* Area crumb */}
          {project?.area?.name && (
            <>
              <li className="text-gray-300"><ChevronRight size={14} /></li>
              <li>
                <Link
                  href={`/search?projectType=${encodeURIComponent(project?.projectType?.[0] || "")}&area=${encodeURIComponent(project.area.name)}`}
                  className="hover:text-red-600 transition-colors"
                >
                  {project?.projectSubType?.[0] === "Apartment" ? "Flat for Sale" : 
                   project?.projectSubType?.[0] === "Bunglows/Villa/Row House" ? "Villa for Sale" :
                   project?.projectSubType?.[0] ? `${project.projectSubType[0]} for Sale` :
                   project?.projectType?.[0] ? `${project.projectType[0]} for Sale` : "Property for Sale"} in {project.area.name}
                </Link>
              </li>
            </>
          )}

          {/* Current project (non-clickable) */}
          <li className="text-gray-300"><ChevronRight size={14} /></li>
          <li className="font-semibold text-gray-800 truncate max-w-[200px] sm:max-w-xs">
            {project?.projectName}
          </li>
        </ol>
      </nav>

      {/*  Hero Slider at the top */}
      <ProjectHeroSlider
        project={project}
        prevImage={prevImage}
        nextImage={nextImage}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      {/* Main Content */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        {/* Navigation Tabs - Modern Design */}
        <ProjectTabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <>
                {/* Highlights Section */}
                <ProjectHighlights project={project} />

                {/* Description Section */}
                <ProjectDescription project={project} />

                {/* Layout Plans Section */}
                <ProjectLayoutPlans
                  project={project}
                  setShowFullForm={setShowFullForm}
                />
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
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <div className="md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-lg font-medium mb-6 text-gray-900">
                      <ProjectSpecificationTable
                        specifications={project?.projectSpecification}
                        status={project?.status}
                      />
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Brochure Download Card */}

            <ProjectBrochure
              project={project}
              setShowFullForm={setShowFullForm}
            />

            {/* Enquire now */}
            <ProjectInquiryCard setShowFullForm={setShowFullForm} />

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
