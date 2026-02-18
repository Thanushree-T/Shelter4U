"use client";

import React, { useEffect, useState } from 'react';
import ApplyForJob from './ApplyForJob';

// Component to view detailed information for a specific career/job opening
export default function ViewDetailCareer({ id }) {
  // State to hold the career details fetched from API
  const [career, setCareer] = useState(null);

  // useEffect to fetch career data once component mounts or ID changes
  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about/career/${id}`);
        setCareer(await res.json());
      } catch (err) {
        console.error("Failed to fetch career details", err);
      }
    };

    if (id) fetchCareer();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl items-center text-black-500 mb-6">Career Details</h1>

      {/* Job Info Card */}
      <div className="bg-white rounded-2xl p-8 space-y-6">
        {/* Job Title */}
        <h1 className="text-2xl !text-red-600">{career?.position}</h1>

        {/* Job Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
          <div>
            <span className="font-semibold text-gray-500">Employees Needed:</span>
            <p>{career?.employeesNeeded}</p>
          </div>

          <div>
            <span className="font-semibold text-gray-500">Location:</span>
            <p>{career?.location}</p>
          </div>

          <div>
            <span className="font-semibold text-gray-500">Qualification:</span>
            <p>{career?.qualification}</p>
          </div>

          <div>
            <span className="font-semibold text-gray-500">Experience:</span>
            <p>{career?.experience} year(s)</p>
          </div>
        </div>

        {/* Job Description and Skills */}
        <div className="pt-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Job Description</h3>
            <p className="text-gray-800 whitespace-pre-line">{career?.jobDescription}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Skill Requirements</h3>
            <p className="text-gray-800 whitespace-pre-line">{career?.skillRequirement}</p>
          </div>
        </div>
      </div>

      {/* Job Application Form */}
      <ApplyForJob id={id} />
    </div>
  );
}
