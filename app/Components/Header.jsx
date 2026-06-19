"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiChevronDown, FiCheck, FiSearch, FiArrowRight } from "react-icons/fi";

/**
 * Header Component - Main navigation header for the Shelter4U website
 * Features:
 * - Responsive design (mobile and desktop)
 * - Dropdown menus with hover/click interactions
 * - Mobile hamburger menu
 * - Active page highlighting
 * - Sticky positioning
 */
/* ─────────────────────────────────────────────────────────────
   Filter Modal Constants
───────────────────────────────────────────────────────────── */
const CITIES = ["Ahmedabad", "Gandhinagar"];

const BHK_OPTIONS = [
  { label: "1 BHK", value: "1BHK" },
  { label: "2 BHK", value: "2BHK" },
  { label: "3 BHK", value: "3BHK" },
  { label: "4 BHK", value: "4BHK" },
  { label: "5 BHK", value: "5BHK" },
  { label: "6 BHK", value: "6BHK" },
  { label: "7 BHK", value: "7BHK" },
];

const BUDGET_OPTIONS = [
  { label: "25 Lakh", value: "2500000" },
  { label: "50 Lakh", value: "5000000" },
  { label: "75 Lakh", value: "7500000" },
  { label: "1 Crore", value: "10000000" },
  { label: "2 Crore", value: "20000000" },
  { label: "3 Crore", value: "30000000" },
  { label: "5 Crore", value: "50000000" },
  { label: "10 Crore", value: "100000000" },
];

const PROPERTY_TYPES = ["Flat", "Duplex", "Penthouse", "Villa", "Plot"];
const POSSESSION_OPTIONS = [
  "Ready to Move",
  "Upto 1 Year",
  "Upto 2 Years",
  "2+ Years",
];

