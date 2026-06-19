import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";
import PropertyClientPage from "./PropertyClientPage";

const { Property } = models;

async function getProperty(id) {
  try {
    const property = await Property.findById(id)
      .populate("area", ["_id", "name"])
      .populate("city", ["_id", "name"])
      .populate("state", ["_id", "name"])
      .lean();
    return property || null;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return {
      title: "Property Not Found | Shelter4U",
      description: "The requested property listing does not exist or has been removed.",
    };
  }

  return {
    title: `${property.title} | Shelter4U`,
    description: property.description || `Explore ${property.title}, a premium property listed on Shelter4U.`,
    keywords: [
      property.title,
      property.propertyType,
      "real estate",
      "Shelter4U",
      "zero brokerage",
      `property in ${property.city?.name || ""}`,
    ],
    openGraph: {
      title: `${property.title} | Shelter4U`,
      description: property.description || `Explore details of ${property.title}.`,
      url: `/property-page/${id}`,
      type: "article",
      images: [
        {
          url: property.images?.[0]?.url || "/logo.png",
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    alternates: { canonical: `/property-page/${id}` },
    robots: { index: true, follow: true },
  };
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = await getProperty(id);
  
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
        <p className="text-gray-600 mb-4">The listing you are looking for has been removed or does not exist.</p>
        <a href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-lg text-sm transition">
          Go Back Home
        </a>
      </div>
    );
  }

  return <PropertyClientPage property={serializeMongo(property)} />;
}
