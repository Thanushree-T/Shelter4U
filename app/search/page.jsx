import React, { Suspense } from 'react';
import SearchPageClient from './SearchPage.jsx';
// import Loading from './loading'; // Import the loading component

// Force this page to render dynamically since it depends on searchParams at runtime
export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  // This function fetches the initial data on the server.
  const fetchInitialProjects = async () => {
    try {
      // searchParams must be awaited before using its properties in server components
      const params = await searchParams;
      const queryString = typeof params?.toString === 'function'
        ? params.toString()
        : new URLSearchParams(params ?? {}).toString();
      const response = await fetch(`${baseUrl}/api/search?${queryString}`, { cache: 'no-store' });

      if (!response.ok) {
        console.error("Failed to fetch initial projects, status:", response.status);
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching initial projects on server:", error);
      return [];
    }
  };

  const initialProjects = await fetchInitialProjects();

  return (
    // Suspense uses your loading.js as a fallback UI.
    // It allows the static parts of the page to render instantly while
    // the dynamic client component loads.
    // <Suspense>
      <SearchPageClient initialProjects={initialProjects} />
    // </Suspense>
  );
}


