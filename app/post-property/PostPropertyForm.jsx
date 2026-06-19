"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiImage,
  FiGrid,
  FiUser,
  FiMapPin,
  FiCheckCircle,
  FiLoader,
  FiChevronRight,
  FiChevronLeft,
  FiDollarSign,
  FiLayers,
  FiActivity,
  FiCheck,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const subtypeOptions = {
  Apartment: ["Flat", "Penthouse", "Studio", "Duplex"],
  House: ["Independent House", "Row House"],
  Villa: ["Villa", "Bungalow"],
  Commercial: ["Office Space", "Showroom", "Shop", "Warehouse"],
  Land: ["Residential Plot", "Industrial Plot", "Agricultural Land"],
};

const amenityOptions = [
  { label: "Security & Gated", value: "Security" },
  { label: "CCTV Surveillance", value: "CCTV" },
  { label: "Piped Gas", value: "Piped Gas" },
  { label: "Power Backup", value: "Power Backup" },
  { label: "Elevators", value: "Lift" },
  { label: "Reserved Parking", value: "Parking" },
  { label: "Fitness Center", value: "Gym" },
  { label: "Swimming Pool", value: "Swimming Pool" },
  { label: "Children's Play Area", value: "Kids Play Area" },
  { label: "Club House", value: "Club House" },
  { label: "Fire Safety", value: "Fire Safety" },
  { label: "Water Storage", value: "Water Storage" },
];

