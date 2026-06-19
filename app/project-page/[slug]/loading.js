// app/project-page/[slug]/loading.js

import React from 'react';

/**
 * Skeleton for Brochure Card
 */
const BrochureSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-4.5 border border-gray-100 space-y-3">
    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
      <div className="bg-gray-200 h-10 w-10 rounded-xl shrink-0"></div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-10 bg-gray-200 rounded-lg w-full mt-2.5"></div>
  </div>
);

/**
 * Skeleton for Inquiry Card
 */
const InquirySkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 sm:p-4.5">
    <div className="text-center mb-3 space-y-2.5">
      <div className="bg-gray-200 w-12 h-12 rounded-full mx-auto"></div>
      <div className="h-5 bg-gray-300 rounded w-2/3 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
  </div>
);

/**
 * Skeleton for WhatsApp Card
 */
const WhatsAppSkeleton = () => (
  <div className="bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 rounded-2xl border-2 border-green-100/50 p-3.5 sm:p-4.5 space-y-3.5">
    <div className="flex items-start gap-3">
      <div className="bg-gray-200 w-11 h-11 rounded-xl shrink-0"></div>
      <div className="flex-1 space-y-1.5">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
    <div className="bg-white/60 rounded-xl p-2 border border-green-100/30">
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="h-10 bg-green-200 rounded-xl w-full"></div>
    <div className="grid grid-cols-3 gap-3 pt-1">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="text-center space-y-1">
          <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Reusable skeleton for a single project card in the
 * "Similar Projects" section at the bottom.
 */
const SimilarProjectCardSkeleton = () => (
  <div className="bg-white border border-gray-150 rounded-xl overflow-hidden flex flex-col h-full space-y-4">
    <div className="h-60 w-full bg-gray-200 animate-pulse"></div>
    <div className="p-5 pb-3 flex-1 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 shrink-0"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 ml-auto"></div>
      </div>
      <div className="grid grid-cols-1 gap-5 pt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded shrink-0"></div>
            <div className="space-y-1.5 flex-1">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex justify-center">
      <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
    </div>
  </div>
);

/**
 * Main loading skeleton for the entire Project Detail Page.
 * It matches the actual layout exactly to prevent CLS.
 */
const loading = () => {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">
      {/* ── Breadcrumbs Skeleton ── */}
      <nav className="w-full bg-white border-b border-gray-150 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <span className="text-gray-300 text-xs">&gt;</span>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <span className="text-gray-300 text-xs">&gt;</span>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </nav>

      {/* Top Header Grid Section */}
      <div className="px-4 pt-3 pb-1.5 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* Column 1 & 2: Responsive Image Slider Skeleton */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-200 h-[220px] sm:h-[340px] md:h-[420px] shrink-0"></div>

          {/* Column 3: Premium Property Summary Details Card Skeleton */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col justify-between text-left">
            <div>
              {/* Type & Status Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <div className="h-5 bg-red-100/50 rounded-md w-16 animate-pulse"></div>
                <div className="h-5 bg-gray-200/60 rounded-md w-24 animate-pulse"></div>
              </div>

              {/* Title & Builder */}
              <div className="h-7 sm:h-8 bg-gray-300 rounded-lg w-3/4 mt-2.5"></div>
              <div className="h-3.5 bg-gray-200 rounded w-1/3 mt-2"></div>

              {/* Location */}
              <div className="h-8 bg-gray-50 border border-gray-100 rounded-lg w-full mt-2.5 flex items-center px-2.5">
                <div className="h-3.5 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2.5 mt-3.5 pt-3.5 border-t border-gray-100">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-7 bg-gray-300 rounded w-2/3"></div>
              <div className="h-6 bg-red-50/50 rounded-lg w-20"></div>
              <div className="h-10 bg-red-200/50 rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 py-1.5 max-w-7xl mx-auto">
        {/* Navigation Tabs Skeleton */}
        <div className="mb-3">
          <div className="flex lg:justify-start overflow-x-auto no-scrollbar space-x-1 bg-gray-100 p-1 rounded-xl md:justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-7 md:h-9 bg-white/80 rounded-lg w-20 md:w-32 shrink-0"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Highlights Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3.5 gap-y-3.5 sm:gap-x-6 sm:gap-y-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5 min-w-0">
                    <div className="bg-red-50/50 p-1.5 sm:p-2 rounded-xl h-8 w-8 shrink-0"></div>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>

            {/* Layout Plans Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="space-y-4 lg:space-y-5 lg:sticky lg:top-[90px] h-fit">
            <BrochureSkeleton />
            <InquirySkeleton />
            <WhatsAppSkeleton />
          </div>
        </div>

        {/* Similar Projects Section Skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
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