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

/* ─────────────────────────────────────────────────────────────
   Static data
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

const POPULAR_LOCALITIES = [
  "SG Highway",
  "Vaishnodevi",
  "Gota",
  "Jagatpur",
  "Iscon-Ambli",
  "Bodakdev",
];

/* ─────────────────────────────────────────────────────────────
   Inline custom dropdown for the search bar
───────────────────────────────────────────────────────────── */
function BarDropdown({ label, placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef(null);

  const updateCoords = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        left: rect.left,
        width: Math.max(rect.width, 160),
      });
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target))
        setOpen(false);
    };

    // Close dropdown on scroll to prevent misalignment,
    // BUT ignore scroll events originating from inside the dropdown panel itself
    const handleScroll = (e) => {
      if (open) {
        // If the scroll event target is a node and it's contained within the triggerRef (our component wrapper)
        // or if it's the dropdown panel itself, don't close.
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
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handler);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  const handleOpen = () => {
    updateCoords();
    setOpen((p) => !p);
  };

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={triggerRef} className="flex flex-col">
      {/* Label */}
      <span className="text-[10px] font-semibold text-gray-500 mb-0.5 whitespace-nowrap">
        {label}
      </span>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-1 text-sm font-medium text-gray-800 focus:outline-none whitespace-nowrap cursor-pointer"
      >
        <span
          className={selected ? "text-gray-900" : "text-gray-500 font-normal"}
        >
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown
          size={13}
          className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel — rendered via fixed positioning to escape overflow:hidden */}
      {open && typeof window !== "undefined" && (
        <div
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            minWidth: coords.width,
            zIndex: 9999,
          }}
          className="bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto"
          onScroll={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-xs text-gray-400 hover:bg-gray-50 transition-colors"
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
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors ${
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
   Filter pill
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
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function HomeSearchBar() {
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [selectedBhk, setSelectedBhk] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalFilters, setModalFilters] = useState({});
  const [activeSearchTab, setActiveSearchTab] = useState("projects"); // "projects" or "owners"
  const [showOwnerTab, setShowOwnerTab] = useState(true);

  useEffect(() => {
    const fetchOwnerCount = async () => {
      try {
        const res = await fetch("/api/search?tab=properties&limit=1");
        if (res.ok) {
          const data = await res.json();
          if (data.totalCount === 0) {
            setShowOwnerTab(false);
            setActiveSearchTab("projects");
          }
        }
      } catch (err) {
        console.error("Error fetching owner properties count:", err);
      }
    };
    fetchOwnerCount();
  }, []);
  const [suggestions, setSuggestions] = useState({
    areas: [],
    projects: [],
    cities: [],
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const [autocompleteCoords, setAutocompleteCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const updateAutocompleteCoords = useCallback(() => {
    if (searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setAutocompleteCoords({
        top: rect.bottom + 8,
        left: rect.left,
        width: Math.max(rect.width, 320),
      });
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
    };

    // Close on scroll to prevent misalignment, but allow scrolling inside the panel
    const handleScroll = (e) => {
      if (showSuggestions) {
        if (
          searchRef.current &&
          (searchRef.current.contains(e.target) ||
            e.target === searchRef.current)
        ) {
          return;
        }
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handler);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handler);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showSuggestions]);

  const handleSearchByChange = async (e) => {
    const val = e.target.value;
    setSearchBy(val);
    if (val.length < 2) {
      setSuggestions({ areas: [], projects: [], cities: [] });
      setShowSuggestions(false);
      return;
    }
    try {
      const res = await fetch(
        `/api/search/autocomplete?q=${encodeURIComponent(val)}`,
      );
      const data = await res.json();
      setSuggestions(data);
      updateAutocompleteCoords();
      setShowSuggestions(true);
    } catch {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const city = modalFilters.city || selectedCity;
    const q = modalFilters.q || searchBy;
    const bhk =
      modalFilters.bhks?.length > 0 ? modalFilters.bhks[0] : selectedBhk;
    const min = modalFilters.minBudget || minBudget;
    if (city) params.set("city", city);
    if (q) params.set("q", q);
    if (bhk) params.set("unitType", bhk);
    if (min) params.set("minBudget", min);
    if (modalFilters.maxBudget) params.set("maxBudget", modalFilters.maxBudget);
    if (modalFilters.propertyTypes?.length)
      params.set("projectType", modalFilters.propertyTypes[0]);
    if (modalFilters.possessions?.length)
      params.set(
        "status",
        modalFilters.possessions[0] === "Ready to Move"
          ? "Ready to Move"
          : "Under Construction",
      );
    if (activeSearchTab === "owners") {
      params.set("isOwner", "true");
    }
    window.open(`/search?${params.toString()}`, "_blank");
  };

  const handleModalApply = (filters) => {
    setModalFilters(filters);
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
    if (activeSearchTab === "owners") {
      params.set("isOwner", "true");
    }
    window.open(`/search?${params.toString()}`, "_blank");
  };

  const activeFilterCount = [
    modalFilters.city,
    ...(modalFilters.propertyTypes || []),
    ...(modalFilters.bhks || []),
    modalFilters.minBudget,
    modalFilters.maxBudget,
    ...(modalFilters.possessions || []),
  ].filter(Boolean).length;

  return (
    <>
      {/*
       * ── HERO SECTION ──
       * Sky-blue gradient card, matches the reference image exactly
       */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-5 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Outer rounded gradient card */}
          <div
            className="relative w-full rounded-3xl px-6 sm:px-10 pt-8 pb-7"
            style={{
              background:
                "linear-gradient(135deg, #fff5f5 0%, #ffe4e4 40%, #fecaca 100%)",
            }}
          >
            {/* ── Search bar Tabs (Vital Space Inspired) ── */}
            <div className="flex justify-center sm:justify-start gap-6 mb-4 px-2">
              <button
                type="button"
                onClick={() => setActiveSearchTab("projects")}
                className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all ${
                  activeSearchTab === "projects"
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Top Projects
              </button>

              {showOwnerTab && (
                <button
                  type="button"
                  onClick={() => setActiveSearchTab("owners")}
                  className={`relative pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all ${
                    activeSearchTab === "owners"
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Owner Properties
                  <span className="absolute -top-3.5 -right-6 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[8px] font-extrabold uppercase shadow-sm">
                    New
                  </span>
                </button>
              )}
            </div>

            {/* ── Title ── */}
            <h2 className="text-center text-xl sm:text-2xl font-normal text-gray-800 mb-5 tracking-tight">
              Explore <span className="font-extrabold text-red-600">1000+</span>{" "}
              {activeSearchTab === "owners"
                ? "Owner Properties"
                : "Verified Properties"}
            </h2>

            {/* ── Search bar card ── */}
            <form onSubmit={handleSearch}>
              <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-3 flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                {/* City */}
                <div className="flex items-center px-4 py-3 lg:py-1 min-w-[120px]">
                  <BarDropdown
                    label="Select City"
                    placeholder="Ahmedabad"
                    options={CITIES.map((c) => ({ label: c, value: c }))}
                    value={selectedCity}
                    onChange={setSelectedCity}
                  />
                </div>

                {/* Search By */}
                <div
                  ref={searchRef}
                  className="flex-1 flex items-center px-4 py-3 lg:py-1 relative min-w-[160px]"
                >
                  <div className="flex flex-col w-full">
                    <span className="text-[10px] font-semibold text-gray-500 mb-0.5">
                      Search By
                    </span>
                    <input
                      type="text"
                      value={searchBy}
                      onChange={handleSearchByChange}
                      onFocus={() => {
                        if (
                          suggestions.areas?.length > 0 ||
                          suggestions.projects?.length > 0
                        ) {
                          updateAutocompleteCoords();
                          setShowSuggestions(true);
                        }
                      }}
                      placeholder="Area/project/builder"
                      className="text-sm text-gray-700 focus:outline-none placeholder-gray-400 bg-transparent w-full"
                    />
                  </div>

                  {/* Autocomplete */}
                  {showSuggestions &&
                    (suggestions.areas?.length > 0 ||
                      suggestions.projects?.length > 0 ||
                      suggestions.cities?.length > 0) && (
                      <div
                        style={{
                          position: "fixed",
                          top: autocompleteCoords.top,
                          left: autocompleteCoords.left,
                          width: autocompleteCoords.width,
                          zIndex: 9999,
                        }}
                        className="bg-white shadow-2xl rounded-xl max-h-56 overflow-y-auto border border-gray-100"
                        onScroll={(e) => e.stopPropagation()}
                      >
                        {suggestions.areas?.map((area) => (
                          <button
                            key={area._id}
                            type="button"
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2"
                            onClick={() => {
                              setSearchBy(area.name);
                              setShowSuggestions(false);
                            }}
                          >
                            <FiMapPin size={12} className="text-gray-400" />{" "}
                            {area.name}
                          </button>
                        ))}
                        {suggestions.cities?.map((city) => (
                          <button
                            key={city._id}
                            type="button"
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700"
                            onClick={() => {
                              setSelectedCity(city.name);
                              setShowSuggestions(false);
                            }}
                          >
                            {city.name}
                          </button>
                        ))}
                        {suggestions.projects?.map((project) => (
                          <button
                            key={project._id}
                            type="button"
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700"
                            onClick={() => {
                              router.push(
                                `/project-page/${encodeURIComponent(project.slug || project._id)}`,
                              );
                              setShowSuggestions(false);
                            }}
                          >
                            {project.projectName}
                          </button>
                        ))}
                      </div>
                    )}
                </div>

                {/* BHK, Budget & Filter row on Mobile */}
                <div className="flex flex-wrap sm:flex-nowrap items-center divide-x divide-gray-200">
                  {/* BHK */}
                  <div className="flex-1 sm:flex-none flex items-center px-4 py-3 lg:py-1 min-w-[110px]">
                    <BarDropdown
                      label="Select BHK"
                      placeholder="BHK"
                      options={BHK_OPTIONS}
                      value={selectedBhk}
                      onChange={setSelectedBhk}
                    />
                  </div>

                  {/* Budget */}
                  <div className="flex-[2] sm:flex-none flex items-center px-4 py-3 lg:py-1 min-w-[130px]">
                    <BarDropdown
                      label="Select Budget"
                      placeholder="Budget"
                      options={BUDGET_OPTIONS}
                      value={minBudget}
                      onChange={setMinBudget}
                    />
                  </div>

                  {/* Filter */}
                  <div className="flex items-center px-4 py-3 lg:py-1 lg:border-l lg:border-gray-200">
                    <button
                      type="button"
                      onClick={() => setFilterOpen(true)}
                      className="relative flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <FiSliders size={14} />
                      <span className="hidden sm:inline">Filter</span>
                      {activeFilterCount > 0 && (
                        <span className="absolute -top-2.5 -right-3 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Search CTA */}
                <div className="p-2 lg:p-0 lg:ml-auto">
                  <button
                    type="submit"
                    className="w-full lg:w-auto flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-7 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <span className="lg:hidden">
                      <FiSearch size={16} />
                    </span>
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* ── Popular Localities ── */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[12px] font-semibold text-gray-600 flex items-center gap-1 flex-shrink-0">
                Popular Localities <FiArrowRight size={11} />
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
                  className="px-3.5 py-1 rounded-full border border-red-200 bg-white/70 hover:bg-red-600 hover:text-white hover:border-red-600 text-xs font-medium text-gray-700 transition-all duration-150 cursor-pointer"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Modal */}
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleModalApply}
        initial={{
          city: selectedCity,
          q: searchBy,
          bhks: selectedBhk ? [selectedBhk] : [],
          minBudget,
          maxBudget: "",
          propertyTypes: [],
          possessions: [],
      />

      {/* CSS style for full page modal on mobile */}
      <style jsx global>{`
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
    </>
  );
}
