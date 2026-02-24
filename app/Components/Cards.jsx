"use client";

import Link from "next/link";
import Image from "next/image";
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
  FiBriefcase,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { useState } from "react";

const Cards = ({ project, priority = false }) => {
  const [unit, setUnit] = useState("");

  // Extract necessary fields from the project object
  const {
    projectName,
    minPrice,
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
    ...new Set(project.projectSpecification.map((spec) => spec.unitType)),
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
    await navigator.share({
      title: `Check out this project: ${projectName}`,
      text: `Explore the details of ${projectName} by ${builder?.name} in ${area?.name}.`,
      url: `${window.location.origin}/project-page/${slug}`,
    });
  };

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
        <div className="bg-white overflow-hidden flex flex-col h-full">
          {/* Image section with overlay */}
          <div className="relative h-60 w-full overflow-hidden group">
            <Link
              href={`/project-page/${encodeURIComponent(slug)}`}
              className="w-full h-full block"
            >
              <Image
                src={
                  optimizeCloudinaryUrl(coverImages[0]?.url, {
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
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay for viewing details */}
              <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                <p className="text-white text-center text-sm md:text-base font-medium px-4">
                  Click to view more details about this project
                </p>
              </div>
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
                    {projectSpecification[0]?.measurementUnit || ""}
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
                    {projectType.map((pType) => pType).join(", ")}
                  </p>
                </div>
              </div>

              {/* Optional: Uncomment to show RERA again */}
              {/* <div className="flex items-center">
                <FiCheckCircle className="h-4 w-4 text-red-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">RERA</p>
                  <p className="text-sm font-medium">{reraNumber}</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Action buttons: View Details + Share */}
          <div className="px-5 pb-5 pt-3">
            <div className="flex justify-between">
              <Link
                href={`/project-page/${encodeURIComponent(slug)}`}
                className="text-red-600 text-sm font-medium flex items-center hover:text-red-800 transition-colors"
              >
                <FiEye className="mr-1" /> View Details
              </Link>
              <button
                onClick={(e) => handleShare(e, `${slug}`)}
                className="text-gray-600 text-sm font-medium flex items-center hover:text-gray-800 transition-colors"
              >
                <FiShare2 className="mr-1" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
