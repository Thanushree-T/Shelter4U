import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { Project,Leads } = models;

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    // Validate the id
    if (!id) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }
    //with the help of project id we have populated area and builder
    //to get the name of area and builder
    const project = await Project.findById(id).populate("area", ["_id", "name"]).populate("builder", ["_id", "name"]).populate("state", ["_id", "name"]).populate("city", ["_id", "name"]);

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