export default function PostPropertyForm({
  areas = [],
  cities = [],
  states = [],
}) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bhkType: "2BHK",
    price: "",
    size: "",
    bedrooms: "2",
    bathrooms: "2",
    propertyType: "Apartment",
    address: "",
    city: cities[0]?._id || "",
    state: states[0]?._id || "",
    area: areas[0]?._id || "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",

    // New fields:
    propertySubtype: "Flat",
    propertyStage: "Ready to Move",
    furnishingStatus: "Semi-Furnished",
    ageOfConstruction: "0-5 Years",
    societyName: "",
    floorNo: "",
    totalFloors: "",
    landmark: "",
    pinCode: "",
    areaType: "Super Builtup Area",
    areaUnit: "Sq-Ft",
    priceNegotiable: false,
    maintenanceCharges: "",
    maintenanceType: "Monthly",
    ownershipType: "Freehold",
    balconies: "1",
    parkingSpaces: "1",
    liftsOnFloor: "1",
    unitsOnFloor: "2",
    overlookingView: [],
    videoLink: "",
    amenities: [],
  });

  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stepErrors, setStepErrors] = useState({});

  const steps = [
    { number: 1, label: "Basics" },
    { number: 2, label: "Location" },
    { number: 3, label: "Price & Size" },
    { number: 4, label: "Specs & Amenities" },
    { number: 5, label: "Media & Contact" },
  ];

  const validateStep = (currentStep = step) => {
    const errors = {};
    if (currentStep === 1) {
      if (!formData.title.trim()) errors.title = "Property Title is required";
      if (!formData.description.trim())
        errors.description = "Description is required";
      if (!formData.propertyType)
        errors.propertyType = "Property Type is required";
      if (!formData.propertySubtype)
        errors.propertySubtype = "Property Subtype is required";
    } else if (currentStep === 2) {
      if (!formData.state) errors.state = "State is required";
      if (!formData.city) errors.city = "City is required";
      if (!formData.area) errors.area = "Area is required";
      if (!formData.address.trim()) errors.address = "Full Address is required";
      if (!formData.pinCode.trim()) errors.pinCode = "Pin Code is required";
    } else if (currentStep === 3) {
      if (!formData.size || Number(formData.size) <= 0)
        errors.size = "Size must be greater than 0";
      if (!formData.price || Number(formData.price) <= 0)
        errors.price = "Asking Price must be greater than 0";
    } else if (currentStep === 4) {
      if (!formData.bedrooms || Number(formData.bedrooms) < 1)
        errors.bedrooms = "Bedrooms count is required";
      if (!formData.bathrooms || Number(formData.bathrooms) < 1)
        errors.bathrooms = "Bathrooms count is required";
    } else if (currentStep === 5) {
      if (!coverImage) errors.coverImage = "Cover image is required";
      if (!formData.ownerName.trim())
        errors.ownerName = "Owner Name is required";
      if (!formData.ownerPhone.trim())
        errors.ownerPhone = "Owner Phone is required";
      if (!formData.ownerEmail.trim())
        errors.ownerEmail = "Owner Email is required";
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(5, prev + 1));
      setError("");
    } else {
      setError(
        "Please fill all required fields correctly before moving to the next step.",
      );
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: val };
      if (name === "propertyType") {
        updated.propertySubtype = subtypeOptions[value]?.[0] || "";
      }
      return updated;
    });

    if (stepErrors[name]) {
      setStepErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleAmenityToggle = (val) => {
    setFormData((prev) => {
      const current = prev.amenities || [];
      const updated = current.includes(val)
        ? current.filter((item) => item !== val)
        : [...current, val];
      return { ...prev, amenities: updated };
    });
  };

  const handleViewToggle = (val) => {
    setFormData((prev) => {
      const current = prev.overlookingView || [];
      const updated = current.includes(val)
        ? current.filter((item) => item !== val)
        : [...current, val];
      return { ...prev, overlookingView: updated };
    });
  };

  const handleImageFile = (e, type) => {
    const files = Array.from(e.target.files);

    if (type === "cover") {
      const file = files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
        setStepErrors((prev) => {
          const copy = { ...prev };
          delete copy.coverImage;
          return copy;
        });
      };
      reader.readAsDataURL(file);
    } else {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(uploadPromises).then((results) => {
        setGalleryImages((prev) => [...prev, ...results]);
      });
    }
  };

  const removeGalleryImage = (idx) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) {
      setError(
        "Please complete all required field validation on the final step.",
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        ...formData,
        coverImageBase64: coverImage,
        galleryImagesBase64: galleryImages,
      };

      const res = await fetch("/api/properties/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(result.error || "A submission error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center"
      >
        <div className="flex justify-center text-green-500 mb-6">
          <FiCheckCircle size={64} className="animate-bounce" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Submission Successful!
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto mb-8">
          Thank you! Your comprehensive property listing has been sent to our
          administrator for review. Once approved, it will automatically appear
          in our "Owner Properties" catalog.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
        >
          Go to Homepage
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* Dynamic Progress Tracker */}
      <div className="bg-gray-50/70 border-b border-gray-100 p-4 sm:p-6 sm:px-10">
        {/* Mobile current step indicator */}
        <div className="sm:hidden text-center mb-3">
          <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest block mb-0.5">
            Step {step} of {steps.length}
          </span>
          <span className="text-xs font-extrabold text-gray-800">
            {steps[step - 1].label}
          </span>
        </div>

        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((s, idx) => (
            <React.Fragment key={s.number}>
              {idx > 0 && (
                <div
                  className={`flex-1 h-0.5 mx-1.5 sm:mx-2 rounded-full transition-all duration-300 ${step >= s.number ? "bg-red-600" : "bg-gray-200"}`}
                />
              )}
              <div className="flex flex-col items-center relative">
                <button
                  type="button"
                  onClick={() => {
                    if (s.number < step) {
                      setStep(s.number);
                    } else if (s.number > step) {
                      let canGo = true;
                      for (let valStep = step; valStep < s.number; valStep++) {
                        if (!validateStep(valStep)) {
                          canGo = false;
                          break;
                        }
                      }
                      if (canGo) setStep(s.number);
                    }
                  }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border transition-all duration-300 cursor-pointer ${
                    step === s.number
                      ? "bg-red-600 text-white border-red-600 shadow-md ring-4 ring-red-500/10"
                      : step > s.number
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {step > s.number ? <FiCheck size={14} /> : s.number}
                </button>
                <span
                  className={`hidden sm:block text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-2 transition-colors duration-300 ${step === s.number ? "text-red-600 font-extrabold" : "text-gray-400"}`}
                >
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-10 space-y-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: PROPERTY BASICS */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <FiHome className="text-red-500" /> Property Overview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. 3 BHK Luxury Apartment at SG Highway"
                    required
                    className={`w-full text-sm border ${stepErrors.title ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                  />
                  {stepErrors.title && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">
                      {stepErrors.title}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property amenities, layout, and nearby attractions..."
                    rows={4}
                    required
                    className={`w-full text-sm border ${stepErrors.description ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                  />
                  {stepErrors.description && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">
                      {stepErrors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {["Apartment", "House", "Villa", "Commercial", "Land"].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Property Subtype *
                  </label>
                  <select
                    name="propertySubtype"
                    value={formData.propertySubtype}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {(subtypeOptions[formData.propertyType] || []).map(
                      (sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    BHK Config *
                  </label>
                  <select
                    name="bhkType"
                    value={formData.bhkType}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {[
                      "1BHK",
                      "2BHK",
                      "3BHK",
                      "4BHK",
                      "5BHK",
                      "6BHK",
                      "7BHK",
                      "Showroom",
                      "Office",
                      "Plot",
                    ].map((bhk) => (
                      <option key={bhk} value={bhk}>
                        {bhk}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Age of Construction
                  </label>
                  <select
                    name="ageOfConstruction"
                    value={formData.ageOfConstruction}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {["New Launch", "0-5 Years", "5-10 Years", "10+ Years"].map(
                      (age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/30">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2.5">
                    Furnishing Status
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {["Unfurnished", "Semi-Furnished", "Fully Furnished"].map(
                      (f) => (
                        <label
                          key={f}
                          className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="furnishingStatus"
                            value={f}
                            checked={formData.furnishingStatus === f}
                            onChange={handleChange}
                            className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                          />
                          {f}
                        </label>
                      ),
                    )}
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/30">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2.5">
                    Property Stage
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {["Ready to Move", "Under Construction"].map((stage) => (
                      <label
                        key={stage}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="propertyStage"
                          value={stage}
                          checked={formData.propertyStage === stage}
                          onChange={handleChange}
                          className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                        />
                        {stage}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LOCALITY & ADDRESS */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <FiMapPin className="text-red-500" /> Location Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Society / Project Name
                  </label>
                  <input
                    type="text"
                    name="societyName"
                    value={formData.societyName}
                    onChange={handleChange}
                    placeholder="e.g. Milan Apartment"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {states.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {cities.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Area *
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {areas.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Flat No, Building, Society name, Street..."
                    required
                    className={`w-full text-sm border ${stepErrors.address ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                  />
                  {stepErrors.address && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">
                      {stepErrors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Floor No
                  </label>
                  <input
                    type="text"
                    name="floorNo"
                    value={formData.floorNo}
                    onChange={handleChange}
                    placeholder="e.g. 4th-floor, Ground"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Total Floors in Building
                  </label>
                  <input
                    type="number"
                    name="totalFloors"
                    value={formData.totalFloors}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    min="1"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Pin Code *
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="e.g. 380015"
                    required
                    className={`w-full text-sm border ${stepErrors.pinCode ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                  />
                  {stepErrors.pinCode && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">
                      {stepErrors.pinCode}
                    </p>
                  )}
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Landmark / Directions
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="e.g. Behind Shalby Hospital"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SIZE, PRICING & LEGAL */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <FiDollarSign className="text-red-500" /> Pricing & Area Size
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Area Size *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="e.g. 133"
                      required
                      className={`w-full text-sm border ${stepErrors.size ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                    />
                    <select
                      name="areaUnit"
                      value={formData.areaUnit}
                      onChange={handleChange}
                      className="w-32 text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    >
                      <option value="Sq-Ft">Sq-Ft</option>
                      <option value="Sq-Yrd">Sq-Yrd</option>
                      <option value="Sq-Mt">Sq-Mt</option>
                    </select>
                  </div>
                  {stepErrors.size && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">
                      {stepErrors.size}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Area Type
                  </label>
                  <select
                    name="areaType"
                    value={formData.areaType}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {["Super Builtup Area", "Builtup Area", "Carpet Area"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Asking Price (INR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 7000000"
                    required
                    className={`w-full text-sm border ${stepErrors.price ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                  />
                  {stepErrors.price && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">
                      {stepErrors.price}
                    </p>
                  )}
                  {formData.price && formData.size && (
                    <span className="block text-xs font-medium text-gray-400 mt-1.5 pl-1">
                      Rate: ~₹
                      {Math.round(
                        Number(formData.price) / Number(formData.size),
                      )}{" "}
                      per {formData.areaUnit}
                    </span>
                  )}
                </div>

                <div className="flex items-center pl-2 pt-6">
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="priceNegotiable"
                      checked={formData.priceNegotiable}
                      onChange={handleChange}
                      className="w-4.5 h-4.5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                    />
                    Price Negotiable
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Society Maintenance Charges (INR)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="maintenanceCharges"
                      value={formData.maintenanceCharges}
                      onChange={handleChange}
                      placeholder="e.g. 15000"
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                    <select
                      name="maintenanceType"
                      value={formData.maintenanceType}
                      onChange={handleChange}
                      className="w-36 text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                      <option value="One-Time">One-Time</option>
                      <option value="No Maintenance">No Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Ownership Status
                  </label>
                  <select
                    name="ownershipType"
                    value={formData.ownershipType}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  >
                    {[
                      "Freehold",
                      "Leasehold",
                      "Co-operative Society",
                      "Power of Attorney",
                    ].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DETAILED SPECIFICATIONS & AMENITIES */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <FiLayers className="text-red-500" /> Specifications & Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="2"
                    min="1"
                    required
                    className={`w-full text-sm border ${stepErrors.bedrooms ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="2"
                    min="1"
                    required
                    className={`w-full text-sm border ${stepErrors.bathrooms ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-red-500 focus:ring-red-500"} outline-none rounded-xl p-3 bg-gray-50/50`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Balconies
                  </label>
                  <input
                    type="number"
                    name="balconies"
                    value={formData.balconies}
                    onChange={handleChange}
                    placeholder="1"
                    min="0"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Parking Spaces
                  </label>
                  <input
                    type="number"
                    name="parkingSpaces"
                    value={formData.parkingSpaces}
                    onChange={handleChange}
                    placeholder="1"
                    min="0"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Elevators (in Tower)
                  </label>
                  <input
                    type="number"
                    name="liftsOnFloor"
                    value={formData.liftsOnFloor}
                    onChange={handleChange}
                    placeholder="1"
                    min="0"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Flats per Floor
                  </label>
                  <input
                    type="number"
                    name="unitsOnFloor"
                    value={formData.unitsOnFloor}
                    onChange={handleChange}
                    placeholder="2"
                    min="1"
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Overlooking Views */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Overlooking View
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Garden Facing",
                    "Main Road Facing",
                    "Pool Facing",
                    "Clubhouse Facing",
                    "Corner Property",
                  ].map((view) => {
                    const isSelected = (
                      formData.overlookingView || []
                    ).includes(view);
                    return (
                      <button
                        type="button"
                        key={view}
                        onClick={() => handleViewToggle(view)}
                        className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-red-50 text-red-600 border-red-200 shadow-sm"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {view}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="space-y-3">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Amenities & Features
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {amenityOptions.map((a) => {
                    const isSelected = (formData.amenities || []).includes(
                      a.value,
                    );
                    return (
                      <button
                        type="button"
                        key={a.value}
                        onClick={() => handleAmenityToggle(a.value)}
                        className={`flex items-center gap-2 p-3 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-red-500 text-white border-red-500 shadow-md"
                            : "bg-gray-50/50 text-gray-700 border-gray-200 hover:bg-gray-100/50"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center border ${isSelected ? "bg-white text-red-500 border-white" : "border-gray-300 bg-white text-transparent"}`}
                        >
                          <FiCheck size={10} strokeWidth={3} />
                        </div>
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: MEDIA & CONTACT INFORMATION */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <FiImage className="text-red-500" /> Media & Owner Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cover Image */}
                <div className="border border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-red-500/50 transition-colors">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    Cover Image *
                  </span>
                  {coverImage ? (
                    <div className="relative h-44 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverImage(null)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 text-xs hover:bg-red-700 cursor-pointer shadow-lg"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-44 cursor-pointer hover:bg-gray-50 rounded-xl transition-all">
                      <FiImage size={36} className="text-gray-400 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">
                        Click to Upload Cover Image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        JPEG, PNG up to 5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFile(e, "cover")}
                        className="hidden"
                      />
                    </label>
                  )}
                  {stepErrors.coverImage && (
                    <p className="text-red-500 text-xs mt-1.5 font-semibold">
                      {stepErrors.coverImage}
                    </p>
                  )}
                </div>

                {/* Gallery Images */}
                <div className="border border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-red-500/50 transition-colors">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    Gallery Images (Optional)
                  </span>

                  <label className="flex flex-col items-center justify-center h-20 cursor-pointer hover:bg-gray-50 rounded-xl border border-dashed border-gray-200 transition-all mb-4">
                    <FiGrid size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs font-semibold text-gray-600">
                      Select Gallery Files
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageFile(e, "gallery")}
                      className="hidden"
                    />
                  </label>

                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 max-h-24 overflow-y-auto">
                      {galleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative h-12 rounded-lg overflow-hidden border border-gray-100 shadow-inner group"
                        >
                          <img
                            src={img}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Video Walkthrough Link
                  </label>
                  <input
                    type="url"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleChange}
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Owner Contact */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <FiUser className="text-red-500" /> Contact & Listing
                  Ownership *
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      placeholder="e.g. +91 9292929292"
                      required
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      placeholder="e.g. jhon123@gmail.com"
                      required
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex justify-between pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm sm:text-base font-bold rounded-xl transition cursor-pointer"
            >
              <FiChevronLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-bold rounded-xl transition cursor-pointer shadow-md hover:shadow-red-500/10"
            >
              Continue
              <FiChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 sm:px-8 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-bold rounded-xl transition cursor-pointer shadow-lg hover:shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" size={18} />
                  Submitting Property...
                </>
              ) : (
                <>
                  Submit Direct Listing
                  <FiCheckCircle size={18} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