/* ─────────────────────────────────────────────────────────────
   Filter Pill
───────────────────────────────────────────────────────────── */
function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
        active
          ? "bg-red-600 text-white border-red-600"
          : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600"
      }`}
    >
      {!active && (
        <span className="text-gray-400 text-sm leading-none -mt-px">+</span>
      )}
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Modal — inline budget dropdown
───────────────────────────────────────────────────────────── */
function ModalBudgetDropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-800 hover:border-gray-400 transition-all cursor-pointer"
      >
        <span
          className={selected ? "text-gray-900 font-medium" : "text-gray-400"}
        >
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown
          size={12}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-2xl z-[500] max-h-48 overflow-y-auto">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:bg-gray-50 transition-colors"
          >
            {placeholder}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                value === opt.value
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {opt.label}
              {value === opt.value && <FiCheck size={12} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Filter Modal Component
───────────────────────────────────────────────────────────── */
function FilterModal({ open, onClose, onApply, initial }) {
  const [city, setCity] = useState("");
  const [searchText, setSearchText] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [bhks, setBhks] = useState([]);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    if (open) {
      setCity(initial?.city || "");
      setSearchText(initial?.q || "");
      setPropertyTypes(initial?.propertyTypes || []);
      setBhks(initial?.bhks || []);
      setMinBudget(initial?.minBudget || "");
      setMaxBudget(initial?.maxBudget || "");
      setPossessions(initial?.possessions || []);
    }
  }, [open]);

  /* Lock body scroll */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Escape to close */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const toggle = (setter, val) =>
    setter((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );

  const handleClearAll = () => {
    setCity("");
    setSearchText("");
    setPropertyTypes([]);
    setBhks([]);
    setMinBudget("");
    setMaxBudget("");
    setPossessions([]);
  };

  const handleApply = () => {
    onApply({
      city,
      q: searchText,
      propertyTypes,
      bhks,
      minBudget,
      maxBudget,
      possessions,
    });
  };

  const totalActive = [
    city,
    ...propertyTypes,
    ...bhks,
    minBudget,
    maxBudget,
    ...possessions,
  ].filter(Boolean).length;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-0 md:p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative bg-white w-full md:max-w-lg flex flex-col overflow-hidden filter-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition cursor-pointer"
            aria-label="Close filters"
          >
            <FiArrowRight size={16} className="text-gray-600 rotate-180" />
          </button>
          <span className="text-sm font-bold text-gray-900 tracking-tight">
            Filters
          </span>
          {totalActive > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {totalActive}
            </span>
          )}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          <div className="px-6 py-6 space-y-7">
            {/* City */}
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                Search City
              </p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCity(city === c ? "" : c)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                      city === c
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-red-400 hover:text-red-600"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Locality search */}
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                Search Locality / Project / Builder
              </p>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900/20 transition-all">
                <FiSearch size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search Locality / Project / Builder"
                  className="flex-1 text-sm text-gray-800 focus:outline-none placeholder-gray-400 bg-transparent"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Property Type
                </p>
                {propertyTypes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setPropertyTypes([])}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_TYPES.map((t) => (
                  <FilterPill
                    key={t}
                    label={t}
                    active={propertyTypes.includes(t)}
                    onClick={() => toggle(setPropertyTypes, t)}
                  />
                ))}
              </div>
            </div>

            {/* BHK */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  BHK
                </p>
                {bhks.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setBhks([])}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {BHK_OPTIONS.map((b) => (
                  <FilterPill
                    key={b.value}
                    label={b.label}
                    active={bhks.includes(b.value)}
                    onClick={() => toggle(setBhks, b.value)}
                  />
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Budget
                </p>
                {(minBudget || maxBudget) && (
                  <button
                    type="button"
                    onClick={() => {
                      setMinBudget("");
                      setMaxBudget("");
                    }}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <ModalBudgetDropdown
                  placeholder="Min"
                  options={BUDGET_OPTIONS.filter(
                    (o) =>
                      !maxBudget || parseInt(o.value) < parseInt(maxBudget),
                  )}
                  value={minBudget}
                  onChange={setMinBudget}
                />
                <span className="text-gray-300 text-lg font-light">–</span>
                <ModalBudgetDropdown
                  placeholder="Max"
                  options={BUDGET_OPTIONS.filter(
                    (o) =>
                      !minBudget || parseInt(o.value) > parseInt(minBudget),
                  )}
                  value={maxBudget}
                  onChange={setMaxBudget}
                />
              </div>
            </div>

            {/* Possession */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Possession
                </p>
                {possessions.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setPossessions([])}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {POSSESSION_OPTIONS.map((p) => (
                  <FilterPill
                    key={p}
                    label={p}
                    active={possessions.includes(p)}
                    onClick={() => toggle(setPossessions, p)}
                  />
                ))}
              </div>
            </div>

            <div className="h-1" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  // Get current pathname for active link highlighting
  const pathname = usePathname();
  const router = useRouter();

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to track which dropdown is currently active (null, "aboutUs", "location", "type", "others")
  const [activeDropdown, setActiveDropdown] = useState(null);

  // State for scroll detection (mobile sticky search bar)
  const [isScrolled, setIsScrolled] = useState(false);

  // State for scrolled filter modal open
  const [filterOpen, setFilterOpen] = useState(false);

  const handleModalApply = (filters) => {
    setFilterOpen(false);
    const params = new URLSearchParams();
    if (filters.city) params.set("city", filters.city);
    if (filters.q) params.set("q", filters.q);
    if (filters.bhks?.length) params.set("unitType", filters.bhks[0]);
    if (filters.minBudget) params.set("minBudget", filters.minBudget);
    if (filters.maxBudget) params.set("maxBudget", filters.maxBudget);
    if (filters.propertyTypes?.length)
      params.set("projectType", filters.propertyTypes[0]);
    if (filters.possessions?.length)
      params.set(
        "status",
        filters.possessions[0] === "Ready to Move"
          ? "Ready to Move"
          : "Under Construction",
      );
    router.push(`/search?${params.toString()}`);
  };

  // Refs for dropdown containers - used for click outside detection
  const aboutUsRef = useRef(null);
  const locationRef = useRef(null);
  const typeRef = useRef(null);
  const othersRef = useRef(null);

  /**
   * Effect to handle clicking outside dropdowns to close them
   * Listens for mousedown events and closes dropdowns if click is outside all dropdown containers
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close dropdowns if mobile menu is open (mobile logic handles it differently)
      if (isMenuOpen) return;

      // Check if click is outside all dropdown containers
      if (
        aboutUsRef.current &&
        !aboutUsRef.current.contains(event.target) &&
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        typeRef.current &&
        !typeRef.current.contains(event.target) &&
        othersRef.current &&
        !othersRef.current.contains(event.target)
      ) {
        // Close all dropdowns
        setActiveDropdown(null);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Scroll listener for sticky mobile search bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Toggle dropdown visibility
   * @param {string} dropdown - The dropdown identifier ("aboutUs", "location", "type", "others")
   */
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  /**
   * Check if current path matches the given path for active link styling
   * @param {string} path - The path to check against current pathname
   * @returns {boolean} - True if paths match
   */
  const isActive = (path) => {
    return pathname === path;
  };

  /**
   * Close mobile menu and all dropdowns
   * Used when mobile menu items are clicked
   */
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex flex-col xl:flex-row justify-between items-center px-4 md:px-8 py-3">
        {/* Logo and Mobile Menu Button Container */}
        <div className="w-full xl:w-auto flex justify-between items-center gap-3">
          {/* Mobile Scroll-only Header (visible on mobile when scrolled) */}
          {isScrolled && pathname !== "/search" && !isMenuOpen ? (
            <div className="flex xl:hidden items-center justify-between w-full gap-3">
              {/* Menu button on the left */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 cursor-pointer focus:outline-none shrink-0"
                aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Search bar input placeholder opening filter modal */}
              <div
                onClick={() => setFilterOpen(true)}
                className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-100 hover:border-gray-300 transition-colors w-full cursor-pointer"
              >
                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs text-gray-500 font-medium truncate">
                  Search Locality, Project, Area...
                </span>
              </div>
            </div>
          ) : null}

          {/* Standard Header (always visible on desktop, visible on mobile only when NOT scrolled, menu open, or if on search page) */}
          <div className={`flex items-center justify-between w-full xl:w-auto ${(isScrolled && pathname !== "/search" && !isMenuOpen) ? "hidden xl:flex" : "flex"}`}>
            {/* Logo */}
            <Link href="/">
              <div className="pl-2 md:pl-4 flex items-center">
                {/* Mobile icon logo */}
                <span className="block md:hidden">
                  <Image
                    src="/NewLogo.png"
                    alt="Shelter4U"
                    width={40}
                    height={40}
                    priority
                  />
                </span>
                {/* Desktop full logo */}
                <span className="hidden md:block">
                  <Image
                    src="/NewLogo.png"
                    alt="Shelter4U"
                    width={90}
                    height={35}
                    priority
                  />
                </span>
              </div>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 cursor-pointer focus:outline-none"
              aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links - hidden on mobile, visible on xl screens and up */}
        <div className="hidden xl:flex space-x-1 lg:space-x-2">
          {/* Home Link */}
          <Link
            href="/"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Home
            {/* Animated underline on hover */}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>

          {/* About Us Dropdown */}
          <div
            className="relative"
            ref={aboutUsRef}
            onMouseEnter={() => setActiveDropdown("aboutUs")} // Open on hover
            onMouseLeave={() => setActiveDropdown(null)} // Close when mouse leaves
          >
            {/* Dropdown Trigger Button */}
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              About Us
              {/* Animated underline */}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              {/* Dropdown Arrow Icon */}
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "aboutUs" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu - conditionally rendered */}
            {activeDropdown === "aboutUs" && (
              <div className="absolute left-0 w-56 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/about/companyProfile"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Company Profile
                </Link>
                <Link
                  href="/about/vissionMission"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Our Visions & Mission
                </Link>
                <Link
                  href="/about/privacyPolicy"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/about/career"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Career
                </Link>
                <Link
                  href="/about/team"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Team
                </Link>
                <Link
                  href="/about/event"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Event Photo Gallery
                </Link>
              </div>
            )}
          </div>

          {/* Property By Location Dropdown */}
          <div
            className="relative"
            ref={locationRef}
            onMouseEnter={() => setActiveDropdown("location")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Property By Location
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "location" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Location Dropdown Menu */}
            {activeDropdown === "location" && (
              <div className="absolute left-0 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/search?city=ahmedabad"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Ahmedabad
                </Link>
                <Link
                  href="/search?city=gandhinagar"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Gandhinagar
                </Link>
              </div>
            )}
          </div>

          {/* Property By Type Dropdown */}
          <div
            className="relative"
            ref={typeRef}
            onMouseEnter={() => setActiveDropdown("type")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Property By Type
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "type" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Property Type Dropdown Menu */}
            {activeDropdown === "type" && (
              <div className="absolute left-0 w-44 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/search?projectType=Residential"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Residential
                </Link>
                <Link
                  href="/search?projectType=Commercial"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Commercial
                </Link>
                <Link
                  href="/search?projectType=Land"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Land
                </Link>
              </div>
            )}
          </div>

          {/* Inquiry Link */}
          <Link
            href="/Inquiry"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Inquiry
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>

          {/* Others Dropdown */}
          <div
            className="relative"
            ref={othersRef}
            onMouseEnter={() => setActiveDropdown("others")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer flex items-center font-normal">
              Others
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                  activeDropdown === "others" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Others Dropdown Menu */}
            {activeDropdown === "others" && (
              <div className="absolute right--1 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-100 animate-fadeIn">
                <Link
                  href="/others/loansForNRI"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Loans for NRIs
                </Link>
                <Link
                  href="/others/legalInfo"
                  className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 font-normal"
                >
                  Legal Information
                </Link>
              </div>
            )}
          </div>

          {/* Contact Us Link */}
          <Link
            href="/contactus"
            className="px-3 py-2 relative group transition-colors duration-300 cursor-pointer font-normal"
          >
            Contact Us
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-200 w-0 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu - conditionally shown based on isMenuOpen state */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full xl:hidden mt-3 border-t border-gray-100 pt-3`}
        >
          <div className="flex flex-col items-start space-y-1 px-2">
            {/* Mobile Home Link */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/") ? "text-red-600 bg-red-50" : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Home
            </Link>

            {/* Mobile About Us Dropdown */}
            <div className="w-full">
              {/* Dropdown Toggle Button */}
              <button
                onClick={() => toggleDropdown("aboutUs")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                About Us
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "aboutUs" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Collapsible Dropdown Content - uses CSS transitions for smooth open/close */}
              <div
                className={`transition-all duration-300 ${activeDropdown === "aboutUs" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
              >
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/about/companyProfile"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Company Profile
                  </Link>
                  <Link
                    href="/about/vissionMission"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Our Visions & Mission
                  </Link>
                  <Link
                    href="/about/privacyPolicy"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/about/career"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Career
                  </Link>
                  <Link
                    href="/about/team"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Team
                  </Link>
                  <Link
                    href="/about/event"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Event Photo Gallery
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Property By Location Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("location")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Property By Location
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "location" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 ${activeDropdown === "location" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
              >
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/search?city=ahmedabad"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Ahmedabad
                  </Link>
                  <Link
                    href="/search?city=gandhinagar"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Gandhinagar
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Property By Type Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("type")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Property By Type
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "type" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 ${activeDropdown === "type" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
              >
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/search?projectType=Residential"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Residential
                  </Link>
                  <Link
                    href="/search?projectType=Commercial"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Commercial
                  </Link>
                  <Link
                    href="/search?projectType=Plot"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Plot
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Inquiry Link */}
            <Link
              href="/Inquiry"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/inquiry")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Inquiry
            </Link>

            {/* Mobile Others Dropdown */}
            <div className="w-full">
              <button
                onClick={() => toggleDropdown("others")}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal"
              >
                Others
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "others" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 ${activeDropdown === "others" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
              >
                <div className="pl-4 py-1 bg-gray-50 rounded-md mt-1 mb-1 space-y-1">
                  <Link
                    href="/others/loansForNRI"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Loans for NRI
                  </Link>
                  <Link
                    href="/others/legalInfo"
                    onClick={closeMobileMenu}
                    className="block px-3 py-1.5 text-sm hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-md font-normal"
                  >
                    Legal Information
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Contact Us Link */}
            <Link
              href="/contactus"
              onClick={closeMobileMenu}
              className={`w-full px-3 py-2 ${
                isActive("/contact")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700"
              } hover:bg-red-50 hover:text-red-600 rounded-md text-sm font-normal`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      {/* Filter Modal */}
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleModalApply}
        initial={{
          city: "",
          q: "",
          bhks: [],
          minBudget: "",
          maxBudget: "",
          propertyTypes: [],
          possessions: [],
        }}
      />

      {/* CSS Animations - Custom keyframe animations for dropdown effects */}
      <style>{`
        /* Fade in animation for desktop dropdowns */
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }

        /* Slide down animation (unused but available) */
        .animate-slideDown {
          animation: slideDown 0.3s ease-in-out;
        }

        /* Keyframe for fade in effect */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Keyframe for slide down effect */
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        /* Responsive filter modal card overlay style */
        .filter-modal-card {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          max-height: 100vh;
          max-height: 100dvh;
          border-radius: 0;
        }
        @media (min-width: 768px) {
          .filter-modal-card {
            height: auto;
            max-height: min(90vh, 700px);
            border-radius: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Header;
