const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const targetDir = path.join(__dirname, 'public', 'portfolio');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const sites = [
  // Business Websites
  { url: "https://vh-accounting.com", file: "vh-accounting.jpg" },
  { url: "https://evonceramics.com", file: "evon-ceramics.jpg" },
  { url: "https://7ddesignstudios.in", file: "7d-design-studios.jpg" },
  { url: "https://stonils.com", file: "stonils.jpg" },
  { url: "https://sahjanandtestlab.com", file: "sahjanand-test-lab.jpg" },
  { url: "https://niraenergy.in", file: "nira-energy.jpg" },
  { url: "https://paperworkllp.com", file: "paperwork-llp.jpg" },
  { url: "https://ramashray.in", file: "ramashray.jpg" },
  { url: "https://patelassociates.in", file: "patel-associates.jpg" },
  { url: "https://sundaramcorpo.com", file: "sundaram-corpo.jpg" },
  { url: "https://piousevents.com", file: "pious-events.jpg" },
  { url: "https://marckitanalysts.com", file: "marckit-analysts.jpg" },
  { url: "https://sevenam.in", file: "sevenam.jpg" },
  { url: "https://shivgangamarbles.com", file: "shivganga-marbles.jpg" },
  { url: "https://someshwartmt.in", file: "someshwar-tmt.jpg" },
  { url: "https://aksharindustry.in", file: "akshar-industry.jpg" },
  { url: "https://krupashree.in", file: "krupashree.jpg" },
  { url: "https://hrkaircompressor.in", file: "hrk-air-compressor.jpg" },
  { url: "https://anubhutipowersystem.com", file: "anubhuti-power.jpg" },
  // E-Commerce Websites
  { url: "https://varnetenterprise.com", file: "varnet-enterprise.jpg" },
  { url: "https://tattvamarts.com", file: "tattvam-arts.jpg" },
  { url: "https://toestrand.com", file: "toestrand.jpg" },
  // Landing Websites
  { url: "https://secureedgelife.in", file: "secure-edge-life.jpg" }
];

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  const results = {
    success: [],
    failed: []
  };

  for (const site of sites) {
    let page;
    try {
      console.log(`Processing: ${site.url}`);
      page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      
      // Wait an extra 4 seconds
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const filePath = path.join(targetDir, site.file);
      await page.screenshot({ 
        path: filePath, 
        type: 'jpeg', 
        quality: 85, 
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      
      if (fs.existsSync(filePath)) {
        console.log(`✅ SAVED: ${site.file}`);
        results.success.push(site.file);
      } else {
        throw new Error("File not found on disk after save.");
      }
    } catch (error) {
      console.error(`❌ FAILED: ${site.file} (${site.url}) - ${error.message}`);
      results.failed.push({ file: site.file, url: site.url, error: error.message });
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  await browser.close();
  
  console.log('\n=== FINAL SUMMARY ===');
  console.log(`✅ Successfully saved: ${results.success.length}`);
  results.success.forEach(name => console.log(` - ${name}`));
  
  console.log(`\n❌ Failed: ${results.failed.length}`);
  results.failed.forEach(fail => console.log(` - ${fail.file} (${fail.url})`));
}

run();
