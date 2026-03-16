"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FiSliders,
  FiSearch,
  FiArrowRight,
  FiX,
  FiChevronDown,
  FiCheck,
  FiMapPin,
} from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

/* ─────────────────────────────────────────────────────────────
   Static Data
───────────────────────────────────────────────────────────── */
const CITIES = ["Ahmedabad", "Gandhinagar"];
const PROPERTY_CATEGORIES = ["Residential", "Commercial", "Weekend Plots", "Penthouse/Villa"];

const UNIT_TYPES_BY_CATEGORY = {
  Residential: [
    { label: "1 BHK", value: "1BHK" },
    { label: "2 BHK", value: "2BHK" },
    { label: "3 BHK", value: "3BHK" },
    { label: "4 BHK", value: "4BHK" },
    { label: "5 BHK", value: "5BHK" },
    { label: "6 BHK", value: "6BHK" },
    { label: "Villas", value: "Villas" },
  ],
  Commercial: [
    { label: "Showroom", value: "Showroom" },
    { label: "Office", value: "Office" },
  ],
  "Weekend Plots": [{ label: "Plots", value: "Plots" }],
  "Penthouse/Villa": [
    { label: "Penthouse", value: "Penthouse" },
    { label: "Villa", value: "Villa" },
  ],
  "": [
    { label: "1 BHK", value: "1BHK" },
    { label: "2 BHK", value: "2BHK" },
    { label: "3 BHK", value: "3BHK" },
    { label: "4 BHK", value: "4BHK" },
    { label: "5 BHK", value: "5BHK" },
    { label: "6 BHK", value: "6BHK" },
    { label: "Villas", value: "Villas" },
    { label: "Shops", value: "Shops" },
    { label: "Office", value: "Office" },
    { label: "Plots", value: "Plots" },
    { label: "Penthouse", value: "Penthouse" },
    { label: "Villa", value: "Villa" },
  ],
};

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

const POSSESSION_OPTIONS = [
  "Ready to Move",
  "Upto 1 Year",
  "Upto 2 Years",
  "2+ Years",
];
const POPULAR_LOCALITIES = [
  "SG Highway",
  "Vaishnodevi",
  "Gota",
  "Jagatpur",
  "Ambli",
  "Gift City",
  "Zundal",
];

