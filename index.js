const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/react', (req, res) => {
    const { link, type, cookie } = req.query;
    const validTypes = ['LIKE', 'WOW', 'SAD', 'ANGRY', 'CARE'];

    if (!link || !type || !cookie || !validTypes.includes(type)) {
        res.status(400).json({ error: 'Invalid request parameters.' });
        return;
    }

    axios.post("https://flikers.net/android/android_get_react.php", {
        post_id: link,
        react_type: type,
        version: "v1.7"
    }, {
        headers: {
            'User-Agent': "Dalvik/2.1.0 (Linux; U; Android 12; V2134 Build/SP1A.210812.003)",
            'Connection': "Keep-Alive",
            'Accept-Encoding': "gzip",
            'Content-Type': "application/json",
            'Cookie': cookie
        }
    })
        .then(dat => { res.json(dat.data); })
        .catch(e => {
            console.error(e);
            res.json({ error: 'An error occurred while sending the request.' });
        });
});

app.listen(3000, () => { console.log('Server is running on port 3000'); });
