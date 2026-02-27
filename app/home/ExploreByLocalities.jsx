"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * ExploreByLocalities
 *
 * Matches the reference design:
 *  - Red-bordered card section
 *  - Pill tabs for each top locality
 *  - Project names displayed in a multi-column text grid (5 cols on desktop)
 *  - Each name is a clickable link → project detail page
 *  - No builder / price columns
 */
export default function ExploreByLocalities({ localityData = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!localityData || localityData.length === 0) return null;

  const active = localityData[activeIndex];

  return (
    <section
      id="explore-localities"
      className="py-10 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto rounded-xl pb-6 sm:p-8">
        {/* Section heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
          Explore New Projects by Localities
        </h2>

        {/* Locality tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {localityData.map((loc, idx) => (
            <button
              key={loc.areaId}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border cursor-pointer transition-all duration-200 ${
                idx === activeIndex
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-600"
              }`}
            >
              {loc.areaName}
            </button>
          ))}
        </div>

        {/* Project name grid — 2 cols on mobile, 3 on sm, 4 on md, 5 on lg */}
        {active && active.projects.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-3">
            {active.projects.map((project, i) => (
              <Link
                key={project._id}
                href={`/project-page/${encodeURIComponent(project.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium leading-snug truncate cursor-pointer hover:underline transition-colors ${"text-gray-700 hover:text-red-600"}`}
                title={project.projectName}
              >
                {project.projectName}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm py-6 text-center">
            No projects found for this locality.
          </p>
        )}
      </div>
    </section>
  );
}
