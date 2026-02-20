import { models } from "@/lib/connections.js";

const { Project } = models;

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap() {
  const baseUrl = "https://shelter4u.in";

  // Static routes
  const routes = [
    "",
    "/about/companyProfile",
    "/about/vissionMission",
    "/about/team",
    "/contactus",
    "/search",
    "/others/legalInfo",
    "/others/loansForNRI",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes (Projects)
  let projects = [];
  try {
    if (Project) {
      projects = await Project.find({}, "slug updatedAt").lean();
    }
  } catch (error) {
    console.error("Error generating sitemap projects:", error);
  }

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/project-page/${project.slug}`,
    lastModified: project.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...routes, ...projectRoutes];
}
