import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/backend/utils/siteUrl';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/superadmin', '/superadmin/*', '/api', '/api/*'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot',
          'Bingbot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/blog', '/blog/*', '/portfolio', '/portfolio/*', '/service/*', '/about', '/contact', '/*'],
        disallow: ['/superadmin', '/superadmin/*', '/api', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
