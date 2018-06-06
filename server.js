const express = require('express');
const server = express();
const path = require('path');
const https = require('https')
const imageProxy = require('./imageProxy')

let PORT = process.env.PORT || 4200;

server.use((req, res, next) => {
    console.log(`requested url: ${req.url}`);
    next();
})
// proxy images from images cors api
server.use("/imageproxy", imageProxy);

server.use(express.static(__dirname + '/dist'));

server.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})