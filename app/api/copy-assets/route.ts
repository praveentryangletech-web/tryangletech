import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'about-assets');
    
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
    }

    const files = fs.readdirSync(dir);
    let renamed = 0;

    for (const file of files) {
      if (file.includes('%20')) {
        const decodedName = decodeURIComponent(file);
        fs.renameSync(path.join(dir, file), path.join(dir, decodedName));
        renamed++;
      }
    }

    // Also copy webflow achunk files from Taskopia_files to about-assets
    const srcDir = path.join(process.cwd(), 'public', 'Taskopia_files');
    if (fs.existsSync(srcDir)) {
      const srcFiles = fs.readdirSync(srcDir);
      for (const file of srcFiles) {
        if (file.includes('webflow.achunk') || file.includes('webflow.34d39e86.24c5208c8961105d.js')) {
          fs.copyFileSync(path.join(srcDir, file), path.join(dir, file));
        }
      }
    }

    return NextResponse.json({ success: true, message: `Successfully renamed ${renamed} files and copied chunks!` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
