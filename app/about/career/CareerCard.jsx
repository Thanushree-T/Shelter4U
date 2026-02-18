'use client';

import Link from 'next/link';

// CareerCard component to display a job position in a card format
const CareerCard = ({
  position,           // Job title or position name
  employeesNeeded,    // Number of openings
  location,           // Job location
  qualification,      // Required qualifications
  experience,         // Years of experience needed
  active,             // Boolean flag to show/hide the card
  id,                 // Unique job ID for routing
}) => {
  // Do not render the card if the job is not active
  if (!active) return null;

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow space-y-6 min-h-[320px] w-full max-w-[500px] mx-auto">
      {/* Job Position Title */}
      <h2 className="text-2xl font-extrabold text-red-600">{position}</h2>

      {/* Job Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
        <div>
          <span className="font-semibold text-gray-500">Employees Needed:</span>
          <p>{employeesNeeded}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-500">Location:</span>
          <p>{location}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-500">Qualification:</span>
          <p>{qualification}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-500">Experience:</span>
          <p>{experience} year(s)</p>
        </div>
      </div>

      {/* Link to job application details */}
      <Link
        href={`/about/career/${id}`}
        className="inline-block mt-4 px-5 py-2 text-base font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default CareerCard;