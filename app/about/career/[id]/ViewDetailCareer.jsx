"use client";

import React, { useEffect, useState } from "react";
import ApplyForJob from "./ApplyForJob";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  ArrowLeft,
  CheckCircle2,
  FileText,
} from "lucide-react";
import Link from "next/link";

// Component to view detailed information for a specific career/job opening
export default function ViewDetailCareer({ id }) {
  // State to hold the career details fetched from API
  const [career, setCareer] = useState(null);

  // useEffect to fetch career data once component mounts or ID changes
  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await fetch(`/api/about/career/${id}`);
        setCareer(await res.json());
      } catch (err) {
        console.error("Failed to fetch career details", err);
      }
    };

    if (id) fetchCareer();
  }, [id]);

  if (!career) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/about/career"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Careers
        </Link>

        {/* Job Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Actively Hiring
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 max-w-3xl leading-tight">
              {career.position}
            </h1>

            {/* Job Summary Pills */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2.5 bg-gray-50 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium border border-gray-100 shadow-sm">
                <MapPin size={18} className="text-red-500" />
                <span>{career.location}</span>
              </div>

              <div className="flex items-center gap-2.5 bg-gray-50 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium border border-gray-100 shadow-sm">
                <Briefcase size={18} className="text-red-500" />
                <span>{career.experience} year(s)</span>
              </div>

              <div className="flex items-center gap-2.5 bg-gray-50 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium border border-gray-100 shadow-sm">
                <GraduationCap size={18} className="text-red-500" />
                <span>{career.qualification}</span>
              </div>

              <div className="flex items-center gap-2.5 bg-gray-50 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium border border-gray-100 shadow-sm">
                <Users size={18} className="text-red-500" />
                <span>{career.employeesNeeded} opening(s)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-50 p-3 rounded-2xl">
                  <FileText className="text-red-600" size={28} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Job Description
                </h2>
              </div>
              <div className="prose prose-red prose-lg text-gray-600 max-w-none">
                <p className="whitespace-pre-line leading-relaxed">
                  {career.jobDescription}
                </p>
              </div>
            </div>

            {/* Skill Requirements */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-50 p-3 rounded-2xl">
                  <CheckCircle2 className="text-red-600" size={28} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Skill Requirements
                </h2>
              </div>
              <div className="prose prose-red prose-lg text-gray-600 max-w-none">
                <p className="whitespace-pre-line leading-relaxed">
                  {career.skillRequirement}
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar for Apply Form */}
          <div className="lg:col-span-1 border-gray-100">
            <div className="sticky top-24">
              <ApplyForJob id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
