'use strict';
const https = require('https');
const URL = require('url');

module.exports = (req, res, next) => {
    const s3FolderPath = "https://s3.eu-central-1.amazonaws.com/food.mart.files/productPhotos";
    const picName = encodeURIComponent(req.query.picName);
    const picUrl = s3FolderPath + '/' + picName;  
    return https.get(picUrl, function (response) {
        if (response.statusCode === 200) {
            res.writeHead(200, {
                'Content-Type': response.headers['content-type']
            });
            response.pipe(res);
        } else {
            res.writeHead(response.statusCode);
            res.end();
        }
    })
}