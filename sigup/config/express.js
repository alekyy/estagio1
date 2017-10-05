var express = require('express');
var app = express();

app.use(express.static('./www'));
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: './www' });
});

// configurações do express

module.exports = app;
