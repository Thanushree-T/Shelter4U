"use client";

// Importing the reusable CareerCard component to display job cards
import CareerCard from "./CareerCard";
import { Briefcase } from "lucide-react";

// CareerClient receives a list of career/job objects as a prop
export default function CareerClient({ careers }) {
  return (
    // Animated container for fade-in effect using Framer Motion
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      {/* Hero section with icon and title */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 sm:py-24 text-center flex flex-col justify-center rounded-3xl shadow-2xl border border-gray-800">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-red-800/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex justify-center mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-4 shadow-lg shadow-red-500/30 transform hover:scale-105 transition-transform duration-300">
                <Briefcase className="text-white" size={36} strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 tracking-tight px-4">
              Join Our Mission
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 font-medium">
              Explore open positions and help us transform the real estate
              experience across India.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of job cards */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* If careers list is empty, show fallback message */}
          {careers.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center">
              No careers found.
            </p>
          ) : (
            // Render CareerCard for each job object
            careers.map((career) => (
              <CareerCard
                key={career._id}
                position={career.position}
                employeesNeeded={career.employeesNeeded}
                location={career.location}
                qualification={career.qualification}
                experience={career.experience}
                active={career.active}
                id={career._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
