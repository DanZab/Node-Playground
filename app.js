const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

//Initialize application
const port = 3000
const app = express()

const server = app.listen(port, function() {
    console.log('Node-Playground listening on http://localhost:$(port)')
});

app.engine('hbs', hbs( {
    extname: 'hbs',
    defaultLayout: 'layout';
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));