import Link from "next/link";

/**
 * PropertyOptions
 *
 * Shows 4 columns of popular search shortcuts that navigate to /search
 * with relevant URL params pre-applied.
 *
 * Server Component — no "use client" needed.
 */

const CITY = "Ahmedabad";

const columns = [
  {
    heading: "Trending Searches",
    links: [
      {
        label: "2 BHK Apartments in Ahmedabad",
        href: `/search?unitType=2BHK&city=${CITY}`,
      },
      {
        label: "Ready to move property in Vaishnodevi",
        href: `/search?area=Vaishnodevi&city=${CITY}&status=Ready+to+Move`,
      },
      {
        label: "3 BHK Apartments in Gota",
        href: `/search?unitType=3BHK&area=Gota&city=${CITY}`,
      },
      {
        label: "2 BHK Apartments in SG Highway",
        href: `/search?unitType=2BHK&area=SG+Highway&city=${CITY}`,
      },
    ],
  },
  {
    heading: "By Status",
    links: [
      {
        label: "Underconstruction property in Ahmedabad",
        href: `/search?city=${CITY}&status=Under+Construction`,
      },
      {
        label: "4 BHK Luxury Apartments in Bodakdev",
        href: `/search?unitType=4BHK&area=Bodakdev&city=${CITY}`,
      },
      {
        label: "Apartments for sale in Iscon-Ambli",
        href: `/search?area=Iscon+Ambli&city=${CITY}`,
      },
      {
        label: "5 BHK Bungalows in Ahmedabad",
        href: `/search?unitType=5BHK&city=${CITY}`,
      },
    ],
  },
  {
    heading: "By Area",
    links: [
      {
        label: "2 BHK in Jagatpur Ahmedabad",
        href: `/search?unitType=2BHK&area=Jagatpur&city=${CITY}`,
      },
      {
        label: "4 BHK Flats in Ambli",
        href: `/search?unitType=4BHK&area=Ambli&city=${CITY}`,
      },
      {
        label: "5 BHK Ultra Luxury Apartments in Ahmedabad",
        href: `/search?unitType=5BHK&city=${CITY}`,
      },
      {
        label: "Property for sale in Zundal",
        href: `/search?area=Zundal&city=${CITY}`,
      },
    ],
  },
  {
    heading: "More Options",
    links: [
      {
        label: "2 BHK Apartments for sale",
        href: `/search?unitType=2BHK&city=${CITY}`,
      },
      {
        label: "3 BHK flats in Zundal",
        href: `/search?unitType=3BHK&area=Zundal&city=${CITY}`,
      },
      {
        label: "4 BHK Bungalows in Vaishnodevi",
        href: `/search?unitType=4BHK&area=Vaishnodevi&city=${CITY}`,
      },
      {
        label: "2 BHK Ready to move flats",
        href: `/search?unitType=2BHK&status=Ready+to+Move&city=${CITY}`,
      },
    ],
  },
];

export default function PropertyOptions() {
  return (
    <section
      id="property-options"
      className="pb-4 md:pb-10 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto pb-6">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
          Quick Property Search in {CITY}
        </h2>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 md:gap-6">
          {columns.map((col) => (
            <div key={col.heading}>
              {/* <p className="text-sm font-semibold text-gray-900 mb-3">
                {col.heading}
              </p> */}
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 hover:text-red-600 transition-colors leading-snug"
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
