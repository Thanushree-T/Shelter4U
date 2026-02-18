"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import InquiryForm from "../Components/InquiryForm.jsx";

const Inquiry = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(), // Optional: add timestamp to form submission
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // On success, clear form and show success message
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
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

            {/* Inquiry form component */}
            <InquiryForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
            />
          </div>

          {/* Right section - Decorative animated image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
            <motion.div
              initial={{ x: "7rem", opacity: 0, rotate: -5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                type: "spring",
                bounce: 0.25,
              }}
              className="relative w-[250px] h-[250px] xs:w-[300px] xs:h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]"
            >
              {/* Image container with border and shadow */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="absolute inset-0 rounded-full overflow-hidden border-4 sm:border-6 md:border-8 border-white shadow-xl sm:shadow-2xl z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Modern luxury home"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </motion.div>

              {/* Floating red orb top-left */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 md:-top-10 md:-left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-red-500 to-rose-600 opacity-20 z-0"
              />

              {/* Floating red orb bottom-right */}
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-bl from-red-400 to-rose-500 opacity-20 z-0"
              />

              {/* Subtle inner grid overlay effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,white)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
