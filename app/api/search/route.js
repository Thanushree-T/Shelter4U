import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { Area, Builder, Project, City, State } = models;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {};

    // Extracting query parameters
    const getParam = (key) => searchParams.get(key);
    const getParamArray = (key) => {
      const val = getParam(key);
      return val ? val.split(",").map((v) => v.trim()) : [];
    };

    // Project Type
    if (getParam("projectType")) {
      filters.projectType = { $in: [getParam("projectType")] };
    }

    // Project Sub Type
    if (getParam("projectSubType")) {
      filters.projectSubType = { $in: [getParam("projectSubType")] };
    }

    // Status Filter
    if (getParam("status")) {
      filters.projectSpecification = {
        $elemMatch: { status: getParam("status") }
      };
    }

    // Unit Type inside projectSpecification
    if (getParam("unitType")) {
      filters.projectSpecification = {
        $elemMatch: { unitType: getParam("unitType") }
      };
    }

    // Fixed Price Filter
    const minBudget = parseFloat(getParam("minBudget"));
    const maxBudget = parseFloat(getParam("maxBudget"));
    
    if (!isNaN(minBudget) || !isNaN(maxBudget)) {
      const priceConditions = [];
      
      if (!isNaN(minBudget) && !isNaN(maxBudget)) {
        // Both min and max specified - project price range should overlap with user budget range
        priceConditions.push({
          $and: [
            { 
              $or: [
                { 
                  $expr: {
                    $lte: [{ $toDouble: "$minPrice" }, maxBudget]
                  }
                },
                { minPrice: { $exists: false } },
                { minPrice: "" },
                { minPrice: null }
              ]
            },
            { 
              $or: [
                { 
                  $expr: {
                    $gte: [{ $toDouble: "$maxPrice" }, minBudget]
                  }
                },
                { maxPrice: { $exists: false } },
                { maxPrice: "" },
                { maxPrice: null }
              ]
            }
          ]
        });
      } else if (!isNaN(minBudget)) {
        // Only minimum budget specified
        priceConditions.push({
          $or: [
            { 
              $expr: {
                $gte: [{ $toDouble: "$maxPrice" }, minBudget]
              }
            },
            { maxPrice: { $exists: false } },
            { maxPrice: "" },
            { maxPrice: null }
          ]
        });
      } else if (!isNaN(maxBudget)) {
        // Only maximum budget specified
        priceConditions.push({
          $or: [
            { 
              $expr: {
                $lte: [{ $toDouble: "$minPrice" }, maxBudget]
              }
            },
            { minPrice: { $exists: false } },
            { minPrice: "" },
            { minPrice: null }
          ]
        });
      }
      
      if (priceConditions.length > 0) {
        filters.$and = filters.$and || [];
        filters.$and.push(...priceConditions);
      }
    }

    // City
    if (getParam("city")) {
      const cityDoc = await City.findOne({
        name: { $regex: getParam("city"), $options: "i" }
      });
      if (cityDoc) {
        filters.city = cityDoc._id;
      } else {
        return NextResponse.json([], { status: 200 });
      }
    }

    // State
    if (getParam("state")) {
      const stateDoc = await State.findOne({
        name: { $regex: getParam("state"), $options: "i" }
      });
      if (stateDoc) {
        filters.state = stateDoc._id;
      } else {
        return NextResponse.json([], { status: 200 });
      }
    }

    // Area
    if (getParam("area")) {
      const areaDoc = await Area.findOne({
        name: { $regex: getParam("area"), $options: "i" }
      });
      if (areaDoc) {
        filters.area = areaDoc._id;
      } else {
        return NextResponse.json([], { status: 200 });
      }
    }

    // Amenities
    const amenities = getParamArray("amenities");
    if (amenities.length > 0) {
      filters.amenities = { $all: amenities };
    }

    // Global Keyword Search
    if (getParam("q")) {
      const regex = new RegExp(getParam("q"), "i");

      const [matchingBuilders, matchingAreas, matchingCities, matchingStates] = await Promise.all([
        Builder.find({ name: regex }).select("_id"),
        Area.find({ name: regex }).select("_id"),
        City.find({ name: regex }).select("_id"),
        State.find({ name: regex }).select("_id")
      ]);

      const builderIds = matchingBuilders.map((b) => b._id);
      const areaIds = matchingAreas.map((a) => a._id);
      const cityIds = matchingCities.map((c) => c._id);
      const stateIds = matchingStates.map((s) => s._id);


      filters.$or = [
        { projectName: regex },
        { address: regex },
        { reraNumber: regex },
        { usps: { $elemMatch: { $regex: regex } } },
        ...(builderIds.length > 0 ? [{ builder: { $in: builderIds } }] : []),
        ...(areaIds.length > 0 ? [{ area: { $in: areaIds } }] : []),
        ...(cityIds.length > 0 ? [{ city: { $in: cityIds } }] : []),
        ...(stateIds.length > 0 ? [{ state: { $in: stateIds }}] : []),
      ];
    }


    const projects = await Project.find(filters)
      .populate("builder area state city")
      .sort({ createdAt: -1 });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




