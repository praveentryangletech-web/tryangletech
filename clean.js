const fs = require('fs');
const path = 'd:/TryangleTech/WEBSITE_TRYANGLE/tryangletech/app/service/service-two/components/ServiceTwoFAQ.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');
const newLines = [...lines.slice(0, 36), ...lines.slice(1412)];
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('done');
