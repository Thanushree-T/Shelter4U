'use client'; // Enables client-side features in Next.js

import React from 'react';
import Link from 'next/link';
import Cards from '../Components/Cards.jsx'; // Card component to display individual projects

// Recommended component receives a list of `projects` as a prop
export default function Recommended({ projects = [] }) {
  // If no projects are provided or the array is empty
  if (!projects || projects.length === 0) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>No recommended projects available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Row: Description + Link */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mb-8">
          {/* Description */}
          <p className="text-gray-600 mt-1">
            The Perfect Project Hub for your next home
          </p>

          {/* View All Link */}
          <Link href="/search" className="text-red-600 font-medium hover:underline">
            View all Projects →
          </Link>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommended Projects</h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project._id} // Unique key for each item
              className="hover:shadow-md bg-white rounded-xl shadow-lg"
            >
              {/* Each project is rendered using the reusable Cards component */}
              <Cards project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
