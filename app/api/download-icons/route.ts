import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const icons = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", filename: "react.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", filename: "nextjs.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", filename: "php.svg" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", filename: "aws.svg" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", filename: "docker.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg", filename: "laravel.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", filename: "tailwind.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", filename: "figma.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg", filename: "google-ads.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", filename: "stripe.svg" },
    { url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg", filename: "meta.svg" }
  ];

  try {
    const dirPath = path.join(process.cwd(), 'public', 'tech-icons');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    for (const icon of icons) {
      const filePath = path.join(dirPath, icon.filename);
      // Always download and overwrite to ensure we have the latest version
      const response = await fetch(icon.url, {
        headers: {
          'User-Agent': 'Tryangletech-App/1.0 (contact@tryangletech.com)'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${icon.url}: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(buffer));
    }

    return NextResponse.json({ success: true, message: "Icons downloaded successfully to public/tech-icons" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 200 });
  }
}
