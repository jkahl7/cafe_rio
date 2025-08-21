var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const config = require('../config.json');
const axios = require('axios');

router.post('/', async function(req, res, next) {
    try {
        const userContent = req.body.content;
        if (!userContent) {
            return res.status(400).json({ error: 'Missing content parameter.' });
        }
        // Import the axios library
        // const axios = require('axios'); // Already required at the top

        // Get your API key from environment variables for security
        // Or, if testing, you can directly set it here
        const API_KEY = 'AIzaSyBCvpiLgO1mPvRIRhbot5ms-Y4kwTuzFfk';


        // The API endpoint for the Gemini Pro model
        const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        // The content you want to send to the model
        const promptContent = {
          contents: [{
            parts: [{
              text: userContent
            }]
          }]
        };

        // Make the POST request
        const response = await axios.post(API_ENDPOINT, promptContent);

        // Check if the request was successful
        if (response.status === 200) {
          // Extract the generated text from the response
          const generatedText = response.data.candidates[0].content.parts[0].text;
          console.log('Generated Story:');
          console.log(generatedText);
          res.json({ result: generatedText });
        } else {
          console.error(`Error: Received status code ${response.status}`);
          console.error(response.data);
          res.status(response.status).json({ error: response.data });
        }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
