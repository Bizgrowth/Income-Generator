const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.post('/run', (req, res) => {
    console.log('Starting scraper and ranker...');

    // Execute scraper then ranker
    exec('node scraper.js', (err, stdout, stderr) => {
        if (err) {
            console.error(`Scraper error: ${err}`);
            return res.status(500).json({ error: 'Scraper failed' });
        }

        exec('node ranker.js', (err, stdout, stderr) => {
            if (err) {
                console.error(`Ranker error: ${err}`);
                return res.status(500).json({ error: 'Ranker failed' });
            }

            const results = JSON.parse(fs.readFileSync(path.join(__dirname, 'ranked_results.json'), 'utf8'));
            res.json({ success: true, results });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
