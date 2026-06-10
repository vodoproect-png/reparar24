const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const citiesDir = path.join(__dirname, '../public/cities');
const pngFiles = [
  'burjassot.png',
  'gandia.png',
  'mislata.png',
  'paterna.png',
  'sagunto.png',
  'torrent.png'
];

async function convertToWebP() {
  console.log('🔄 Converting city images from PNG to WebP...\n');

  for (const file of pngFiles) {
    const inputPath = path.join(citiesDir, file);
    const outputPath = path.join(citiesDir, file.replace('.png', '.webp'));

    try {
      const info = await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = info.size;
      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   WebP: ${(newSize / 1024).toFixed(2)} KB`);
      console.log(`   Reduction: ${reduction}%\n`);
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }

  console.log('✨ Conversion complete!');
  console.log('\n⚠️  Original PNG files are preserved.');
  console.log('   You can delete them after verifying WebP images work correctly.');
}

convertToWebP();
