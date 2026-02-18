import { models } from "@/lib/connections.js";
const { Project } = models;

// GET endpoint to fetch only recommended projects
export async function GET(req) {
  try {

    const projects = await Project.find({ isRecommended: true })
      .populate("area", ["_id", "name"])
      .populate("builder", ["_id", "name"])
      .populate("state", ["_id", "name"])
      .populate("city", ["_id", "name"])
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify({ success: true, data: projects }), {
      status: 200,
    });
  } catch (error) {
    console.error("Project fetch error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}



