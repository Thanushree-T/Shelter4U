'use client'; // Enables client-side features like useRouter in Next.js

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomeSecondSection({ data }) {
  const router = useRouter(); // Router hook to programmatically navigate between pages

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Wrapper container for layout and padding */}
      <div className="mx-auto px-6 sm:px-20 py-12 sm:py-16 flex flex-col md:flex-row items-center justify-around sm:gap-10 max-w-8xl">
        
        {/* Left Section - Text Content */}
        <div className="w-full md:w-2/5 text-center md:text-left px-2 sm:px-4 pb-10">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-snug">
            {/* Dynamically inject title and redTitle from props */}
            {data?.title} <span className="text-red-600">{data?.redTitle}</span>
          </h1>

          {/* Supporting paragraph */}
          <p className="text-gray-500 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            {data?.para}
          </p>

          {/* Call-to-action button that navigates to the search page */}
          <button
            onClick={() => router.push('/search')}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded text-sm font-medium"
          >
            See more
          </button>
        </div>

        {/* Right Section - Image Display */}
        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end px-2 sm:px-0">
          
          {/* Main Big Image Container */}
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] h-[350px] sm:h-[400px] md:h-[550px] mr-0 sm:mr-4 md:mr-[90px]">
            <Image
              src={data?.bigImg} // Source URL for main background image
              alt="Modern white apartment building" // Alt text for accessibility
              fill // Fills the parent container
              className="object-cover"
              style={{ objectPosition: 'right top' }} // Align image content
              priority // Preload this image for better performance
            />
          </div>

          {/* Overlay Image Positioned Over the Big Image */}
          <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-5 w-[150px] h-[150px] sm:w-[200px] sm:h-[300px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[450px]">
            <Image
              src={data?.smallImg} // Smaller image overlaid on the larger one
              alt="Modern apartment building with red accents"
              className="object-cover border-[8px] sm:border-[12px] border-white shadow-2xl"
              fill // Fills the parent div
              style={{ objectPosition: 'right bottom' }} // Align to the bottom-right
              priority // Preload this image too
            />
          </div>
        </div>
      </div>
    </div>
  );
}
