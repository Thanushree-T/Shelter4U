import { models } from "@/lib/connections.js";
const { Project } = models;

export async function GET() {
  try {
    const projects = await Project.find({ isRecommended: true })
      .populate("area", ["_id", "name"])
      .populate("builder", ["_id", "name"])
      .populate("state", ["_id", "name"])
      .populate("city", ["_id", "name"])
      .sort({ createdAt: -1 })
      .lean();

    return new Response(JSON.stringify({ success: true, data: projects }), {
      status: 200,
    });
  } catch (error) {
    console.error("Project fetch error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      },
    );
  }
}