/* ─────────────────────────────────────────────────────────────
   Mini Dropdown used inside the search bar
───────────────────────────────────────────────────────────── */
function BarDropdown({ label, placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target))
        setOpen(false);
    };
    const handleScroll = (e) => {
      if (open) {
        if (
          triggerRef.current &&
          (triggerRef.current.contains(e.target) ||
            e.target === triggerRef.current)
        ) {
          return;
        }
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    return () => {
      document.removeEventListener("mousedown", handler);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [open]);

  const handleOpen = () => setOpen((p) => !p);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={triggerRef} className="flex flex-col relative w-full">
      <span className="text-[10px] font-semibold text-gray-400 mb-0.5 whitespace-nowrap uppercase tracking-wide">
        {label}
      </span>
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-1 text-sm font-medium text-gray-800 focus:outline-none whitespace-nowrap cursor-pointer w-full text-left"
      >
        <span
          className={selected ? "text-gray-900" : "text-gray-400 font-normal"}
        >
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && typeof window !== "undefined" && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 min-w-[160px] max-w-[240px] z-[500] bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] max-h-48 overflow-y-auto custom-scrollbar"
          onScroll={(e) => e.stopPropagation()}
        >
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
              className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-3 transition-colors ${
                value === opt.value
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {opt.label}
              {value === opt.value && (
                <FiCheck size={12} className="flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Modal budget dropdown
───────────────────────────────────────────────────────────── */
function ModalBudgetDropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };

    // Ignore scrolls inside the dropdown panel itself so it doesn't close prematurely.
    const handleScroll = (e) => {
      if (open) {
        if (
          ref.current &&
          (ref.current.contains(e.target) || e.target === ref.current)
        ) {
          return;
        }
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      document.removeEventListener("mousedown", handler);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [open]);

  const handleOpen = () => setOpen((p) => !p);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="w-full relative">
      <button
        type="button"
        onClick={handleOpen}
        className={`w-full flex items-center justify-between gap-2 border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-200 shadow-sm cursor-pointer ${
          open
            ? "border-red-500 bg-white ring-4 ring-red-500/10"
            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        <span
          className={`block truncate ${selected ? "text-gray-900 font-semibold" : "text-gray-400"}`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown
          size={14}
          className={`flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Put AnimatePresence so it can animate out */}
      {typeof window !== "undefined" && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "top center" }}
              className="absolute top-[calc(100%+8px)] left-0 min-w-full bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] max-h-52 overflow-y-auto custom-scrollbar z-[500]"
              onScroll={(e) => e.stopPropagation()}
            >
              <div className="p-1.5 flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  {placeholder}
                </button>
                {options.map((opt) => {
                  const isSelected = value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-all duration-150 ${
                        isSelected
                          ? "bg-red-50 text-red-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                      }`}
                    >
                      {opt.label}
                      {isSelected && (
                        <FiCheck
                          size={14}
                          className="text-red-600 flex-shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

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
   Filter Modal
───────────────────────────────────────────────────────────── */
function FilterModal({ open, onClose, onApply, initial, unitOptions }) {
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "min(90vh, 700px)" }}
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
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400/20 transition-all">
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
                {PROPERTY_CATEGORIES.map((t) => (
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
                  Unit Type
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
                {unitOptions.map((b) => (
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

/* ─────────────────────────────────────────────────────────────
   Main Combined Component
───────────────────────────────────────────────────────────── */
export default function HomeHeroSection({ data }) {
  const router = useRouter();

  // ── Typing animation ──
  const firstLine = data?.firstLine;
  const secondLine = data?.secondLine;
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  // ── Client / hydration ──
  const [isClient, setIsClient] = useState(false);

  // ── Search state ──
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [selectedBhk, setSelectedBhk] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState({
    value: "",
    areas: [],
    projects: [],
    cities: [],
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // ── Active filter count ──
  const activeFilterCount = [
    modalFilters.city,
    ...(modalFilters.propertyTypes || []),
    ...(modalFilters.bhks || []),
    modalFilters.minBudget,
    modalFilters.maxBudget,
    ...(modalFilters.possessions || []),
  ].filter(Boolean).length;

  const availableUnitTypes = UNIT_TYPES_BY_CATEGORY[selectedCategory || ""];

  // ── Initialise client flag ──
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ── Reset Unit Type if invalid for category ──
  useEffect(() => {
    if (
      selectedBhk &&
      !availableUnitTypes.some((opt) => opt.value === selectedBhk)
    ) {
      setSelectedBhk("");
    }
  }, [selectedCategory, selectedBhk, availableUnitTypes]);

  // ── Typing animation effect ──
  useEffect(() => {
    if (!firstLine || !secondLine) return;
    const handleTyping = () => {
      if (currentIndex < firstLine.length) {
        setDisplayText((p) => p + firstLine[currentIndex]);
        setCurrentIndex((p) => p + 1);
      } else if (currentIndex === firstLine.length) {
        setDisplayText((p) => p + "\n");
        setCurrentIndex((p) => p + 1);
      } else if (currentIndex < firstLine.length + secondLine.length + 1) {
        const idx = currentIndex - firstLine.length - 1;
        setDisplayText((p) => p + secondLine[idx]);
        setCurrentIndex((p) => p + 1);
      } else {
        setTypingComplete(true);
        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setTypingComplete(false);
        }, 3000);
      }
    };
    if (!typingComplete) {
      const timer = setTimeout(handleTyping, 75);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, typingComplete, firstLine, secondLine]);

  // ── Close autocomplete on outside click ──
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // ── Search input change ──
  const handleSearchByChange = async (e) => {
    const val = e.target.value;
    setSearchBy(val);
    if (val.length < 3) {
      setSuggestions({ value: val, areas: [], projects: [], cities: [] });
      if (val) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
      return;
    }
    try {
      const res = await fetch(
        `/api/search/autocomplete?q=${encodeURIComponent(val)}`,
      );
      const data = await res.json();
      setSuggestions({ ...data, value: val });
      setShowSuggestions(true);
    } catch {
      setSuggestions({ value: "", areas: [], projects: [], cities: [] });
      setShowSuggestions(false);
    }
  };

  // ── Build query params ──
  const buildParams = ({
    city,
    q,
    bhk,
    min,
    max,
    propertyTypes,
    possessions,
    category,
  } = {}) => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (q) params.set("q", q);
    if (bhk) params.set("unitType", bhk);
    if (min) params.set("minBudget", min);
    if (max) params.set("maxBudget", max);

    // Filter panel array vs our explicit category selection
    let defaultProjectType = category;
    if (category === "Weekend Plots") defaultProjectType = "Land";

    if (propertyTypes?.length) {
      let selectedType = propertyTypes[0];
      if (selectedType === "Weekend Plots") selectedType = "Land";
      
      if (selectedType === "Penthouse/Villa") {
        params.set("projectType", "Residential");
        params.set("projectSubType", "Bunglows/Villa/Row House,Penthouse");
      } else {
        params.set("projectType", selectedType);
      }
    } else if (defaultProjectType === "Penthouse/Villa") {
      params.set("projectType", "Residential");
      params.set("projectSubType", "Bunglows/Villa/Row House,Penthouse");
    } else if (defaultProjectType) {
      params.set("projectType", defaultProjectType);
    }

    if (possessions?.length)
      params.set(
        "status",
        possessions[0] === "Ready to Move"
          ? "Ready to Move"
          : "Under Construction",
      );
    return params.toString();
  };

  // ── Main search submit ──
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    const city = modalFilters.city || selectedCity;
    const q = modalFilters.q || searchBy;
    const bhk =
      modalFilters.bhks?.length > 0 ? modalFilters.bhks[0] : selectedBhk;
    const min = modalFilters.minBudget || minBudget;
    const qs = buildParams({
      city,
      q,
      bhk,
      min,
      max: modalFilters.maxBudget,
      propertyTypes: modalFilters.propertyTypes,
      possessions: modalFilters.possessions,
      category: selectedCategory,
    });
    router.push(`/search?${qs}`);
  };

  // ── Modal filter apply ──
  const handleModalApply = (filters) => {
    setModalFilters(filters);
    setFilterOpen(false);
    setIsSearching(true);
    const qs = buildParams({
      city: filters.city,
      q: filters.q,
      bhk: filters.bhks?.[0],
      min: filters.minBudget,
      max: filters.maxBudget,
      propertyTypes: filters.propertyTypes,
      possessions: filters.possessions,
      category: selectedCategory,
    });
    router.push(`/search?${qs}`);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — background image + headline + stats
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full" style={{ minHeight: "92vh" }}>
        {/* Background image */}
        {data?.img && (
          <div className="absolute inset-0">
            <Image
              src={optimizeCloudinaryUrl(data.img, {
                width: 1920,
                height: 1080,
              })}
              alt="Hero background"
              fill
              priority
              quality={85}
              className="object-cover object-bottom"
              sizes="100vw"
            />
          </div>
        )}

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-between h-full"
          style={{ minHeight: "92vh" }}
        >
          {/* Top area — headline + search card */}
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 pt-24 pb-10">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* ── LEFT: Headline + paragraphs ── */}
                <div className="space-y-6">
                  {/* Badge */}
                  {/* <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        The Perfect Property Hub
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 }}
                    >
                      <button
                        type="button"
                        onClick={() => router.push("/search")}
                        className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm shadow hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" />
                        Zero Brokerage Charges
                      </button>
                    </motion.div>
                  </div> */}
                  {/* Typing headline */}
                  <motion.div
                    className="h-[130px] sm:h-[200px] lg:h-[240px] flex items-start"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-pre-line drop-shadow-lg">
                      <span dangerouslySetInnerHTML={{ __html: displayText }} />
                      <span className="typing-cursor inline-block w-[2px] h-[1em] align-middle bg-red-400 ml-1" />
                    </h1>
                  </motion.div>

                  {/* Zero Brokerage Badge */}

                  {/* Paragraphs */}
                  <motion.div
                    className="space-y-3 max-w-lg"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {data?.paragraphOne && (
                      <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed">
                        {data.paragraphOne}
                      </p>
                    )}
                    {data?.paragraphTwo && (
                      <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                        {data.paragraphTwo}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* ── RIGHT: Floating search card ── */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="w-full"
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/60">
                    {/* Card header */}
                    <div className="mb-5">
                      <h2 className="text-xl font-bold text-gray-900 mb-0.5">
                        Find Your Dream Home
                      </h2>
                      <p className="text-xs text-gray-500">
                        Search across verified projects in Ahmedabad &
                        Gandhinagar
                      </p>
                    </div>

                    <form onSubmit={handleSearch} className="space-y-4">
                      {/* City select pills */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Select City
                        </label>
                        <div className="flex gap-2">
                          {CITIES.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() =>
                                setSelectedCity(selectedCity === c ? "" : c)
                              }
                              className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-150 cursor-pointer ${
                                selectedCity === c
                                  ? "bg-red-600 text-white border-red-600 shadow-md"
                                  : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-600"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Category select pills */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Property Type
                        </label>
                        <div className="flex gap-2">
                          {PROPERTY_CATEGORIES.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() =>
                                setSelectedCategory(
                                  selectedCategory === c ? "" : c,
                                )
                              }
                              className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-150 cursor-pointer ${
                                selectedCategory === c
                                  ? "bg-red-600 text-white border-red-600 shadow-md"
                                  : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-600"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Location search with autocomplete */}
                      <div ref={searchRef} className="relative">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Search Location
                        </label>
                        <div className="flex items-center gap-3 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-500 focus-within:bg-white transition-all duration-200">
                          <FiSearch
                            size={16}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <input
                            type="text"
                            value={searchBy}
                            onChange={handleSearchByChange}
                            onFocus={() => {
                              if (
                                suggestions.areas?.length > 0 ||
                                suggestions.projects?.length > 0 ||
                                suggestions.value
                              ) {
                                setShowSuggestions(true);
                              }
                            }}
                            placeholder="Area · Project · Builder"
                            className="flex-1 text-sm text-gray-800 focus:outline-none placeholder-gray-400 bg-transparent"
                          />
                          {searchBy && (
                            <button
                              type="button"
                              onClick={() => {
                                setSearchBy("");
                                setShowSuggestions(false);
                              }}
                              className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              <FiX size={14} />
                            </button>
                          )}
                        </div>

                        {/* Autocomplete dropdown */}
                        {showSuggestions &&
                          (suggestions.areas?.length > 0 ||
                            suggestions.projects?.length > 0 ||
                            suggestions.cities?.length > 0 ||
                            suggestions.value) && (
                            <div
                              className="absolute top-full left-0 mt-2 w-full z-[9999] bg-white shadow-2xl rounded-xl max-h-56 overflow-y-auto border border-gray-100"
                              onScroll={(e) => e.stopPropagation()}
                            >
                              {/* General search option */}
                              {/* {suggestions.value && (
                                <button
                                  type="button"
                                  className="w-full text-left px-4 py-2.5 hover:bg-gray-100 text-sm text-gray-700 transition-colors cursor-pointer"
                                  onClick={() => {
                                    setSearchBy(suggestions.value);
                                    setShowSuggestions(false);
                                  }}
                                >
                                  Search for "{suggestions.value}"
                                </button>
                              )} */}

                              {/* Areas suggestions section */}
                              {suggestions.areas?.length > 0 && (
                                <>
                                  <div className="px-4 py-1.5 border-t border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                                    Areas
                                  </div>
                                  {suggestions.areas.map((area) => (
                                    <button
                                      key={area._id}
                                      type="button"
                                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm text-gray-700 flex items-center gap-2 transition-colors hover:text-red-600 cursor-pointer"
                                      onClick={() => {
                                        setSearchBy(area.name);
                                        setShowSuggestions(false);
                                      }}
                                    >
                                      <FiMapPin
                                        size={12}
                                        className="text-gray-400 flex-shrink-0"
                                      />
                                      {area.name}
                                    </button>
                                  ))}
                                </>
                              )}

                              {/* Cities suggestions section */}
                              {suggestions.cities?.length > 0 && (
                                <>
                                  <div className="px-4 py-1.5 border-t border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                                    Cities
                                  </div>
                                  {suggestions.cities.map((city) => (
                                    <button
                                      key={city._id}
                                      type="button"
                                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm text-gray-700 transition-colors hover:text-red-600 cursor-pointer"
                                      onClick={() => {
                                        setSelectedCity(city.name);
                                        setShowSuggestions(false);
                                      }}
                                    >
                                      {city.name}
                                    </button>
                                  ))}
                                </>
                              )}

                              {/* Projects suggestions section */}
                              {suggestions.projects?.length > 0 && (
                                <>
                                  <div className="px-4 py-1.5 border-t border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                                    Projects
                                  </div>
                                  {suggestions.projects.map((project) => (
                                    <button
                                      key={project._id}
                                      type="button"
                                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm text-gray-700 transition-colors hover:text-red-600 cursor-pointer"
                                      onClick={() => {
                                        setIsSearching(true);
                                        router.push(
                                          `/project-page/${encodeURIComponent(
                                            project.slug || project._id,
                                          )}`,
                                        );
                                        setShowSuggestions(false);
                                      }}
                                    >
                                      {project.projectName}
                                    </button>
                                  ))}
                                </>
                              )}
                            </div>
                          )}
                      </div>

                      {/* BHK + Budget row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                            Unit Type
                          </label>
                          <ModalBudgetDropdown
                            placeholder="Any Unit"
                            options={availableUnitTypes}
                            value={selectedBhk}
                            onChange={setSelectedBhk}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                            Budget
                          </label>
                          <ModalBudgetDropdown
                            placeholder="Any Budget"
                            options={BUDGET_OPTIONS}
                            value={minBudget}
                            onChange={setMinBudget}
                          />
                        </div>
                      </div>

                      {/* Search + Filter row */}
                      <div className="flex gap-3 pt-1">
                        <button
                          type="submit"
                          disabled={isSearching}
                          className="flex-1 bg-red-600 cursor-pointer hover:bg-red-700 disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.98] text-white text-sm font-bold py-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                        >
                          {isSearching ? (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                              Finding...
                            </>
                          ) : (
                            <>
                              <FiSearch size={15} />
                              Search Properties
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFilterOpen(true)}
                          className="relative flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-red-400 hover:text-red-600 transition-all duration-150 cursor-pointer"
                        >
                          <FiSliders size={15} />
                          <span className="hidden sm:inline">Filters</span>
                          {activeFilterCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                              {activeFilterCount}
                            </span>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Popular localities */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1 flex-shrink-0">
                          <FiMapPin size={10} /> Popular
                        </span>
                        {POPULAR_LOCALITIES.map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() =>
                              window.open(
                                `/search?q=${encodeURIComponent(loc)}`,
                                "_blank",
                              )
                            }
                            className="px-3 py-1 rounded-full border border-red-200 bg-red-50/60 hover:bg-red-600 hover:text-white hover:border-red-600 text-[11px] font-medium text-red-700 transition-all duration-150 cursor-pointer"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── Stats bar at the bottom ── */}
          {data?.counts && data.counts.length > 0 && (
            <div className="w-full bg-black/40 backdrop-blur-sm border-t border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {data.counts.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="text-2xl md:text-3xl font-extrabold text-white">
                        {isClient ? (
                          <CountUp
                            start={item.start || 0}
                            end={item.end}
                            duration={item.duration || 2.5}
                            separator=","
                            useEasing
                          />
                        ) : (
                          item.end
                        )}
                        <span className="text-red-400">+</span>
                      </div>
                      <p className="text-xs md:text-sm text-white/70 mt-0.5 font-medium">
                        {item.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filter Modal */}
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleModalApply}
        unitOptions={availableUnitTypes}
        initial={{
          city: selectedCity,
          q: searchBy,
          bhks: selectedBhk ? [selectedBhk] : [],
          minBudget,
          maxBudget: "",
          propertyTypes: [],
          possessions: [],
          ...modalFilters,
        }}
      />

      {/* Cursor animation style */}
      <style jsx global>{`
        .typing-cursor {
          display: inline-block;
          animation: blink-cursor 1s step-end infinite;
        }
        @keyframes blink-cursor {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
