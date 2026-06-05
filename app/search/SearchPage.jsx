"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Cards from "../Components/Cards.jsx";
import InquiryForm from "../Components/InquiryForm.jsx";
import CustomPriceDropdown from "./CustomPriceDropdown.jsx";
import CustomMultiSelectDropdown from "./CustomMultiSelectDropdown.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import {
  FiSearch,
  FiMapPin,
  FiHome,
  FiChevronDown,
  FiGrid,
  FiTag,
  FiClock,
  FiLayers,
  FiArrowUp,
  FiX,
  FiCheck,
  FiVideo,
  FiCompass,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiUser,
  FiShare2,
} from "react-icons/fi";

// Skeleton placeholder shown while client hydrates (matches Cards dimensions)
const CardSkeleton = ({ layout = "grid" }) => {
  if (layout === "list") {
    return (
      <div className="animate-pulse flex flex-row bg-white rounded-2xl overflow-hidden w-full border border-gray-100 shadow-sm min-h-[120px] md:h-auto">
        {/* Left Section: Cover Image placeholder */}
        <div className="w-28 shrink-0 bg-gray-200 border-r border-gray-100 min-h-[120px] md:min-h-0" />

        {/* Middle Section: Details placeholder */}
        <div className="flex-1 min-w-0 p-3 md:p-6 flex flex-col pr-4 md:pr-14 justify-between text-left">
          <div>
            <div className="h-4 md:h-6 bg-gray-200 rounded w-3/4 mb-2 md:mb-3" />
            <div className="flex gap-2 md:gap-4 mb-2">
              <div className="h-3 md:h-4 bg-gray-200 rounded w-16 md:w-24" />
              <div className="h-3 md:h-4 bg-gray-200 rounded w-24 md:w-32" />
            </div>

            {/* Specs Grid block - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-3 bg-gray-50 border border-gray-100 rounded-xl my-4 py-2 px-1 divide-x divide-gray-200">
              <div className="px-2 space-y-1">
                <div className="h-2 bg-gray-200 rounded w-8" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
              <div className="px-2 space-y-1">
                <div className="h-2 bg-gray-200 rounded w-8" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
              <div className="px-2 space-y-1">
                <div className="h-2 bg-gray-200 rounded w-8" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
            </div>

            {/* Specs list placeholder on Mobile */}
            <div className="block md:hidden h-2.5 bg-gray-200 rounded w-1/2 mt-1" />
          </div>

          {/* Bottom Section - Hidden on Mobile */}
          <div className="hidden md:flex mt-auto pt-4 border-t border-gray-100 justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>

          {/* Mobile Price display placeholder */}
          <div className="block md:hidden mt-auto">
            <div className="h-3.5 bg-gray-200 rounded w-20" />
          </div>
        </div>

        {/* Right Section: Pricing & CTA placeholder - Hidden on Mobile */}
        <div className="hidden md:flex border-t md:border-t-0 md:border-l border-gray-100 flex-col justify-center items-center p-5 w-full md:w-[200px] shrink-0 bg-gray-50/10 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-6 bg-gray-200 rounded-full w-28" />
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-9 bg-gray-200 rounded-xl w-full mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse p-4">
      {/* Image placeholder */}
      <div className="bg-gray-200 rounded-lg h-48 w-full mb-4" />
      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      {/* Subtitle */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
      {/* Tags row */}
      <div className="flex gap-2 mb-3">
        <div className="h-6 bg-gray-200 rounded-full w-16" />
        <div className="h-6 bg-gray-200 rounded-full w-20" />
      </div>
      {/* Price */}
      <div className="h-5 bg-gray-200 rounded w-1/3" />
    </div>
  );
};

// Static map — lives outside the component so it's never recreated
const UNIT_TYPES_BY_PROJECT_TYPE = {
  Residential: ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "6BHK", "Villas"],
  Commercial: ["Showroom", "Office"],
  Land: ["Plots"],
  "Penthouse/Villa": ["Penthouse", "Villa"],
  "": [
    "1BHK",
    "2BHK",
    "3BHK",
    "4BHK",
    "5BHK",
    "6BHK",
    "Showroom",
    "Office",
    "Villas",
    "Penthouse",
    "Villa",
    "Plots",
  ],
};

const DynamicSidebar = ({ projects = [], router }) => {
  // 1. Parse pricing bounds
  const prices = projects
    .map((p) => p.minPrice)
    .filter((price) => price && price > 0);
  const minPriceVal = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceVal = prices.length > 0 ? Math.max(...prices) : 0;

  const formatPriceVal = (num) => {
    if (!num) return "";
    if (num >= 1e7) return `₹${(num / 1e7).toFixed(1)} Cr`;
    if (num >= 1e5) return `₹${(num / 1e5).toFixed(0)} Lac`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  // 2. Parse localities
  const uniqueLocalities = [
    ...new Set(projects.map((p) => p.area?.name).filter(Boolean)),
  ].slice(0, 5);

  // 3. Parse configuration pills
  const configsFound = [
    ...new Set(
      projects.flatMap(
        (p) =>
          p.projectSpecification
            ?.map((spec) => spec.unitType)
            .filter(Boolean) || [],
      ),
    ),
  ].slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Search Insights Widget */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h4 className="text-gray-900 font-extrabold text-sm uppercase tracking-wider mb-3">
          Search Analytics
        </h4>

        <div className="flex flex-col gap-3.5 text-xs">
          {/* Matches */}
          <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
              Total Matches
            </span>
            <span className="font-black text-gray-800">
              {projects.length} Projects
            </span>
          </div>

          {/* Pricing Range Found */}
          {minPriceVal > 0 && (
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                Price Bounds
              </span>
              <span className="font-black text-red-600">
                {formatPriceVal(minPriceVal)}{" "}
                {maxPriceVal > minPriceVal
                  ? ` - ${formatPriceVal(maxPriceVal)}`
                  : " onwards"}
              </span>
            </div>
          )}

          {/* Configuration Summary */}
          {configsFound.length > 0 && (
            <div className="py-1.5">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px] block mb-2">
                Configurations Found
              </span>
              <div className="flex flex-wrap gap-1.5">
                {configsFound.map((cfg) => (
                  <span
                    key={cfg}
                    className="bg-red-50 text-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded"
                  >
                    {cfg}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Localities Helper Chips */}
      {uniqueLocalities.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h4 className="text-gray-900 font-extrabold text-sm uppercase tracking-wider mb-2.5">
            Top Localities
          </h4>
          <p className="text-[11px] text-gray-400 font-semibold mb-3 leading-tight">
            Explore matches inside popular locality clusters:
          </p>
          <div className="flex flex-wrap gap-2">
            {uniqueLocalities.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLoading(true);
                  setProjects([]);
                  router.push(`/search?area=${encodeURIComponent(loc)}`);
                }}
                className="bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-100 hover:border-red-100 rounded-lg py-1.5 px-3 text-xs font-bold text-gray-700 transition cursor-pointer active:scale-95 shrink-0"
              >
                {loc} →
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modern Interactive Callback Lead capture Form */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50/20 rounded-2xl border border-red-100 p-5 shadow-sm">
        <div className="flex items-start gap-3 mb-4 border-b border-red-100/50 pb-3">
          <div className="bg-red-100 p-2.5 rounded-xl text-red-600 shrink-0">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-gray-900 font-extrabold text-sm leading-snug">
              Need Property Advice?
            </h4>
            <p className="text-[11px] text-gray-500 font-semibold mt-0.5 leading-snug">
              Talk to our certified neighborhood experts today
            </p>
          </div>
        </div>

        <InquiryForm />
      </div>
    </div>
  );
};

const SearchPageClient = ({ initialProjects = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") === "properties" ||
      searchParams.get("isOwner") === "true"
      ? "properties"
      : "projects",
  );
  const [leadProperty, setLeadProperty] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setLeadSubmitted(true);
  };

  const closeLeadModal = () => {
    setLeadProperty(null);
    setLeadForm({ name: "", phone: "" });
    setLeadSubmitted(false);
  };

  const formatPrice = (num) => {
    if (!num) return "On Request";
    if (num >= 1e7) {
      return `₹ ${(num / 1e7).toFixed(2)} Cr`;
    } else if (num >= 1e5) {
      return `₹ ${(num / 1e5).toFixed(2)} Lac`;
    }
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const handleShareProperty = async (e, property) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: `Check out this property: ${property.title}`,
        text: `Explore the details of ${property.title} in ${property.area?.name || "Direct Owner"}.`,
        url: `${window.location.origin}/property-page/${property._id}`,
      });
    } catch (err) {
      console.warn("Share failed or not supported:", err);
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/property-page/${property._id}`,
        );
        alert("Link copied to clipboard!");
      } catch (clipErr) {
        console.error("Clipboard copy failed:", clipErr);
      }
    }
  };

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [projects, setProjects] = useState(initialProjects);
  const [filters, setFilters] = useState({
    projectType: searchParams.get("projectType") || "",
    projectSubType: searchParams.get("projectSubType") || "",
    status: searchParams.get("status") || "",
    minBudget: searchParams.get("minBudget") || "",
    maxBudget: searchParams.get("maxBudget") || "",
    unitType: searchParams.get("unitType") || "",
    city: searchParams.get("city") || "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const loader = useRef(null);
  const isFetching = useRef(false);
  const [isClient, setIsClient] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [suggestions, setSuggestions] = useState({
    value: "",
    cities: [],
    areas: [],
    projects: [],
  });

  const projectTypeToSubTypes = {
    Residential: ["Apartment", "Bunglows/Villa/Row House", "Penthouse"],
    Commercial: [
      "Office Space",
      "Shop/Showrooms",
      "Warehouse",
      "Industrial Shed",
    ],
    Land: ["Plot"],
  };

  const projectType = ["Residential", "Commercial", "Land"];
  const projectStatus = ["Under Construction", "Ready to Move"];

  const availableSubTypes = useMemo(() => {
    if (filters.projectType && projectTypeToSubTypes[filters.projectType]) {
      return projectTypeToSubTypes[filters.projectType];
    }
    return Object.values(projectTypeToSubTypes).flat();
  }, [filters.projectType]);

  // Direct lookup from the stable constant above the component
  const availableUnitTypes =
    UNIT_TYPES_BY_PROJECT_TYPE[filters.projectType] ??
    UNIT_TYPES_BY_PROJECT_TYPE[""];

  const basePriceOptions = [
    { value: "2500000", label: "25 Lakh" },
    { value: "5000000", label: "50 Lakh" },
    { value: "7500000", label: "75 Lakh" },
    { value: "10000000", label: "1 Crore" },
    { value: "20000000", label: "2 Crore" },
    { value: "30000000", label: "3 Crore" },
    { value: "40000000", label: "4 Crore" },
    { value: "50000000", label: "5 Crore" },
    { value: "60000000", label: "6 Crore" },
    { value: "70000000", label: "7 Crore" },
    { value: "80000000", label: "8 Crore" },
    { value: "90000000", label: "9 Crore" },
    { value: "100000000", label: "10 Crore" },
    { value: "110000000", label: "11 Crore" },
    { value: "120000000", label: "12 Crore" },
    { value: "130000000", label: "13 Crore" },
    { value: "140000000", label: "14 Crore" },
    { value: "150000000", label: "15 Crore" },
  ];

  // *** LOGIC FOR DYNAMICALLY DISABLING OPTIONS ***
  const minPriceOptions = useMemo(() => {
    if (!filters.maxBudget) return basePriceOptions;
    const maxVal = parseInt(filters.maxBudget, 10);
    return basePriceOptions.map((opt) => ({
      ...opt,
      disabled: parseInt(opt.value, 10) >= maxVal,
    }));
  }, [filters.maxBudget]);

  const maxPriceOptions = useMemo(() => {
    if (!filters.minBudget) return basePriceOptions;
    const minVal = parseInt(filters.minBudget, 10);
    return basePriceOptions.map((opt) => ({
      ...opt,
      disabled: parseInt(opt.value, 10) <= minVal,
    }));
  }, [filters.minBudget]);
  // *** END OF LOGIC ***

  const fetchProjects = async (params, isLoadMore = false) => {
    isFetching.current = true;
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      // Reset hasMore immediately so the observer cannot fire while
      // the fresh results are still in-flight.
      setHasMore(false);
    }

    try {
      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();

      // Only enable infinite scroll when there are actual results.
      const nextHasMore = data.hasMore && data.projects.length > 0;

      if (isLoadMore) {
        setProjects((prev) => [...prev, ...data.projects]);
      } else {
        setProjects(data.projects);
      }
      setHasMore(nextHasMore);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
      isFetching.current = false;
    }
  };

  useEffect(() => {
    setProjects(initialProjects);
    setHasMore(initialProjects.length === 12);
    setPage(1);
    isFetching.current = false;
    setLoading(false);
  }, [initialProjects]);

  // Sync state with URL params (e.g. when navigating via Header links)
  useEffect(() => {
    const newFilters = {
      projectType: searchParams.get("projectType") || "",
      projectSubType: searchParams.get("projectSubType") || "",
      status: searchParams.get("status") || "",
      minBudget: searchParams.get("minBudget") || "",
      maxBudget: searchParams.get("maxBudget") || "",
      unitType: searchParams.get("unitType") || "",
      city: searchParams.get("city") || "",
    };
    setFilters(newFilters);
    setSearchQuery(searchParams.get("q") || "");
    const tabFromUrl =
      searchParams.get("tab") === "properties" ||
      searchParams.get("isOwner") === "true"
        ? "properties"
        : "projects";
    setActiveTab(tabFromUrl);
  }, [searchParams]);

  // Load more when page changes
  useEffect(() => {
    if (page > 1 && isClient) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      params.set("limit", "12");
      fetchProjects(params, true);
    }
  }, [page, isClient]);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    // Don't attach the observer at all when there's nothing more to load.
    if (!hasMore || projects.length === 0) return;

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isFetching.current) {
        isFetching.current = true;
        setPage((prev) => prev + 1);
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore, projects.length]);

  const buildQueryString = (newValues) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    return params.toString();
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };

    // Auto-clear price conflicts
    if (
      filterName === "minBudget" &&
      value &&
      newFilters.maxBudget &&
      parseInt(value, 10) >= parseInt(newFilters.maxBudget, 10)
    ) {
      newFilters.maxBudget = "";
    }
    if (
      filterName === "maxBudget" &&
      value &&
      newFilters.minBudget &&
      parseInt(value, 10) <= parseInt(newFilters.minBudget, 10)
    ) {
      newFilters.minBudget = "";
    }

    // When project type changes, reset unitType if it's no longer valid
    if (filterName === "projectType") {
      newFilters.projectSubType = "";
      const allowed =
        UNIT_TYPES_BY_PROJECT_TYPE[value] ?? UNIT_TYPES_BY_PROJECT_TYPE[""];
      if (newFilters.unitType && !allowed.includes(newFilters.unitType)) {
        newFilters.unitType = "";
      }
    }

    setFilters(newFilters);

    if (filterName !== "minBudget" && filterName !== "maxBudget") {
      const newQuery = buildQueryString({
        [filterName]: value,
        // also pass cleared unitType if it was reset
        ...(filterName === "projectType" &&
        newFilters.unitType !== filters.unitType
          ? { unitType: newFilters.unitType }
          : {}),
        // also pass cleared projectSubType if it was reset
        ...(filterName === "projectType" &&
        newFilters.projectSubType !== filters.projectSubType
          ? { projectSubType: newFilters.projectSubType }
          : {}),
        q: "",
      });
      setLoading(true);
      setProjects([]);
      router.push(`/search?${newQuery}`);
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setProjects([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabName);
    params.set("page", "1");
    params.delete("isOwner");
    router.push(`/search?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newQuery = buildQueryString({
      q: searchQuery,
      ...filters,
    });
    setLoading(true);
    setProjects([]);
    router.push(`/search?${newQuery}`);
    setShowSuggestions(false);
  };

  // ... (rest of the component is the same)

  const handleSuggestionClick = (callback) => {
    setShowSuggestions(false);
    callback();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAutocompleteChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length < 2) {
      setSuggestions({ value, areas: [], projects: [], cities: [] });
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await fetch(`/api/search/autocomplete?q=${value}`);
      const data = await res.json();
      setSuggestions({ ...data, value });
      setShowSuggestions(true);
    } catch (err) {
      console.error("Autocomplete error:", err);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 md:py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-1.5 md:mb-4">
            Find Your <span className="text-red-600">Dream</span> Property
          </h1>
          <p className="max-w-2xl mx-auto text-xs md:text-lg text-gray-600">
            With zero brokerage charges
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="mb-6 md:mb-10 w-full">
          <div
            className="flex flex-col p-3 md:p-4 bg-white rounded-2xl shadow-lg border border-gray-100 mb-3 md:mb-4"
            ref={searchRef}
          >
            {/* Search Input */}
            <div className="flex items-center w-full">
              <div className="p-1.5 md:p-2 bg-red-50 rounded-lg mr-2 md:mr-3 shrink-0">
                <FiMapPin className="text-red-600 text-lg" />
              </div>
              <div className="flex flex-col w-full relative">
                <label className="text-[10px] md:text-xs font-medium text-gray-500 mb-0.5 md:mb-1">
                  Search Location, Project, or Area
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="e.g. 'Luxury Villa's in Ahmedabad'"
                  className="text-xs md:text-sm font-medium text-gray-800 focus:outline-none border-b border-gray-200 pb-0.5 md:pb-1 w-full focus:border-red-500 transition-colors"
                  onFocus={() => setShowSuggestions(true)}
                  onChange={handleAutocompleteChange}
                />
                {showSuggestions &&
                  (suggestions.areas.length > 0 ||
                    suggestions.projects.length > 0 ||
                    suggestions.cities.length > 0) && (
                    <div className="z-50 absolute top-full mt-2 w-full bg-white shadow-lg rounded-md max-h-64 overflow-y-auto border border-gray-200">
                      {suggestions.areas.map((area) => (
                        <div
                          key={area._id}
                          onClick={() =>
                            handleSuggestionClick(() => {
                              setLoading(true);
                              setProjects([]);
                              router.push(`/search?area=${area.name}`);
                            })
                          }
                          className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                        >
                          {area.name}
                        </div>
                      ))}
                      {suggestions.cities.map((city) => (
                        <div
                          key={city._id}
                          onClick={() =>
                            handleSuggestionClick(() => {
                              setLoading(true);
                              setProjects([]);
                              router.push(`/search?city=${city.name}`);
                            })
                          }
                          className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                        >
                          {city.name}
                        </div>
                      ))}
                      {suggestions.projects.map((project) => (
                        <div
                          key={project._id}
                          onClick={() =>
                            handleSuggestionClick(() =>
                              router.push(
                                `/project-page/${encodeURIComponent(project._id)}`,
                              ),
                            )
                          }
                          className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                        >
                          {project.projectName}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 xl:flex xl:flex-row p-3 md:p-4 bg-white rounded-2xl shadow-lg border border-gray-100 gap-3 md:gap-4">
            {/* Other Filters */}
            <div className="flex items-center w-full">
              <div className="p-1.5 md:p-2 bg-red-50 rounded-lg mr-1.5 md:mr-2 shrink-0">
                <FiHome className="text-red-600 text-base md:text-xl" />
              </div>
              <div className="flex flex-col w-full relative">
                <label className="text-[10px] md:text-xs font-medium text-gray-500 mb-0.5">
                  Project Type
                </label>
                <select
                  value={filters.projectType}
                  onChange={(e) =>
                    handleFilterChange("projectType", e.target.value)
                  }
                  className="text-xs md:text-sm font-semibold text-gray-800 focus:outline-none rounded-md py-0.5 md:py-1 pl-1 md:pl-3 pr-6 md:pr-8 w-full appearance-none bg-white transition-colors"
                >
                  <option value="">All Types</option>
                  {projectType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="p-1.5 md:p-2 bg-red-50 rounded-lg mr-1.5 md:mr-2 shrink-0">
                <FiLayers className="text-red-600 text-base md:text-xl" />
              </div>
              <div className="flex flex-col w-full relative">
                <label className="text-[10px] md:text-xs font-medium text-gray-500 mb-0.5">
                  Property Sub-Type
                </label>
                <CustomMultiSelectDropdown
                  placeholder="Any"
                  options={availableSubTypes}
                  value={filters.projectSubType}
                  onChange={(value) =>
                    handleFilterChange("projectSubType", value)
                  }
                />
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="p-1.5 md:p-2 bg-red-50 rounded-lg mr-1.5 md:mr-2 shrink-0">
                <FiClock className="text-red-600 text-base md:text-xl" />
              </div>
              <div className="flex flex-col w-full relative">
                <label className="text-[10px] md:text-xs font-medium text-gray-500 mb-0.5">
                  Project Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="text-xs md:text-sm font-semibold text-gray-800 focus:outline-none rounded-md py-0.5 md:py-1 pl-1 md:pl-3 pr-6 md:pr-8 w-full appearance-none bg-white transition-colors"
                >
                  <option value="">All Status</option>
                  {projectStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="p-1.5 md:p-2 bg-red-50 rounded-lg mr-1.5 md:mr-2 shrink-0">
                <FiGrid className="text-red-600 text-base md:text-xl" />
              </div>
              <div className="flex flex-col w-full relative">
                <label className="text-[10px] md:text-xs font-medium text-gray-500 mb-0.5">
                  Unit Type
                </label>
                <select
                  value={filters.unitType}
                  onChange={(e) =>
                    handleFilterChange("unitType", e.target.value)
                  }
                  className="text-xs md:text-sm font-semibold text-gray-800 focus:outline-none rounded-md py-0.5 md:py-1 pl-1 md:pl-3 pr-6 md:pr-8 w-full appearance-none bg-white transition-colors"
                >
                  <option value="">Any</option>
                  {availableUnitTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            {/* Price Range dropdown section - spans 2 cols on mobile */}
            <div className="flex items-center col-span-2 xl:flex-[1.5] w-full">
              <div className="p-1.5 md:p-2 bg-red-50 rounded-lg mr-1.5 md:mr-2 shrink-0">
                <FiTag className="text-red-600 text-base md:text-xl" />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-[10px] md:text-xs font-medium text-gray-500 mb-0.5">
                  Price Range (₹)
                </label>
                <div className="flex items-center w-full space-x-2">
                  <CustomPriceDropdown
                    placeholder="Min Price"
                    options={minPriceOptions}
                    value={filters.minBudget}
                    onChange={(value) => handleFilterChange("minBudget", value)}
                  />
                  <span className="text-gray-400">-</span>
                  <CustomPriceDropdown
                    placeholder="Max Price"
                    options={maxPriceOptions}
                    value={filters.maxBudget}
                    onChange={(value) => handleFilterChange("maxBudget", value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="col-span-2 xl:col-span-1 bg-red-600 text-white px-6 py-2.5 rounded-xl cursor-pointer w-full xl:w-auto xl:ml-6 hover:bg-red-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center font-semibold text-sm md:text-base mt-2 xl:mt-0"
            >
              <FiSearch className="mr-2" />
              Search
            </button>
          </div>
        </form>

        {/* Unified Tab Navigation */}
        <div className="flex border-b border-gray-200 gap-4 md:gap-8 mb-6 md:mb-8 relative select-none">
          <button
            type="button"
            onClick={() => handleTabChange("projects")}
            className={`pb-3 text-sm md:text-lg font-bold border-b-2 cursor-pointer transition-all duration-200 ${
              activeTab === "projects"
                ? "border-slate-900 text-slate-900 font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Trending Projects
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("properties")}
            className={`pb-3 text-sm md:text-lg font-bold border-b-2 cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "properties"
                ? "border-slate-900 text-slate-900 font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <span>Owner Properties</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[8px] font-extrabold uppercase shadow-sm tracking-wide shrink-0">
              New
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Listings */}
          <div className="lg:col-span-3 flex flex-col gap-4 md:gap-6">
            {loading ? (
              /* Show skeletons while fetching */
              [...Array(6)].map((_, i) => (
                <CardSkeleton key={i} layout="list" />
              ))
            ) : projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={project._id} className="w-full">
                  {activeTab === "properties" ? (
                    /* Render Custom Direct Owner Property Card */
                    <div
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          router.push(`/property-page/${project._id}`);
                        }
                      }}
                      className="relative flex flex-row bg-white rounded-2xl overflow-hidden w-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group min-h-[120px] md:h-auto cursor-pointer"
                    >
                      {/* Floating Share Button in Top-Right */}
                      <div className="absolute top-4 right-4 z-40 hidden md:block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareProperty(e, project);
                          }}
                          className="p-2 bg-white hover:bg-gray-50 text-gray-500 hover:text-red-600 rounded-full border border-gray-200/80 shadow-sm transition-all duration-200 active:scale-90 cursor-pointer flex items-center justify-center"
                          title="Share Property"
                        >
                          <FiShare2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      {/* Left Section: Cover Image */}
                      <div className="relative w-28 md:w-[260px] lg:w-[280px] shrink-0 overflow-hidden group/img bg-gray-50 border-r border-gray-100 min-h-[120px] md:min-h-0">
                        <Link
                          href={`/property-page/${project._id}`}
                          onClick={(e) => {
                            if (window.innerWidth < 768) {
                              e.preventDefault();
                            }
                          }}
                          className="absolute inset-0 block cursor-pointer"
                        >
                          <img
                            src={
                              optimizeCloudinaryUrl(project.images?.[0]?.url, {
                                width: 600,
                                height: 400,
                              }) ||
                              "https://placehold.co/600x400?text=Direct+Listing"
                            }
                            alt={project.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover/img:scale-105"
                          />
                        </Link>

                        {/* Photos count overlay */}
                        {project.images && project.images.length > 0 && (
                          <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 z-30 bg-black/60 backdrop-blur-sm text-white text-[8px] md:text-[11px] font-bold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded flex items-center gap-1 shadow-md">
                            <svg
                              className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm3 2l2.5 3 1.5-1.5L16 12H8l1-4z" />
                            </svg>
                            {project.images.length}+ Photos
                          </span>
                        )}
                      </div>

                      {/* Middle Section: Details */}
                      <div className="flex-1 min-w-0 p-3 md:p-6 flex flex-col pr-4 md:pr-14 text-left justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/property-page/${project._id}`}
                                onClick={(e) => {
                                  if (window.innerWidth < 768) {
                                    e.preventDefault();
                                  }
                                }}
                                className="group/title inline-block cursor-pointer min-w-0"
                              >
                                <h3 className="text-gray-900 text-xs md:text-xl font-bold group-hover/title:text-red-600 group-hover/title:underline transition-colors line-clamp-none md:line-clamp-2 leading-snug">
                                  {project.title}
                                </h3>
                              </Link>
                              <div className="flex flex-wrap items-center gap-x-2 pt-0.5 text-[10px] md:text-xs text-gray-500 font-semibold">
                                <span className="hidden md:flex items-center gap-1">
                                  <FiUser className="h-3.5 w-3.5 text-red-600 shrink-0" />
                                  By {project.ownerName || "Direct Owner"}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <span className="text-gray-400 font-normal hidden md:inline">
                                    •
                                  </span>
                                  <FiMapPin className="h-3 h-3 text-red-600 shrink-0 hidden md:block" />
                                  <span>
                                    {project.area?.name || "Unknown Area"},{" "}
                                    {project.city?.name || "Ahmedabad"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Premium Grey Specs block */}
                          <div className="hidden md:grid grid-cols-3 bg-gray-50 border border-gray-100 rounded-xl my-4 py-2 px-1 text-xs divide-x divide-gray-200">
                            {/* Size Specification */}
                            <div className="flex items-center gap-1.5 px-1.5 min-w-0">
                              <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                                <FiLayers className="h-3.5 w-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[8px] sm:text-[9px] text-gray-400 font-extrabold uppercase leading-none">
                                  Carpet Area
                                </p>
                                <p className="text-[11px] sm:text-xs font-black text-gray-800 mt-0.5 sm:mt-1 leading-tight truncate">
                                  {project.size || "-"}
                                </p>
                                <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold leading-none mt-0.5">
                                  {project.areaUnit || "sqft"}
                                </p>
                              </div>
                            </div>

                            {/* Status Specification */}
                            <div className="flex items-center gap-1.5 px-1.5 min-w-0">
                              <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                                <FiHome className="h-3.5 w-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[8px] sm:text-[9px] text-gray-400 font-extrabold uppercase leading-none">
                                  Status
                                </p>
                                <p
                                  className="text-[11px] sm:text-xs font-black text-gray-800 mt-0.5 sm:mt-1 leading-tight"
                                  title={
                                    project.propertyStage || "Ready to Move"
                                  }
                                >
                                  {project.propertyStage || "Ready to Move"}
                                </p>
                              </div>
                            </div>

                            {/* Configuration Specification */}
                            <div className="flex items-center gap-1.5 px-1.5 min-w-0">
                              <div className="p-1 bg-red-50 text-red-600 rounded shrink-0">
                                <FiGrid className="h-3.5 w-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[8px] sm:text-[9px] text-gray-400 font-extrabold uppercase leading-none">
                                  Configuration
                                </p>
                                <p
                                  className="text-[11px] sm:text-xs font-black text-gray-800 mt-0.5 sm:mt-1 leading-tight"
                                  title={project.bhkType || "Residential"}
                                >
                                  {project.bhkType || "Residential"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Specifications - Mobile inline list */}
                          <div className="block md:hidden text-[9px] text-gray-400 font-bold mt-0.5">
                            {project.size
                              ? `${project.size} ${project.areaUnit || "sqft"}`
                              : ""}
                            {project.propertyStage &&
                              ` • ${project.propertyStage}`}
                            {project.bhkType && ` • ${project.bhkType}`}
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="hidden md:flex mt-auto pt-4 border-t border-gray-100 flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-xs shrink-0">
                            <svg
                              className="w-4 h-4 fill-current shrink-0"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Direct Listing (Verified)</span>
                          </div>

                          <Link
                            href={`/property-page/${project._id}`}
                            className="text-red-600 font-extrabold text-xs hover:text-red-800 transition-colors uppercase tracking-wider inline-flex items-center gap-1 group/details shrink-0 cursor-pointer"
                          >
                            <span>View Property Details</span>
                            <span className="transform group-hover/details:translate-x-1 transition-transform">
                              →
                            </span>
                          </Link>
                        </div>

                        {/* Mobile Price display */}
                        <div className="block md:hidden mt-auto">
                          <span className="text-xs font-black text-gray-900 tracking-tight leading-none block">
                            {formatPrice(project.price)}
                          </span>
                        </div>
                      </div>

                      {/* Right Section: Pricing & Call Button */}
                      <div className="hidden md:flex border-t md:border-t-0 md:border-l border-gray-100 flex-col justify-center items-center p-5 w-full md:w-[200px] shrink-0 text-center bg-gray-50/15 relative">
                        <div className="mb-4 flex flex-col items-center">
                          <span className="text-2xl font-black text-gray-900 tracking-tight leading-tight block">
                            {formatPrice(project.price)}
                          </span>

                          {project.price && project.size && (
                            <span className="inline-block mt-2.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold uppercase tracking-wider">
                              ₹
                              {Math.round(
                                project.price / project.size,
                              ).toLocaleString("en-IN")}{" "}
                              / sqft
                            </span>
                          )}

                          <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest mt-2 bg-slate-100/50 px-2 py-0.5 rounded-md inline-block border border-slate-200/30">
                            Zero Brokerage
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLeadProperty(project);
                          }}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition active:scale-[0.97] text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-500/10 hover:shadow-red-500/20 duration-150"
                        >
                          Get Owner Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Cards
                      project={project}
                      layout="list"
                      priority={index < 4}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-16 bg-white rounded-2xl border border-gray-100 w-full">
                <h3 className="text-xl font-semibold mb-2">
                  No Properties Found
                </h3>
                <p>
                  Try adjusting your search filters or searching for a different
                  location.
                </p>
              </div>
            )}

            {/* Skeletons and message rendered outside the observed element */}
            <div className="w-full mt-4">
              {loadingMore && (
                <div className="flex flex-col gap-4 md:gap-6 w-full">
                  {[...Array(3)].map((_, i) => (
                    <CardSkeleton key={`more-skeleton-${i}`} layout="list" />
                  ))}
                </div>
              )}

              {!hasMore && projects.length > 0 && (
                <div className="text-center w-full">
                  <p className="text-gray-500 font-medium py-4">
                    You've seen all properties matching your search.
                  </p>
                </div>
              )}
            </div>

            {/* Empty, clean sentinel observed element at the absolute bottom */}
            {hasMore && <div ref={loader} className="h-4 w-full" />}
          </div>

          {/* Right Column: Dynamic Insights & Callback Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DynamicSidebar projects={projects} router={router} />
          </div>
        </div>
      </div>

      {/* Get Owner Details Micro-Modal */}
      <AnimatePresence>
        {leadProperty && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLeadModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full z-[1010] p-6 border border-gray-100 text-left"
            >
              <button
                onClick={closeLeadModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <FiX size={20} />
              </button>

              {!leadSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="text-center pb-2 border-b border-gray-100">
                    <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 border border-red-100 shadow-inner">
                      <FiUser size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Get Owner Contact Details
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                      Please provide your contact details to connect directly
                      with the homeowner of{" "}
                      <span className="font-semibold text-gray-800">
                        "{leadProperty.title}"
                      </span>
                      .
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bhavesh Patel"
                      value={leadForm.name}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Your Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 99887 76655"
                      value={leadForm.phone}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full text-sm border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl p-3 bg-gray-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md transition cursor-pointer active:scale-95"
                  >
                    Reveal Owner Contact Info
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6 py-2">
                  <div>
                    <div className="h-12 w-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-3 border border-green-100 shadow-inner">
                      <FiCheckCircle size={24} className="animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Owner Contact Info
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Direct homeowner credentials revealed. Deal safely!
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left divide-y divide-gray-200/60 text-sm">
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Owner Name</span>
                      <span className="font-semibold text-gray-900">
                        {leadProperty.ownerName || "Direct Poster"}
                      </span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Phone Number</span>
                      <a
                        href={`tel:${leadProperty.ownerPhone}`}
                        className="font-bold text-red-600 hover:underline flex items-center gap-1"
                      >
                        <FiPhone size={12} /> {leadProperty.ownerPhone}
                      </a>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">Email Address</span>
                      <a
                        href={`mailto:${leadProperty.ownerEmail}`}
                        className="font-medium text-gray-950 hover:underline flex items-center gap-1"
                      >
                        <FiMail size={12} /> {leadProperty.ownerEmail}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={closeLeadModal}
                    className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-xs font-bold rounded-xl text-gray-700 transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[90px] right-[28px] bg-red-600 text-white w-12 h-12 rounded-full shadow-[0_10px_40px_-10px_rgba(220,38,38,0.7)] hover:bg-red-700 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 z-[100] cursor-pointer group flex items-center justify-center border-2 border-white"
          aria-label="Scroll to top"
          type="button"
        >
          <FiArrowUp
            className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300"
            strokeWidth={2.5}
          />
        </button>
      )}
    </div>
  );
};

export default SearchPageClient;
