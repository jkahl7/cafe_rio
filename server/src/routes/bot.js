var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const config = require('../config.json');
const axios = require('axios');

const cafeData = require('../data/cafe_rio.json');
router.post('/', async function(req, res, next) {
    try {
        const userContent = req.body.content;
        if (!userContent) {
            return res.status(400).json({ error: 'Missing content parameter.' });
        }

        const API_KEY = 'AIzaSyBCvpiLgO1mPvRIRhbot5ms-Y4kwTuzFfk';
        const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        const promptContent = {
          contents: [{
            role: 'user',
            parts: [{
              text: `You are a helpful assistant that works to answer questions about a cafe named Cafe Rio. The following JSON is the information you have about Cafe Rio: ${JSON.stringify(cafeData)}. Use this information to answer the user's question: ${userContent}`,
            }],
          }]
        };

        const response = await axios.post(API_ENDPOINT, promptContent);

        if (response.status === 200) {
          const generatedText = response.data.candidates[0].content.parts[0].text;
          console.log('Generated Story:');
          console.log(generatedText);
          res.json(generatedText );
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
