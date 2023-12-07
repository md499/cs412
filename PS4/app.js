// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ps4Router = require('./routes/ps4');
const redis = require('redis');
const client = redis.createClient();

var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // or 'pug' if you prefer Pug as the template engine

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ps4', (req, res) => {
  const cacheKey = req.body.cacheKey;

  // Check if the response is cached
  client.get(cacheKey, (err, cachedResponse) => {
    if (err) {
      console.error('Error retrieving cached response:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (cachedResponse) {
      // Return the cached response
      const response = {
        data: cachedResponse,
        fromCache: true
      };
      return res.json(response);
    } else {
      // Call the third-party API
      // Replace the following code with your actual API call
      const apiResponse = 'Response from third-party API';

      // Cache the response with a 15-second timeout
      client.setex(cacheKey, 15, apiResponse, (err) => {
        if (err) {
          console.error('Error caching response:', err);
        }
      });

      // Return the API response
      const response = {
        data: apiResponse,
        fromCache: false
      };
      return res.json(response);
    }
  });
});