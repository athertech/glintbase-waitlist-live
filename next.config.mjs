/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const rawBlogUrl = process.env.BLOG_URL || (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/blog'
      : 'https://glintbase-blog.vercel.app/blog');
    
    const blogUrl = rawBlogUrl.endsWith('/blog') ? rawBlogUrl : `${rawBlogUrl}/blog`;
    
    return [
      {
        source: '/blog',
        destination: blogUrl,
      },
      {
        source: '/blog/:path*',
        destination: `${blogUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
