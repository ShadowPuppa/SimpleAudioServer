// initial.js
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

const musicDir = path.join(__dirname, 'public', 'music-lib');
const outputFile = path.join(__dirname, 'songs.json');

async function scanMusicDir(dir, baseDir = musicDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await scanMusicDir(fullPath, baseDir);
      results.push(...nested);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mp3')) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      try {
        const metadata = await mm.parseFile(fullPath);
        results.push({
          title: metadata.common.title || path.basename(entry.name, '.mp3'),
          artist: metadata.common.artist || 'Unknown',
          file: relPath
        });
      } catch (err) {
        console.warn(`Metadata error for ${relPath}:`, err.message);
      }
    }
  }

  return results;
}

async function run() {
  const songs = await scanMusicDir(musicDir);
  fs.writeFileSync(outputFile, JSON.stringify(songs, null, 2));
  console.log('✅ Music library scanned and songs.json updated.');
}

module.exports = run;
