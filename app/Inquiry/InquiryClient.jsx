"use client";

import React, { useState } from "react";
import Image from "next/image";
import InquiryForm from "../Components/InquiryForm.jsx";

const InquiryClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/inquiry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        },
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16 p-4">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left section - Inquiry form */}
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:max-w-none">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Inquiry
            </p>
            <p className="text-gray-600 mb-6">
              Our expert will contact you shortly.
            </p>
            <InquiryForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
              submitError={submitError}
            />
          </div>

          {/* Right section - Static image (no animation) */}
          <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative w-[250px] h-[250px] xs:w-[300px] xs:h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 sm:border-8 border-white shadow-2xl z-10">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                    alt="Modern luxury home"
                    fill
                    sizes="(max-width: 640px) 250px, (max-width: 1024px) 450px, 500px"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                </div>
              </div>
              {/* Static decorative orbs */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-600 opacity-20 z-0" />
              <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-bl from-red-400 to-rose-500 opacity-20 z-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryClient;
