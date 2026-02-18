// app/loading.jsx

import React from "react";

/**
 * Skeleton for HomeFirstSection
 * Mimics the hero section with a two-column layout: text on the left, search card on the right, and stats at the bottom.
 */
const HomeFirstSectionSkeleton = () => (
  <div className="relative overflow-x-hidden lg:min-h-[100vh] bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-48 relative z-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left content skeleton */}
        <div className="space-y-8 lg:mt-0 pt-10">
          <div className="min-h-[80px] sm:min-h-[150px] space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="space-y-6 max-w-xl">
            <div className="h-10 bg-gray-300/70 rounded-full w-full animate-pulse"></div>
            <div className="h-8 bg-gray-300/70 rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* Right content - Search card skeleton */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full lg:sticky lg:top-20">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-6 animate-pulse"></div>
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/6 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/6 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-400 rounded-lg w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Statistics section skeleton */}
    <div className="absolute bottom-0 left-0 right-0 bg-gray-200/50 py-6 z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="h-8 bg-gray-400 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-400/80 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Skeleton for Recommended Projects Section
 * Shows a header, title, and a grid of three placeholder project cards.
 */
const RecommendedSkeleton = () => (
  <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/6 mt-2 md:mt-0 animate-pulse"></div>
      </div>
      <div className="h-8 bg-gray-400 rounded w-1/2 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4 space-y-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Skeleton for HomeSecondSection
 * Mimics a two-column layout with text on one side and image placeholders on the other.
 */
const HomeSecondSectionSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="mx-auto px-6 sm:px-20 py-12 w-full flex flex-col md:flex-row items-center justify-around sm:gap-10 max-w-8xl">
      {/* Left Text Skeleton */}
      <div className="w-full md:w-2/5 space-y-6 animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-3 pt-2">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded w-1/3 mt-4"></div>
      </div>
      {/* Right Image Skeleton */}
      <div className="w-full md:w-1/2 h-96 relative mt-10 md:mt-0 animate-pulse">
        <div className="w-full h-full bg-gray-300"></div>
        <div className="absolute -bottom-10 right-5 w-48 h-64 bg-gray-400 border-8 border-gray-100 shadow-2xl"></div>
      </div>
    </div>
  </div>
);

/**
 * Skeleton for HomeThirdSection
 * Replicates the layout with a large image placeholder and a text/accordion section.
 */
const HomeThirdSectionSkeleton = () => (
  <section className="w-full mt-10 mb-10 py-8 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-8">
      {/* Image Skeleton */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-full max-w-[35rem] h-[37rem] bg-gray-300 rounded-t-[20rem] animate-pulse"></div>
      </div>
      {/* Text + Accordion Skeleton */}
      <div className="w-full lg:w-1/2 space-y-6 animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="space-y-3 pt-2">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="mt-8 space-y-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 border border-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/**
 * Skeleton for HomeFourthSection
 * Creates a two-column layout for testimonials and a title block.
 */
const HomeFourthSectionSkeleton = () => (
  <div className="w-full bg-gray-100 py-16 px-4 md:px-16">
    <div className="max-w-7xl mx-auto grid gap-12 items-center px-4 lg:grid-cols-2">
      {/* Testimonials Skeleton */}
      <div className="space-y-6 order-2 md:order-1 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`relative flex items-start space-x-4 p-4 w-full md:w-[70%] ${
              index === 1 ? 'bg-white shadow-lg translate-x-0 md:translate-x-24' : 'bg-gray-200'
            } rounded-sm`}
          >
            <div className="bg-gray-400 w-20 h-20 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-3 pt-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
      {/* Text Skeleton */}
      <div className="space-y-6 order-1 md:order-2 animate-pulse">
        <div className="h-12 bg-gray-300 rounded w-full"></div>
        <div className="h-12 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-3 pt-2">
          <div className="h-5 bg-gray-200 rounded w-full mt-4"></div>
          <div className="h-5 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Skeleton for HomeFifthSection
 * A simple layout with a heading and a row of placeholder logos.
 */
const HomeFifthSectionSkeleton = () => (
  <div className="py-16 px-4 sm:px-6 overflow-hidden bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="h-10 bg-gray-300 rounded w-1/2 sm:w-1/3 animate-pulse"></div>
      </div>
      <div className="flex items-center justify-center space-x-8 animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-24 w-40 bg-gray-200 rounded-lg hidden sm:block"></div>
        ))}
        {[...Array(2)].map((_, index) => (
            <div key={index} className="h-24 w-40 bg-gray-200 rounded-lg sm:hidden"></div>
          ))}
      </div>
    </div>
  </div>
);


/**
 * Main Loading Component
 * This component will be automatically rendered by Next.js while the page data is loading.
 * It assembles all the skeleton components in the correct order.
 */
export default function loading() {
  return (
    <>
      <HomeFirstSectionSkeleton />
      <RecommendedSkeleton />
      <HomeSecondSectionSkeleton />
      <HomeThirdSectionSkeleton />
      <HomeFourthSectionSkeleton />
      <HomeFifthSectionSkeleton />
    </>
  );
}