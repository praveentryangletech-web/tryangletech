import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
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
        allow: ['/', '/blog', '/blog/*', '/portfolio', '/portfolio/*', '/service/*', '/about', '/contact', '/location/*', '/location/**'],
        disallow: ['/superadmin', '/superadmin/*', '/api', '/api/*'],
      },
    ],
    sitemap: 'https://tryangletech.com/sitemap.xml',
    host: 'https://tryangletech.com',
  };
}
