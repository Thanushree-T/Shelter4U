import Link from "next/link";

/**
 * PropertyOptions
 *
 * A static section displaying pre-configured search shortcuts
 * grouped into 5 columns (matches the reference design).
 * Each link navigates to /search with the relevant URL params
 * so that the search page filters are automatically applied.
 *
 * This is a Server Component — no "use client" needed.
 */

const CITY = "Ahmedabad";

// Price values in rupees (match the basePriceOptions in SearchPage.jsx)
const PRICE = {
  "50L": "5000000",
  "75L": "7500000",
  "1Cr": "10000000",
  "1.5Cr": "15000000", // not in dropdown but used for budget copy
  "2Cr": "20000000",
  "3Cr": "30000000",
  "80L": "8000000",
  "70L": "7000000",
};

const columns = [
  {
    heading: "Popular BHK Searches",
    links: [
      {
        label: `2 BHK Flats in ${CITY}`,
        href: `/search?unitType=2BHK&city=${CITY}`,
      },
      {
        label: `2.5 BHK Flats in ${CITY}`,
        href: `/search?unitType=2BHK&city=${CITY}`,
      },
      {
        label: `3 BHK Flats in ${CITY}`,
        href: `/search?unitType=3BHK&city=${CITY}`,
      },
      {
        label: `4 BHK Flats in ${CITY}`,
        href: `/search?unitType=4BHK&city=${CITY}`,
      },
      {
        label: `5 BHK Flats in ${CITY}`,
        href: `/search?unitType=5BHK&city=${CITY}`,
      },
      {
        label: `6 BHK Flats in ${CITY}`,
        href: `/search?unitType=6BHK&city=${CITY}`,
      },
      {
        label: `3 BHK with Penthouse`,
        href: `/search?unitType=3BHK&projectSubType=Penthouse&city=${CITY}`,
      },
      {
        label: `4 BHK with Penthouse`,
        href: `/search?unitType=4BHK&projectSubType=Penthouse&city=${CITY}`,
      },
      {
        label: `5 BHK with Penthouse`,
        href: `/search?unitType=5BHK&projectSubType=Penthouse&city=${CITY}`,
      },
      { label: `4 BHK Duplex`, href: `/search?unitType=4BHK&city=${CITY}` },
      { label: `5 BHK Duplex`, href: `/search?unitType=5BHK&city=${CITY}` },
    ],
  },
  {
    heading: "Popular Flat Searches",
    links: [
      {
        label: `Flats in Iscon Ambli`,
        href: `/search?area=Iscon+Ambli&city=${CITY}`,
      },
      {
        label: `Flats in Science City`,
        href: `/search?area=Science+City&city=${CITY}`,
      },
      {
        label: `Flats in Vaishnodevi`,
        href: `/search?area=Vaishnodevi&city=${CITY}`,
      },
      { label: `Flats in Shilaj`, href: `/search?area=Shilaj&city=${CITY}` },
      { label: `Flats in Shela`, href: `/search?area=Shela&city=${CITY}` },
      { label: `Flats in Gota`, href: `/search?area=Gota&city=${CITY}` },
      {
        label: `Flats in Sindhubhavan Road`,
        href: `/search?area=Sindhubhavan+Road&city=${CITY}`,
      },
      {
        label: `Flats in Linkin Road`,
        href: `/search?area=Linkin+Road&city=${CITY}`,
      },
      { label: `Flats in Bopal`, href: `/search?area=Bopal&city=${CITY}` },
      { label: `Flats in Thaltej`, href: `/search?area=Thaltej&city=${CITY}` },
      {
        label: `Flats in Bodakdev`,
        href: `/search?area=Bodakdev&city=${CITY}`,
      },
    ],
  },
  {
    heading: "Budget wise Searches",
    links: [
      {
        label: `Flats under 50 lakhs in ${CITY}`,
        href: `/search?city=${CITY}&maxBudget=${PRICE["50L"]}`,
      },
      {
        label: `Flats under 75 lakhs in ${CITY}`,
        href: `/search?city=${CITY}&maxBudget=${PRICE["75L"]}`,
      },
      {
        label: `Flats under 1 Cr in ${CITY}`,
        href: `/search?city=${CITY}&maxBudget=${PRICE["1Cr"]}`,
      },
      {
        label: `2 BHK Flats under 70 lakhs`,
        href: `/search?city=${CITY}&unitType=2BHK&maxBudget=${PRICE["70L"]}`,
      },
      {
        label: `3 BHK Flats under 80 Lakhs`,
        href: `/search?city=${CITY}&unitType=3BHK&maxBudget=${PRICE["80L"]}`,
      },
      {
        label: `3 BHK Flats under 1 Cr`,
        href: `/search?city=${CITY}&unitType=3BHK&maxBudget=${PRICE["1Cr"]}`,
      },
      {
        label: `3 BHK Flats under 1.5 Cr`,
        href: `/search?city=${CITY}&unitType=3BHK&maxBudget=${PRICE["1.5Cr"]}`,
      },
      {
        label: `4 BHK Flats under 3 Cr`,
        href: `/search?city=${CITY}&unitType=4BHK&maxBudget=${PRICE["3Cr"]}`,
      },
    ],
  },
  {
    heading: "Popular 3 BHK Searches",
    links: [
      {
        label: `3 BHK Apartments in Gota`,
        href: `/search?unitType=3BHK&area=Gota&city=${CITY}`,
      },
      {
        label: `3 BHK Flats in Shilaj`,
        href: `/search?unitType=3BHK&area=Shilaj&city=${CITY}`,
      },
      {
        label: `3 BHK Flats in Gota`,
        href: `/search?unitType=3BHK&area=Gota&city=${CITY}`,
      },
      {
        label: `3 BHK Apartments in Shela`,
        href: `/search?unitType=3BHK&area=Shela&city=${CITY}`,
      },
      {
        label: `3 BHK Flats in Shela`,
        href: `/search?unitType=3BHK&area=Shela&city=${CITY}`,
      },
      {
        label: `3 BHK Apartments in Linkin Road`,
        href: `/search?unitType=3BHK&area=Linkin+Road&city=${CITY}`,
      },
      {
        label: `3 BHK Flats in Linkin Road`,
        href: `/search?unitType=3BHK&area=Linkin+Road&city=${CITY}`,
      },
      {
        label: `3 BHK Apartments in Shilaj`,
        href: `/search?unitType=3BHK&area=Shilaj&city=${CITY}`,
      },
      {
        label: `3 BHK Apartments in Vaishnodevi`,
        href: `/search?unitType=3BHK&area=Vaishnodevi&city=${CITY}`,
      },
      {
        label: `3 BHK Flats in Vaishnodevi`,
        href: `/search?unitType=3BHK&area=Vaishnodevi&city=${CITY}`,
      },
      {
        label: `3 BHK in Adani Shantigram`,
        href: `/search?unitType=3BHK&area=Adani+Shantigram&city=${CITY}`,
      },
      {
        label: `3 BHK in Jagatpur`,
        href: `/search?unitType=3BHK&area=Jagatpur&city=${CITY}`,
      },
    ],
  },
  {
    heading: "Popular 4 BHK Searches",
    links: [
      {
        label: `4 BHK Apartments in Ambli`,
        href: `/search?unitType=4BHK&area=Ambli&city=${CITY}`,
      },
      {
        label: `4 BHK Apartments in Science City`,
        href: `/search?unitType=4BHK&area=Science+City&city=${CITY}`,
      },
      {
        label: `4 BHK Apartments in Sindhubhavan Road`,
        href: `/search?unitType=4BHK&area=Sindhubhavan+Road&city=${CITY}`,
      },
      {
        label: `4 BHK Apartments in Thaltej`,
        href: `/search?unitType=4BHK&area=Thaltej&city=${CITY}`,
      },
      {
        label: `4 BHK Flats in Ambli`,
        href: `/search?unitType=4BHK&area=Ambli&city=${CITY}`,
      },
      {
        label: `4 BHK Flats in Bopal`,
        href: `/search?unitType=4BHK&area=Bopal&city=${CITY}`,
      },
      {
        label: `4 BHK Flats in Sindhubhavan Road`,
        href: `/search?unitType=4BHK&area=Sindhubhavan+Road&city=${CITY}`,
      },
      {
        label: `4 BHK Flats in Thaltej`,
        href: `/search?unitType=4BHK&area=Thaltej&city=${CITY}`,
      },
      {
        label: `4 BHK Flats in Bodakdev ${CITY}`,
        href: `/search?unitType=4BHK&area=Bodakdev&city=${CITY}`,
      },
      {
        label: `4 BHK Flats in Bopal`,
        href: `/search?unitType=4BHK&area=Bopal&city=${CITY}`,
      },
      {
        label: `4 BHK Apartments in Science City`,
        href: `/search?unitType=4BHK&area=Science+City&city=${CITY}`,
      },
      {
        label: `4 BHK Flat in Iscon Ambli`,
        href: `/search?unitType=4BHK&area=Iscon+Ambli&city=${CITY}`,
      },
    ],
  },
];

export default function PropertyOptions() {
  return (
    <section
      id="property-options"
      className="pb-10 px-4 sm:px-6 lg:px-8 bg-white border-gray-100"
    >
      <div className="max-w-7xl mx-auto rounded-xl  pb-6 sm:p-8">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Property Options in {CITY}
        </h2>

        {/* 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {columns.map((col) => (
            <div key={col.heading}>
              {/* Column heading */}
              <p className="text-sm font-semibold text-gray-900 mb-3">
                {col.heading}
              </p>

              {/* Link list */}
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm  text-gray-700 hover:text-red-600 transition-colors leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
