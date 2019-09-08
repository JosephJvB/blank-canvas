const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'page.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('express listening on', PORT));