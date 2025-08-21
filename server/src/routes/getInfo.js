const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/info', (req, res) => {
    const dataPath = path.join(__dirname, '../data/cafe_rio.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read data file.' });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            res.status(500).json({ error: 'Error parsing JSON data.' });
        }
    });
});

module.exports = router;