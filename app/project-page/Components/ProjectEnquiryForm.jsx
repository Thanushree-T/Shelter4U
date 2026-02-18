"use client";

import React, { useState } from "react";
import { MessageSquare, Check, X } from "lucide-react";

const PropertyEnquiryForm = ({
  isOpen,              // Boolean: controls whether the modal is shown
  onClose,             // Function: to close the modal
  projectId,           // String or ID: the current project ID
  projectName,         // String: project name (not used in this form directly)
  onSubmitSuccess,     // Callback: triggered on successful submission
  onSubmitError,       // Callback: triggered on error
  formSubmitted,       // Boolean: whether form was successfully submitted
}) => {
  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    project: projectId,  // Include project ID in submission
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/api/project-page/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit enquiry");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        project: projectId,
      });

      if (onSubmitSuccess) onSubmitSuccess(); // Invoke success callback
    } catch (err) {
      if (onSubmitError) onSubmitError(err.message); // Invoke error callback
    } finally {
      setIsSubmitting(false); // Always reset submitting state
    }
  };

  // Close form and reset fields
  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      project: projectId,
    });
    onClose();
  };

  // Do not render modal if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-2">
      {/* Modal container */}
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          {/* Modal header */}
          <div className="text-center mb-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-1">
              <MessageSquare className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Enquire About This Property
            </h2>
          </div>

          {/* Show success message after form submission */}
          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl text-green-800 mb-2">
                Thank you for your enquiry!
              </h3>
              <p className="text-green-600 mb-4">
                Our agent will contact you shortly.
              </p>
              <button
                onClick={handleClose}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          ) : (
            // Show enquiry form if not submitted
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100"
                  placeholder="Any specific questions?"
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyEnquiryForm;
