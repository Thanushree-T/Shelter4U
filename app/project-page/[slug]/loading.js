// app/project-page/[id]/loading.jsx

import React from 'react';

/**
 * Reusable skeleton for a single card in the sidebar
 * (e.g., Brochure, Inquiry, WhatsApp).
 */
const SidebarCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
  </div>
);

/**
 * Reusable skeleton for a single project card in the
 * "Similar Projects" section at the bottom.
 */
const SimilarProjectCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
    <div className="h-40 bg-gray-200 rounded-lg"></div>
    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  </div>
);

/**
 * Main loading skeleton for the entire Project Detail Page.
 * It mimics all major sections to provide a seamless user experience.
 */
const loading = () => {
  return (
    <div className="bg-gray-50 animate-pulse">
      {/* Hero Slider Skeleton */}
      <div className="w-full h-[60vh] bg-gray-300"></div>

      {/* Main Content Area */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        {/* Navigation Tabs Skeleton */}
        <div className="mb-8 flex items-center justify-center flex-wrap gap-4 border-b border-gray-200 pb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-28"></div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Main Content Skeleton (defaults to "overview" tab) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Highlights Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="h-7 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="h-7 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>

            {/* Layout Plans Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="h-7 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg"></div>
                    <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
            <SidebarCardSkeleton />
          </div>
        </div>

        {/* Similar Projects Skeleton */}
        <div className="mt-16">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SimilarProjectCardSkeleton />
            <SimilarProjectCardSkeleton />
            <SimilarProjectCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;