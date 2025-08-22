const express = require('express');
const axios = require('axios');
const config = require('../config.json');
const router = express.Router();
// TODO need a different service, this one wants pay methods. :( )
router.get('/', async (req, res) => {
    // just hardcoding lat and lon since only one location currently.
    const lat = 47.69530960709143;
    const lon = -122.2935381990407;
    const key = '7c67964d3aac6bb8d8550e667c85a62b';

    try {
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
        console.log('Fetching weather data from:', url);
        const response = await axios.get(url
        );
        res.json(response.data);
        console.log('Weather data fetched successfully:', response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;