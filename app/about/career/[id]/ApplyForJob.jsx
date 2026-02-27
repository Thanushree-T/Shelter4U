"use client";

// Importing React useState hook for managing component state
import { useState } from "react";
// Importing EmailJS library to send emails from the frontend
import emailjs from "emailjs-com";
import { Upload, Send, ExternalLink } from "lucide-react";

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

      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));

      // Clear any previous file validation errors
      setError("");
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
      const res = await fetch(`/api/about/career/${id}`, {
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
        "service_i0h7wzi", // EmailJS Service ID
        "template_uzk6ma1", // EmailJS Template ID
        emailData,
        "eLBnFuSkEAEzp1f01", // EmailJS Public Key
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply Now</h2>
        <p className="text-sm text-gray-500">
          Fill out the form below to apply for this position.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
            Cover Letter / About You
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            placeholder="Why are you a good fit for this role?"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none resize-none"
            required
          />
        </div>

        {/* Resume Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
            Resume (PDF only)
          </label>
          <div className="relative group">
            <div
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl transition-all ${
                resumePreview
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-gray-50/50 hover:bg-red-50/30 hover:border-red-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {!resumePreview && (
                  <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-red-500 transition-colors" />
                )}
                <p className="text-sm text-gray-500 text-center px-4">
                  {resumePreview ? (
                    "Resume attached successfully."
                  ) : (
                    <>
                      <span className="font-semibold text-red-600">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </>
                  )}
                </p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
                disabled={isSubmitting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required={!formData.resume}
              />
            </div>
          </div>
        </div>

        {/* Display file validation error if any */}
        {error && (
          <p className="text-red-500 text-sm font-medium ml-1">{error}</p>
        )}

        {/* Resume PDF Preview Section */}
        {resumePreview && (
          <div className="mt-4 bg-white/50 p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2 pt-1">
              <span>Preview</span>
              <a
                href={resumePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
              >
                Open full <ExternalLink size={12} />
              </a>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <iframe
                src={resumePreview}
                className="w-full h-48"
                title="Resume Preview"
                style={{ border: "none" }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-base font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Submitting Application...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send size={18} />
              <span>Submit Application</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
