// app/api/project-page/[id]/similar/route.js
import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { Project } = models;

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const project = await Project.findById(id).select("area builder");
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    const [sameAreaSameBuilder, sameAreaDiffBuilder, diffAreaSameBuilder] =
      await Promise.all([
        Project.find({
          _id: { $ne: project._id },
          area: project.area,
          builder: project.builder,
        })
          .limit(5)
          .populate("area", ["_id", "name"])
          .populate("builder", ["_id", "name"])
          .populate("state", ["_id", "name"])
          .populate("city", ["_id", "name"]),

        Project.find({
          _id: { $ne: project._id },
          area: project.area,
          builder: { $ne: project.builder },
        })
          .limit(5)
          .populate("area", ["_id", "name"])
          .populate("builder", ["_id", "name"])
          .populate("state", ["_id", "name"])
          .populate("city", ["_id", "name"]),

        Project.find({
          _id: { $ne: project._id },
          area: { $ne: project.area },
          builder: project.builder,
        })
          .limit(5)
          .populate("area", ["_id", "name"])
          .populate("builder", ["_id", "name"])
          .populate("state", ["_id", "name"])
          .populate("city", ["_id", "name"]),
      ]);

    const similarProjects = [
      ...sameAreaSameBuilder,
      ...sameAreaDiffBuilder,
      ...diffAreaSameBuilder,
    ].slice(0, 5);

    if (!similarProjects.length) {
      return NextResponse.json({ message: "No similar projects found" }, { status: 404 });
    }

    return NextResponse.json(similarProjects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
