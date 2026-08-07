import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const icons = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", filename: "react.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", filename: "nextjs.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", filename: "php.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", filename: "aws.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg", filename: "docker.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg", filename: "laravel.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", filename: "tailwind.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", filename: "figma.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg", filename: "google-ads.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", filename: "stripe.svg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", filename: "meta.svg" }
  ];

  try {
    const dirPath = path.join(process.cwd(), 'public', 'tech-icons');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    for (const icon of icons) {
      const filePath = path.join(dirPath, icon.filename);
      // Skip if already exists
      if (!fs.existsSync(filePath)) {
        const response = await fetch(icon.url);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));
      }
    }

    return NextResponse.json({ success: true, message: "Icons downloaded successfully to public/tech-icons" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
