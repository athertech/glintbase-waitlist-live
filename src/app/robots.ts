// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',     // Applies these routing guidelines to all search engines
      allow: '/',         // Gives explicit permission to index all visible pages
    },
    sitemap: 'https://glintbase.xyz', // Explicitly points Google to your file location
  };
}
