const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
const runScanner = require('./initial');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Serve the songs list
app.get('/songs', (req, res) => {
  const songs = require('./songs.json');
  res.json(songs);
});

// Run the music scanner on server start
runScanner().then(() => {
  app.listen(PORT, () => {
    console.log(`Music server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start music scanner:', err);
});



// Enable CORS for all routes
app.use(cors());

// Serve the /songs route to get the songs
app.get('/songs', (req, res) => {
  const songsFilePath = path.join(__dirname, 'songs.json'); // Ensure this is the correct path to songs.json

  // Read the songs.json file
  fs.readFile(songsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading songs.json:', err);
      return res.status(500).json({ error: 'Failed to read songs' });
    }

    try {
      const songs = JSON.parse(data); // Parse the JSON data from the file
      res.json(songs); // Send the songs as a JSON response
    } catch (e) {
      console.error('Error parsing songs.json:', e);
      return res.status(500).json({ error: 'Failed to parse songs' });
    }
  });
});

// Serve static files from the 'public' folder (including index.html and other assets)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/music-lib', express.static(path.join(__dirname, 'public/music-lib')));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
