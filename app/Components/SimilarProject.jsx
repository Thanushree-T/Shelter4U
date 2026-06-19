"use client";

import { useEffect, useState } from "react";
import Cards from "./Cards.jsx";

export default function SimilarProject({ id }) {
  // Local state to store fetched similar projects
  const [projects, setProjects] = useState([]);

  // Fetch similar projects on component mount or when `id` changes
  useEffect(() => {
    if (!id) return; // Exit if no ID is provided

    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/project-page/${id}/similar`);
        const data = await response.json();

        if (!response.ok) {
          setProjects([]); // Set empty array on fetch error
        } else {
          setProjects(data); // Set fetched projects
        }
      } catch (error) {
        console.error("Error fetching similar projects:", error);
        setProjects([]); // Set empty on any error
      }
    };

    fetchProjects();
  }, [id]); // Run effect when ID changes

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      {/* If there are similar projects, render them in grid */}
      {Array.isArray(projects) && projects.length > 0 ? (
        <>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Similar Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <Cards project={project} />
              </div>
            ))}
          </div>
        </>
      ) : (
        // If no similar projects found, show message
        <div className="text-center py-4">
          <p className="text-base font-medium text-gray-400 italic tracking-wide mt-4">
            No similar projects
          </p>
        </div>
      )}
    </div>
  );
}
