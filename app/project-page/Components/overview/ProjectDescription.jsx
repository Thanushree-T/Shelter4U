"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const AboutProject = ({ project }) => {
  // Toggle states for showing full text
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullUsps, setShowFullUsps] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100">
      {/* Section Heading */}
      <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">
        About This Project
      </h2>

      {/* ---------------- Description ---------------- */}
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-1.5">
        {/* Show full description or just first 5 lines */}
        {showFullDescription
          ? project?.description
          : project?.description?.split("\n").slice(0, 5).join("\n") + "…"}
      </p>

      {/* Toggle Button for Description */}
      {project?.description?.split("\n").length > 5 && (
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="mb-3 text-red-600 font-bold text-sm hover:underline hover:text-red-700 transition cursor-pointer"
        >
          {showFullDescription ? "Read Less" : "Read More"}
        </button>
      )}

      {/* ---------------- USPs ---------------- */}
      {project?.usps && project.usps.length > 0 && (
        <>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 border-t border-gray-50 pt-2.5">
            Unique Selling Points
          </h3>

          {/* USP List with high-density spacing */}
          <ul className="flex flex-col gap-1.5">
            {(showFullUsps ? project.usps : project.usps.slice(0, 3)).map(
              (usp) => (
                <li
                  key={usp}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="break-words" title={usp}>{usp}</span>
                </li>
              )
            )}
          </ul>

          {/* Toggle Button for USPs */}
          {project.usps.length > 3 && (
            <button
              onClick={() => setShowFullUsps(!showFullUsps)}
              className="mt-2.5 text-red-600 font-bold text-sm hover:underline hover:text-red-700 transition cursor-pointer block"
            >
              {showFullUsps ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AboutProject;
