const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function convertToWebP(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: 90 })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = info.size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`  ${(inputSize / 1024).toFixed(1)} KB -> ${(outputSize / 1024).toFixed(1)} KB (${savings}% reduction)`);
    
    return { inputSize, outputSize, savings };
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeImages() {
  console.log('🖼️  Image Optimization Script\n');
  
  const pngFiles = [
    'opiniones-3d-star.png',
    'pricing-3d-01-diagnostico.png',
    'pricing-3d-03-desatascos.png',
    'pricing-3d-04-urgencias.png',
    'process-3d-01-contacto.png',
    'process-3d-02-valoracion.png',
    'process-3d-03-reparacion.png',
    'process-3d-04-garantia.png'
  ];
  
  console.log('Converting PNG icons to WebP...\n');
  
  let totalInputSize = 0;
  let totalOutputSize = 0;
  
  for (const file of pngFiles) {
    const inputPath = path.join(iconsDir, file);
    const outputPath = path.join(iconsDir, file.replace('.png', '.webp'));
    
    if (fs.existsSync(inputPath)) {
      const result = await convertToWebP(inputPath, outputPath);
      if (result) {
        totalInputSize += result.inputSize;
        totalOutputSize += result.outputSize;
      }
    } else {
      console.log(`⚠ File not found: ${file}`);
    }
    console.log('');
  }
  
  const totalSavings = ((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(1);
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  console.log(`   Before: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   After:  ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Saved:  ${(( totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB (${totalSavings}%)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

optimizeImages().catch(console.error);
