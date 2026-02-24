import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import ProjectClientPage from "./ProjectClientPage";

const { Project } = models;

// ISR: revalidate every 24 hours — content updates propagate within a day
export const revalidate = 86400;

// Pre-generate all project pages at build time so the <title> is always
// inside <head> in the static HTML — fixing Screaming Frog's "Title outside <head>" issue.
// Any new projects added after build will be generated on first request (fallback: "blocking").
export async function generateStaticParams() {
  try {
    const projects = await Project.find({}, "slug").lean();
    return projects.map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Shared DB fetch used by both generateMetadata and the page component
// Decodes URL-encoded slug (e.g. %26 → &) before querying MongoDB,
// so projects with special characters in slugs are found correctly.
async function getProject(slug) {
  try {
    // Decode the slug to handle URL encoding (e.g. slugs with & stored in DB)
    const decodedSlug = decodeURIComponent(slug);
    const project = await Project.findOne({ slug: decodedSlug })
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
      url: `/project-page/${slug}`,
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
    alternates: { canonical: `/project-page/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return <ProjectClientPage project={serializeMongo(project)} />;
}
