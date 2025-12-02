const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/vote', async (req, res) => {
    const response = await fetch('https://api.fchoice.vn/vote-token.htm?....');
    const text = await response.text();
    res.send(text);
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
