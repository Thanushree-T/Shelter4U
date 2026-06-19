"use client";

import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question:
      "Why choose Shelter4U as your real estate consultant in Ahmedabad & Gandhinagar ?",
    answer:
      "Shelter4U is a trusted name when it comes to real estate consultants in Ahmedabad and Gandhinagar. Our team of 100+ expert property specialists and real estate advisors guide you in buying, selling, and investing in both cities with ease. We offer zero-brokerage listings, verified projects, and end-to-end support throughout your property journey.",
  },
  {
    question:
      "What services does a property consultant in Ahmedabad & Gandhinagar provide ?",
    answer:
      "A property consultant in Ahmedabad & Gandhinagar helps with property search, site visits, negotiation, and complete investment guidance. Whether you need a housing consultant or a real estate expert, Shelter4U offers end-to-end solutions.",
  },
  {
    question:
      "How do real estate advisors in Ahmedabad differ from property specialists in Gandhinagar ?",
    answer:
      "A real estate advisor provides strategic investment insights, while a property specialist focuses on finding the right residential or commercial property for you. At Shelter4U, our team combines both to deliver maximum value in Ahmedabad & Gandhinagar. Though these two are twin cities, both have their own market dynamics. At Shelter4U we specialize in actual market level knowledge, expertise and intel to be able guide and advise on the correct property choice.",
  },
  {
    question:
      "Can I find a real estate consultant near me in Ahmedabad or Gandhinagar ?",
    answer:
      "Yes, Shelter4U is your local real estate consultant near Ahmedabad and Gandhinagar. With strong market expertise and a wide network, we ensure you get the best options close to your preferred location.",
  },
  {
    question:
      "Why is it important to hire a real estate expert in Ahmedabad & Gandhinagar ?",
    answer:
      "Working with a real estate expert in Ahmedabad and Gandhinagar ensures safe transactions, verified properties, and smart investments. With Shelter4U as your property consultant, you get a trusted partner for every real estate decision.",
  },
  {
    question: "Where to buy property in Ahmedabad & Gandhinagar ?",
    answer:
      "Both Ahmedabad and Gandhinagar are fast growing cities. Hence there are multiple hotspots for real estate purchase which provide both value for money and strong future growth potential. To get the best advice on property purchase that suits your lifestyle, choices, aspirations and budget, it is best to contact Shelter4U. With a team of 100+ property experts, they are best suited to guide you and make your home purchase journey a memorable one.",
  },
  {
    question:
      "Why is it important to hire a real estate expert in Ahmedabad and Gandhinagar ?",
    answer: "Experts ensure a smart and secure purchase by providing:",
    list: [
      "Market Price Trends",
      "Project Comparison",
      "Negotiation & Site Visit Support",
      "Documentation Support",
      "Loan Assistance",
    ],
  },
  {
    question:
      " Who is the best property consultant in Ahmedabad & Gandhinagar ?",
    answer:
      "Shelter4U is widely regarded as the best property consultant in Ahmedabad and Gandhinagar. Known for their in-depth market knowledge, transparent dealings, and client-centric approach, Shelter4U offers expert guidance in buying, selling, and investing in residential and commercial properties across both cities.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section id="faq" className="pb-4 md:pb-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
          Frequently asked questions
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              {/* Question row */}
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm sm:text-base font-medium text-gray-800 pr-4">
                  {faq.question}
                </span>
                {openIndex === idx ? (
                  <FiChevronUp className="shrink-0 text-gray-500 h-5 w-5" />
                ) : (
                  <FiChevronDown className="shrink-0 text-gray-500 h-5 w-5" />
                )}
              </button>

              {/* Answer panel */}
              {openIndex === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                  {faq.list && faq.list.length > 0 && (
                    <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
                      {faq.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
