import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js"; // adjust if your import path differs
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

    // Status
    if (getParam("status")) {
      filters.status = getParam("status");
    }

    // Unit Type inside projectSpecification
    if (getParam("unitType")) {
      filters.projectSpecification = {
        $elemMatch: { unitType: getParam("unitType") }
      };
    }

    // Price Filter
    const minBudget = parseFloat(getParam("minBudget"));
    const maxBudget = parseFloat(getParam("maxBudget"));
    if (!isNaN(minBudget) || !isNaN(maxBudget)) {
      const priceFilter = {};
      if (!isNaN(minBudget)) priceFilter.priceMax = { $gte: minBudget };
      if (!isNaN(maxBudget)) priceFilter.priceMin = { $lte: maxBudget };

      Object.assign(filters, priceFilter);
    }

    // Carpet Area
    const carpetAreaMin = parseFloat(getParam("carpetAreaMin"));
    const carpetAreaMax = parseFloat(getParam("carpetAreaMax"));
    if (!isNaN(carpetAreaMin) || !isNaN(carpetAreaMax)) {
      const areaFilter = {};
      if (!isNaN(carpetAreaMin)) areaFilter.$gte = carpetAreaMin;
      if (!isNaN(carpetAreaMax)) areaFilter.$lte = carpetAreaMax;

      filters.$and = filters.$and || [];
      filters.$and.push({
        $or: [{ carpetAreaMin: areaFilter }, { carpetAreaMax: areaFilter }]
      });
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

      const [matchingBuilders, matchingAreas] = await Promise.all([
        Builder.find({ name: regex }).select("_id"),
        Area.find({ name: regex }).select("_id")
      ]);

      const builderIds = matchingBuilders.map((b) => b._id);
      const areaIds = matchingAreas.map((a) => a._id);

      filters.$or = [
        { projectName: regex },
        { address: regex },
        { city: regex },
        { reraNumber: regex },
        { description: regex },
        { usps: { $elemMatch: { $regex: regex } } },
        ...(builderIds.length > 0 ? [{ builder: { $in: builderIds } }] : []),
        ...(areaIds.length > 0 ? [{ area: { $in: areaIds } }] : [])
      ];
    }

    console.log("Applied filters:", JSON.stringify(filters, null, 2));

    const projects = await Project.find(filters)
      .populate("builder area state city")
      .sort({ createdAt: -1 });

    console.log(projects);

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
