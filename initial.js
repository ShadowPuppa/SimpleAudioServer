const fs = require('fs');
const path = require('path');
const axios = require('axios');
const musicMetadata = require('music-metadata');
const musicDirectory = path.join(__dirname, 'public', 'music-lib'); // Correct path for music-lib inside public
const songsFilePath = path.join(__dirname, 'songs.json');




// Function to initialize the songs data
async function initializeSongs() {
  // Read the existing songs data from songs.json
  fs.readFile(songsFilePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading songs.json:', err);
      return;
    }

    let songs = [];
    try {
      songs = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing songs.json:', e);
      return;
    }

    console.log('Initialization complete!');
  });
}

// Start the initialization process
initializeSongs();
