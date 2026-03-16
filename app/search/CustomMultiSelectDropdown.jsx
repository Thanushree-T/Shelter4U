"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheckSquare, FiSquare } from "react-icons/fi";

const CustomMultiSelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedValues = value ? value.split(",").map(v => v.trim()).filter(Boolean) : [];

  const toggleOption = (optionValue) => {
    let newValues;
    if (selectedValues.includes(optionValue)) {
      newValues = selectedValues.filter(v => v !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }
    onChange(newValues.join(","));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let displayedText = placeholder;
  if (selectedValues.length === 1) {
    displayedText = selectedValues[0];
  } else if (selectedValues.length > 1) {
    displayedText = `${selectedValues.length} Selected`;
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium focus:outline-none border-b border-gray-200 pb-1 w-full focus:border-red-500 transition-colors bg-transparent pr-5 text-left flex justify-between items-center"
      >
        <span className={selectedValues.length > 0 ? 'text-gray-800 truncate' : 'text-gray-400 truncate'}>
          {displayedText}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} flex-shrink-0 ml-2`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-white shadow-lg rounded-md z-20 border border-gray-200">
          <ul className="max-h-[15rem] overflow-y-auto py-1 custom-scrollbar">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <li
                  key={option}
                  onClick={() => toggleOption(option)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 cursor-pointer flex items-center gap-2"
                >
                  {isSelected ? (
                    <FiCheckSquare className="text-red-600 flex-shrink-0" />
                  ) : (
                    <FiSquare className="text-gray-400 flex-shrink-0" />
                  )}
                  <span className="truncate">{option}</span>
                </li>
              );
            })}
            {options.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelectDropdown;
