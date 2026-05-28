// app/sitemap.ts
import { MetadataRoute } from 'next';

// 1. Define your primary production domain
const BASE_URL = 'https://glintbase.com'; // Replace with your exact Vercel custom domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 2. Define your site's static landing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 3. Fetch dynamic documentation paths from your database, CMS, or API
  try {
    // Replace this placeholder URL with your actual internal or external API route
    const response = await fetch(`${BASE_URL}/api/docs-paths`, {
      next: { revalidate: 3600 } // Cache data and revalidate every hour
    });
    
    if (!response.ok) throw new Error('Failed to fetch doc paths');
    
    const docs = await response.json(); 
    // Expecting an array of objects, e.g., [{ slug: 'getting-started', updatedAt: '2026-05-28' }]

    // 4. Map your dynamic documentation pages into the sitemap format
    const dynamicRoutes: MetadataRoute.Sitemap = docs.map((doc: { slug: string; updatedAt?: string }) => ({
      url: `${BASE_URL}/docs/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Sitemap dynamic generation failed, falling back to static routes:', error);
    return staticRoutes; // Gracefully fallback to main pages if the API is down during build
  }
}
