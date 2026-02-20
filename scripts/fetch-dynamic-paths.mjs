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

async function fetchPaths() {
  try {
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.createConnection(MONGO_URI).asPromise();
    console.log("Connected.");

    const Project = conn.model("Project", ProjectSchema);
    const Career = conn.model("Career", CareerSchema);

    const [projects, careers] = await Promise.all([
      Project.find({}, "slug").lean(),
      Career.find({ active: true }, "_id").lean(),
    ]);

    const paths = [
      ...projects.map((p) => `/project-page/${p.slug}`),
      ...careers.map((c) => `/about/career/${c._id}`),
    ];

    fs.writeFileSync(
      path.join(__dirname, "..", "dynamic-paths.json"),
      JSON.stringify(paths, null, 2),
    );

    console.log(`Successfully fetched ${paths.length} dynamic paths.`);
    await conn.close();
  } catch (error) {
    console.error("Error fetching paths:", error);
    process.exit(1);
  }
}

fetchPaths();
