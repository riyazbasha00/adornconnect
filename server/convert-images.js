const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadsDir = path.join(__dirname, 'uploads');
const dataPath = path.join(__dirname, '..', 'data.json');

async function convertAll() {
  if (!fs.existsSync(uploadsDir)) { console.log('No uploads directory'); return; }

  const files = fs.readdirSync(uploadsDir).filter(f => !f.endsWith('.webp') && !f.endsWith('.json'));
  console.log(`Found ${files.length} images to convert`);

  let converted = 0;
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
    try {
      await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
      fs.unlinkSync(filePath);
      console.log(`✓ ${file} → ${path.basename(webpPath)}`);
      converted++;
    } catch (e) {
      console.log(`✗ ${file}: ${e.message}`);
    }
  }

  if (converted > 0 && fs.existsSync(dataPath)) {
    let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const text = JSON.stringify(data);
    let updated = text;
    for (const file of files) {
      const webp = file.replace(/\.[^.]+$/, '.webp');
      updated = updated.split(file).join(webp);
    }
    if (updated !== text) {
      data = JSON.parse(updated);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      console.log(`✓ Updated data.json references`);
    }
  }

  console.log(`Done: ${converted}/${files.length} converted`);
}

convertAll().catch(console.error);
