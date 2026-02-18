"use client";

// Importing React useState hook for managing component state
import { useState } from "react";
// Importing EmailJS library to send emails from the frontend
import emailjs from "emailjs-com";

// ApplyForJob component receives the job ID as a prop
export default function ApplyForJob({ id }) {
  // State to store form field values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    about: "",
    resume: "",
    job: id, // Pre-fill job ID
  });

  // State for storing resume file preview URL
  const [resumePreview, setResumePreview] = useState("");
  // State for storing file validation or upload errors
  const [error, setError] = useState("");
  // State to indicate form submission status (e.g., to disable form while submitting)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles input change for text and file fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // If file input, set file object
    }));
  };

  // Handles file selection for the resume input with validation
  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError(`${file.name} is too large. Maximum size is 5MB.`);
      return false;
    }

    // Ensure only PDF files are accepted
    if (!file.type.startsWith("application/pdf")) {
      setError(`${file.name} is not a PDF file.`);
      return false;
    }

    // If valid file, create preview URL and update state
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setResumePreview(previewUrl);

      setFormData(prev => ({
        ...prev,
        resume: file,
      }));

      // Clear any previous file validation errors
      setError('');
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable form during submission

    // Constructing form data to be sent (especially for file uploads)
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("mobile", formData.mobile);
    submitData.append("about", formData.about);
    submitData.append("job", formData.job);
    submitData.append("resume", formData.resume);

    try {
      // Submit data to backend API endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about/career/${id}`, {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      const data = await res.json();
      const application = data.application;

      // Prepare email content to send via EmailJS
      const emailData = {
        name: application.name,
        email: application.email,
        mobile: application.mobile,
        about: application.about,
        resume: application.resume, 
        jobPosition: application.job?.position || "Not specified",
      };

      // Sending application confirmation email via EmailJS
      await emailjs.send(
        "service_i0h7wzi",     // EmailJS Service ID
        "template_uzk6ma1",    // EmailJS Template ID
        emailData,
        "eLBnFuSkEAEzp1f01"     // EmailJS Public Key
      );

      alert("Application submitted and email sent successfully!");
    } catch (err) {
      console.error("Submission or Email Error:", err);
      alert("Application saved but failed to send email.");
    } finally {
      setIsSubmitting(false); // Re-enable form
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Apply Now</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input Field */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Email Input Field */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Mobile Number Input Field */}
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* About (cover letter / description) Text Area */}
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about yourself"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md resize-none"
        />

        {/* Resume Upload Field */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleResumeChange}
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* Display file validation error if any */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Resume PDF Preview Section */}
        {resumePreview && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resume Preview
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <iframe
                src={resumePreview}
                className="w-full h-96"
                title="Resume Preview"
                style={{ border: 'none' }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
              <span>PDF Preview</span>
              <a
                href={resumePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Open in new tab
              </a>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 text-white px-6 py-2 rounded-md"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}