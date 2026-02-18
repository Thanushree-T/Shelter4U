'use client';

import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiPhoneLine, RiMailLine, RiMapPinLine } from "react-icons/ri";

import InquiryForm from "../Components/InquiryForm.jsx";

export default function ContactUsPage() {
  // State to hold contact details fetched from the backend
  const [contactUs, setContactUs] = useState({
    address: "",
    mail: [],
    contact: [],
    facebookLink: "",
    twitterLink: "",
    instaLink: "",
    embedLink: "",
  });

  // State to manage inquiry form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // State flags for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Use relative API path in dev if base URL is not provided
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  // Fetch footer/contact data on component mount
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/footer`);
        if (!res.ok) throw new Error("Failed to fetch footer data");
        const data = await res.json();
        setContactUs(data.footer || {});
      } catch (err) {
        console.error("Footer fetch failed:", err.message);
      }
    };

    fetchFooter();
  }, []);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        `${baseUrl}/api/inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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
    <div className="w-full min-h-screen bg-gray-100 py-12 px-6 md:px-24 lg:px-32">
      <div className="flex flex-col md:flex-row justify-between w-full">
        {/* Left Section - Contact Info and Social Media */}
        <div className="w-full md:w-1/2 md:pr-8">
          <p className="text-4xl font-bold text-gray-800 mb-4">Contact Us</p>
          <p className="text-gray-500 mb-8">
            Feel free to contact us. We're ready to help you find your dream home.
          </p>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Phone Numbers */}
            <div className="flex items-start gap-4">
              <div className="bg-red-100 text-red-600 text-xl p-3 rounded-md">
                <RiPhoneLine />
              </div>
              <div>
                <h4 className="font-semibold">Phone Number</h4>
                {contactUs.contact.map((phone, i) => (
                  <p key={i} className="text-sm text-gray-500">{phone}</p>
                ))}
              </div>
            </div>

            {/* Email Addresses */}
            <div className="flex flex-wrap md:flex-nowrap items-start gap-4 w-full max-w-2xl">
              <div className="bg-red-100 text-red-600 text-xl p-3 rounded-md flex-shrink-0">
                <RiMailLine />
              </div>
              <div className="flex-1 min-w-[200px]">
                <h4 className="font-semibold text-base md:text-lg">Email Address</h4>
                {contactUs.mail.map((email, i) => (
                  <p key={i} className="text-sm text-gray-500 break-all">{email}</p>
                ))}
              </div>
            </div>

            {/* Office Address */}
            <div className="flex items-start gap-4 sm:col-span-2">
              <div className="bg-red-100 text-red-600 text-xl p-3 rounded-md">
                <RiMapPinLine />
              </div>
              <div>
                <h4 className="font-semibold">Office Address</h4>
                <p className="text-sm text-gray-500">{contactUs.address}</p>
              </div>
            </div>
          </div>

          <hr className="mb-7 text-gray-300" />

          {/* Social Media Icons */}
          <div className="flex items-center text-2xl gap-4 flex-wrap">
            <p className="font-semibold">Social Media</p>
            {contactUs.facebookLink && (
              <a href={contactUs.facebookLink} target="_blank" rel="noopener noreferrer"
                 className="bg-red-100 text-red-600 text-xl p-3 rounded-md">
                <FaFacebookF />
              </a>
            )}
            {contactUs.twitterLink && (
              <a href={contactUs.twitterLink} target="_blank" rel="noopener noreferrer"
                 className="bg-red-100 text-red-600 text-xl p-3 rounded-md">
                <FaTwitter />
              </a>
            )}
            {contactUs.instaLink && (
              <a href={contactUs.instaLink} target="_blank" rel="noopener noreferrer"
                 className="bg-red-100 text-red-600 text-xl p-3 rounded-md">
                <FaInstagram />
              </a>
            )}
          </div>
        </div>

        {/* Right Section - Inquiry Form */}
        <div className="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <div className="rounded-lg p-6 shadow-lg bg-white border border-red-200">
            <InquiryForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
              submitError={submitError}
            />
          </div>
        </div>
      </div>

      {/* Google Map Embed (optional) */}
      {contactUs.embedLink && (
        <div className="w-full mt-8">
          <iframe
            src={contactUs.embedLink}
            className="w-full h-96 rounded-lg shadow-md"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
}
