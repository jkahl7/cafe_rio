const express = require('express');
const axios = require('axios');
const config = require('../config.json');
const router = express.Router();
router.get('/', async (req, res) => {

    try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=47.6953&longitude=-122.2934&current=temperature_2m&temperature_unit=fahrenheit';
        console.log('Fetching weather data from:', url);
        const response = await axios.get(url
        );
        res.json(response.data.current.temperature_2m);
        console.log('Weather data fetched successfully:', response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;