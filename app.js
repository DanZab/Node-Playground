const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

//Initialize application
const port = 3000
const app = express()

const server = app.listen(port, function() {
    console.log('Node-Playground listening on http://localhost:$(port)')
});

//Configure the view settings
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs');
app.engine('hbs', hbs( {extname: 'hbs'}));

// Removed config items by setting the views path in Express and renaming the default
// layour file in my project to main. This allows express-handlebars to just use the
// default settings.
//defaultLayout: 'layout',
//layoutsDir: __dirname + '/views/layouts/',
//partialsDir: __dirname + '/views/partials/'

app.get('/', function(req, res) {
    console.log(req.url, req.method);
    res.render('home', {title: "Home"});
});