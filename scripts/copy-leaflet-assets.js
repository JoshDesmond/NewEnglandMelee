import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const publicImagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Copy marker icons from node_modules to public
const leafletImagesDir = path.join(__dirname, '../node_modules/leaflet/dist/images');
const markerFiles = [
  'marker-icon.png',
  'marker-icon-2x.png',
  'marker-shadow.png'
];

markerFiles.forEach(file => {
  fs.copyFileSync(
    path.join(leafletImagesDir, file),
    path.join(publicImagesDir, file)
  );
});

console.log('Leaflet marker assets copied to public/images/'); 