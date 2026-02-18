import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { Project,Leads } = models;


export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    // Validate the id
    if (!slug) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }

    const project = await Project.findOne({slug: slug}).populate("area", ["_id", "name"]).populate("builder", ["_id", "name"]).populate("state", ["_id", "name"]).populate("city", ["_id", "name"]);
    console.log(project);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const body = await request.json();
    const savedLead = await Leads.create(body); 
    return NextResponse.json(savedLead);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}


