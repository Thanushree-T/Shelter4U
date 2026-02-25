import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONGO_URI = process.env.MONGO_CONN_ADMIN;

if (!MONGO_URI) {
  console.error("MONGO_CONN_ADMIN is not defined in environment variables");
  process.exit(1);
}

// Minimal schemas for fetching paths
const ProjectSchema = new mongoose.Schema({
  slug: String,
});

const CareerSchema = new mongoose.Schema({
  active: Boolean,
});

const AreaSchema = new mongoose.Schema({ name: String });
const CitySchema = new mongoose.Schema({ name: String });

// Search filter dimensions — match exactly what SearchPage.jsx supports
const UNIT_TYPES = ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "6BHK"];
const PROJECT_TYPES = ["Residential", "Commercial", "Land"];
const STATUSES = ["Under Construction", "Ready to Move"];

function buildSearchUrls({ cities, areas }) {
  const urls = new Set();

  // 1. City-only
  for (const city of cities) {
    urls.add(`/search?city=${encodeURIComponent(city)}`);

    // 2. City + unitType
    for (const unit of UNIT_TYPES) {
      urls.add(`/search?city=${encodeURIComponent(city)}&unitType=${unit}`);
    }

    // 3. City + projectType
    for (const ptype of PROJECT_TYPES) {
      urls.add(
        `/search?city=${encodeURIComponent(city)}&projectType=${encodeURIComponent(ptype)}`,
      );
    }

    // 4. City + status
    for (const status of STATUSES) {
      urls.add(
        `/search?city=${encodeURIComponent(city)}&status=${encodeURIComponent(status)}`,
      );
    }

    // 5. City + unitType + status
    for (const unit of UNIT_TYPES) {
      for (const status of STATUSES) {
        urls.add(
          `/search?city=${encodeURIComponent(city)}&unitType=${unit}&status=${encodeURIComponent(status)}`,
        );
      }
    }
  }

  // 6. Area-only
  for (const area of areas) {
    urls.add(`/search?area=${encodeURIComponent(area)}`);

    // 7. Area + unitType
    for (const unit of UNIT_TYPES) {
      urls.add(`/search?area=${encodeURIComponent(area)}&unitType=${unit}`);
    }
  }

  // 8. unitType-only (global search, no city/area filter)
  for (const unit of UNIT_TYPES) {
    urls.add(`/search?unitType=${unit}`);
  }

  // 9. projectType-only
  for (const ptype of PROJECT_TYPES) {
    urls.add(`/search?projectType=${encodeURIComponent(ptype)}`);
  }

  return [...urls];
}

async function fetchPaths() {
  try {
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.createConnection(MONGO_URI).asPromise();
    console.log("Connected.");

    const Project = conn.model("Project", ProjectSchema);
    const Career = conn.model("Career", CareerSchema);
    const Area = conn.model("Area", AreaSchema);
    const City = conn.model("City", CitySchema);

    const [projects, careers, areas, cities] = await Promise.all([
      Project.find({}, "slug").lean(),
      Career.find({ active: true }, "_id").lean(),
      Area.find({}, "name").lean(),
      City.find({}, "name").lean(),
    ]);

    const areaNames = areas.map((a) => a.name).filter(Boolean);
    const cityNames = cities.map((c) => c.name).filter(Boolean);

    const searchUrls = buildSearchUrls({ cities: cityNames, areas: areaNames });

    const paths = [
      // All project detail pages
      ...projects.map((p) => `/project-page/${p.slug}`),
      // All career detail pages
      ...careers.map((c) => `/about/career/${c._id}`),
      // All search filter URLs
      ...searchUrls,
    ];

    fs.writeFileSync(
      path.join(__dirname, "..", "dynamic-paths.json"),
      JSON.stringify(paths, null, 2),
    );

    console.log(`✅ Wrote ${paths.length} paths to dynamic-paths.json`);
    console.log(`   → ${projects.length} project pages`);
    console.log(`   → ${careers.length} career pages`);
    console.log(`   → ${searchUrls.length} search filter URLs`);

    await conn.close();
  } catch (error) {
    console.error("Error fetching paths:", error);
    process.exit(1);
  }
}

fetchPaths();
