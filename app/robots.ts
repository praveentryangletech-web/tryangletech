import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/superadmin', '/superadmin/*', '/api', '/api/*'],
      },
    ],
    sitemap: 'https://tryangletech.com/sitemap.xml',
    host: 'https://tryangletech.com',
  };
}

