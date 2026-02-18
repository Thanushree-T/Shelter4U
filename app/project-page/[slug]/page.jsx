import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import ProjectClientPage from "./ProjectClientPage";

const { Project } = models;

// Shared DB fetch — Next.js deduplicates this automatically within a single request
async function getProject(slug) {
  try {
    const project = await Project.findOne({ slug })
      .populate("area", ["_id", "name"])
      .populate("builder", ["_id", "name"])
      .populate("state", ["_id", "name"])
      .populate("city", ["_id", "name"])
      .lean();
    return project || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// Dynamic SEO Tags
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Shelter4U",
      description:
        "The requested property project does not exist or has been removed.",
    };
  }

  return {
    title: `${project.projectName} | Shelter4U`,
    description: `Explore ${project.projectName}, a premium real estate project listed on Shelter4U.`,
    keywords: [
      project.projectName,
      "real estate project",
      "Shelter4U project",
      "property listing",
      `project in ${project.city?.name || ""}`,
      "real estate India",
    ],
    openGraph: {
      title: `${project.projectName} | Shelter4U`,
      description:
        project.description ||
        `Explore features, location, and gallery of ${project.projectName}.`,
      url: `https://shelter4u.in/project-page/${slug}`,
      type: "article",
      images: [
        {
          url: project.coverImages?.[0]?.url || "/logo.png",
          width: 1200,
          height: 630,
          alt: project.projectName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.projectName} | Shelter4U`,
      description:
        project.metaDescription ||
        `Get full details on ${project.projectName}, listed on Shelter4U.`,
      images: [project.coverImages?.[0]?.url || "/logo.png"],
    },
    alternates: { canonical: `https://shelter4u.in/project-page/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return <ProjectClientPage project={serializeMongo(project)} />;
}
