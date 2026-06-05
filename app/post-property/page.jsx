import { models, connectToDBs } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";
import PostPropertyForm from "./PostPropertyForm";

export const metadata = {
  title: "Submit Property | Direct Owner Zero Brokerage | Shelter4U",
  description: "Post your property for free on Shelter4U and sell or rent it directly to verified buyers with zero brokerage.",
};

export default async function PostPropertyPage() {
  await connectToDBs();
  const { Area, City, State } = models;
  
  let areas = [];
  let cities = [];
  let states = [];
  
  try {
    const [areasArr, citiesArr, statesArr] = await Promise.all([
      Area.find().sort({ name: 1 }).lean(),
      City.find().sort({ name: 1 }).lean(),
      State.find().sort({ name: 1 }).lean()
    ]);
    
    areas = serializeMongo(areasArr || []);
    cities = serializeMongo(citiesArr || []);
    states = serializeMongo(statesArr || []);
  } catch (error) {
    console.error("Failed to load areas/cities/states for post property form:", error);
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Post Your Property <span className="text-red-600 font-extrabold">Zero Brokerage</span>
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            Connect directly with verified buyers and tenants. List your property for free and save lakhs in commission fees.
          </p>
        </div>
        
        <PostPropertyForm areas={areas} cities={cities} states={states} />
      </div>
    </div>
  );
}
