// app/search/loading.jsx

import React from 'react';

/**
 * A reusable skeleton placeholder for a single project card in the results grid.
 */
const ProjectCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
    <div className="h-48 bg-gray-200 rounded-lg"></div>
    <div className="space-y-3">
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

/**
 * Main loading skeleton for the Search Page.
 * This component provides a visual placeholder that mimics the search header,
 * the filter bar, and the grid of project cards.
 */
const loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-300 rounded-md w-1/2 mx-auto mb-4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
        </div>

        {/* Search & Filter Form Skeleton */}
        <div className="mb-10 w-full">
          {/* Top Search Bar Skeleton */}
          <div className="flex flex-col p-4 bg-white rounded-2xl shadow-lg border border-gray-100 mb-4">
            <div className="flex items-center w-full">
              <div className="h-10 w-10 bg-red-100 rounded-lg mr-3"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>

          {/* Bottom Filter Row Skeleton */}
          <div className="flex flex-col xl:flex-row p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            {/* Filter Item Skeleton (repeated) */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center flex-1 mb-4 xl:mb-0 xl:mx-2">
                <div className="h-10 w-10 bg-red-100 rounded-lg mr-3"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
            {/* Search Button Skeleton */}
            <div className="h-14 bg-red-200 rounded-xl w-full xl:w-40 mt-4 xl:mt-0 xl:ml-6"></div>
          </div>
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Render multiple card skeletons to represent loading results */}
          {[...Array(6)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;