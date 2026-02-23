import React from "react";
import SearchPageClient from "./SearchPage.jsx";
import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const parts = [];

  if (params.projectType) parts.push(params.projectType);
  if (params.city) parts.push(`in ${params.city}`);
  if (params.q) parts.push(`- "${params.q}"`);

  const title =
    parts.length > 0 ? `Properties ${parts.join(" ")}` : "Search Properties";

  return {
    title: title,
    description: `Find your dream property. Search results for ${parts.join(" ")} on Shelter4U.`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

const { Project, City, State, Area, Builder } = models;

async function fetchInitialProjects(searchParams) {
  try {
    const params = await searchParams;
    const filters = {};

    const get = (key) => params?.[key] || null;

    if (get("projectType")) filters.projectType = { $in: [get("projectType")] };
    if (get("projectSubType"))
      filters.projectSubType = { $in: [get("projectSubType")] };
    if (get("status"))
      filters.projectSpecification = { $elemMatch: { status: get("status") } };
    if (get("unitType"))
      filters.projectSpecification = {
        $elemMatch: { unitType: get("unitType") },
      };

    const minBudget = parseFloat(get("minBudget"));
    const maxBudget = parseFloat(get("maxBudget"));
    if (!isNaN(minBudget) || !isNaN(maxBudget)) {
      const priceConditions = [];
      if (!isNaN(minBudget) && !isNaN(maxBudget)) {
        priceConditions.push({
          $and: [
            {
              $or: [
                { $expr: { $lte: [{ $toDouble: "$minPrice" }, maxBudget] } },
                { minPrice: { $exists: false } },
                { minPrice: "" },
                { minPrice: null },
              ],
            },
            {
              $or: [
                { $expr: { $gte: [{ $toDouble: "$maxPrice" }, minBudget] } },
                { maxPrice: { $exists: false } },
                { maxPrice: "" },
                { maxPrice: null },
              ],
            },
          ],
        });
      } else if (!isNaN(minBudget)) {
        priceConditions.push({
          $or: [
            { $expr: { $gte: [{ $toDouble: "$maxPrice" }, minBudget] } },
            { maxPrice: { $exists: false } },
            { maxPrice: "" },
            { maxPrice: null },
          ],
        });
      } else {
        priceConditions.push({
          $or: [
            { $expr: { $lte: [{ $toDouble: "$minPrice" }, maxBudget] } },
            { minPrice: { $exists: false } },
            { minPrice: "" },
            { minPrice: null },
          ],
        });
      }
      filters.$and = filters.$and || [];
      filters.$and.push(...priceConditions);
    }

    if (get("city")) {
      const cityDoc = await City.findOne({
        name: { $regex: get("city"), $options: "i" },
      }).lean();
      if (cityDoc) filters.city = cityDoc._id;
      else return [];
    }

    if (get("state")) {
      const stateDoc = await State.findOne({
        name: { $regex: get("state"), $options: "i" },
      }).lean();
      if (stateDoc) filters.state = stateDoc._id;
      else return [];
    }

    if (get("area")) {
      const areaDoc = await Area.findOne({
        name: { $regex: get("area"), $options: "i" },
      }).lean();
      if (areaDoc) filters.area = areaDoc._id;
      else return [];
    }

    if (get("q")) {
      const regex = new RegExp(get("q"), "i");
      const [matchingBuilders, matchingAreas, matchingCities, matchingStates] =
        await Promise.all([
          Builder.find({ name: regex }).select("_id").lean(),
          Area.find({ name: regex }).select("_id").lean(),
          City.find({ name: regex }).select("_id").lean(),
          State.find({ name: regex }).select("_id").lean(),
        ]);
      filters.$or = [
        { projectName: regex },
        { address: regex },
        { reraNumber: regex },
        { usps: { $elemMatch: { $regex: regex } } },
        ...(matchingBuilders.length > 0
          ? [{ builder: { $in: matchingBuilders.map((b) => b._id) } }]
          : []),
        ...(matchingAreas.length > 0
          ? [{ area: { $in: matchingAreas.map((a) => a._id) } }]
          : []),
        ...(matchingCities.length > 0
          ? [{ city: { $in: matchingCities.map((c) => c._id) } }]
          : []),
        ...(matchingStates.length > 0
          ? [{ state: { $in: matchingStates.map((s) => s._id) } }]
          : []),
      ];
    }

    const projects = await Project.find(filters)
      .populate("builder area state city")
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    return projects;
  } catch (error) {
    console.error("Error fetching initial projects on server:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }) {
  const initialProjects = await fetchInitialProjects(searchParams);
  return <SearchPageClient initialProjects={serializeMongo(initialProjects)} />;
}
