const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

// Route 1: Promises
router.post('/promises', (req, res) => {
  const artist = req.body.artist;
  const apiKey = config.lastFmApiKey;

  // Use dynamic import for 'node-fetch'
  import('node-fetch')
    .then((fetchModule) => {
      const fetch = fetchModule.default; // Access the fetch function

      // Construct the Last.fm API request using 'fetch'
      const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artist}&api_key=${apiKey}&format=json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          res.render('pugfile', { data });
        })
        .catch((error) => {
          res.status(500).send('Error fetching data');
        });
    })
    .catch((error) => {
      console.error('Error loading node-fetch:', error);
      res.status(500).send('Error loading node-fetch');
    });
});

// Route 2: Async/Await with 'fetch'
router.post('/asyncawait', async (req, res) => {
  const artist = req.body.artist;
  const apiKey = config.lastFmApiKey;

  try {
    // Use dynamic import for 'node-fetch'
    const fetchModule = await import('node-fetch');
    const fetch = fetchModule.default; // Access the fetch function

    // Construct the Last.fm API request using 'fetch'
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artist}&api_key=${apiKey}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    res.render('pugfile', { data });
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Route 3: Callbacks
router.post('/callbacks', (req, res) => {
  const artist = req.body.artist;
  const apiKey = config.lastFmApiKey;

  // Use dynamic import for 'node-fetch'
  import('node-fetch')
    .then((fetchModule) => {
      const fetch = fetchModule.default; // Access the fetch function

      // Construct the Last.fm API request using 'fetch'
      const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artist}&api_key=${apiKey}&format=json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          res.render('pugfile', { data });
        })
        .catch((error) => {
          res.status(500).send('Error fetching data');
        });
    })
    .catch((error) => {
      console.error('Error loading node-fetch:', error);
      res.status(500).send('Error loading node-fetch');
    });
});

module.exports = router;