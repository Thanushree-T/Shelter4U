const siteUrl = "https://shelter4u.in";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
  exclude: ["/api/*"],

  additionalPaths: async (config) => {
    const fs = require("fs");
    const path = require("path");
    const pathsFile = path.join(__dirname, "dynamic-paths.json");

    // Static home-page section anchors for SEO discoverability
    const sectionAnchors = [
      {
        loc: "/#explore-localities",
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/#property-options",
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/#faq",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];

    if (!fs.existsSync(pathsFile)) {
      console.warn(
        "dynamic-paths.json not found — run the pre-build script first.",
      );
      return sectionAnchors;
    }

    const dynamicPaths = JSON.parse(fs.readFileSync(pathsFile, "utf8"));

    const entries = dynamicPaths.map((p) => {
      const isProjectPage = p.startsWith("/project-page/");
      const isCareerPage = p.startsWith("/about/career/");
      const isSearchPage = p.startsWith("/search");

      return {
        loc: p,
        changefreq: isProjectPage
          ? "weekly"
          : isCareerPage
            ? "monthly"
            : isSearchPage
              ? "daily"
              : "weekly",
        priority: isProjectPage
          ? 0.9
          : isCareerPage
            ? 0.5
            : isSearchPage
              ? 0.8
              : 0.7,
        lastmod: new Date().toISOString(),
      };
    });

    return [...sectionAnchors, ...entries];
  },
};
