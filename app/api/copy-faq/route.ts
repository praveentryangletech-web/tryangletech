import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const src = path.join(process.cwd(), 'app/service/service-three/components/ServiceThreeFAQ.tsx');
    const dest = path.join(process.cwd(), 'app/service/mobile-application/components/MobileApplicationFAQ.tsx');

    let content = fs.readFileSync(src, 'utf8');
    content = content.replace(/ServiceThree/g, 'MobileApplication');
    fs.writeFileSync(dest, content);

    return NextResponse.json({ success: true, message: 'Copied successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error), cwd: process.cwd() });
  }
}
