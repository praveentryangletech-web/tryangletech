import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tryangletech.com'
  
  // List of all core routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/portfolio',
    '/faq',
    '/blog',
    '/service/web-development',
    '/service/custom-software',
    '/service/mobile-application',
    '/service/digital-marketing',
    '/service/graphics-designing',
  ]
  
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
