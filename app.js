const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const _ = require('lodash'); //I'm not using lodash, should remove
const mongoose = require('mongoose');
const myContent = require('./modules/content.js')
const secure = require('./modules/secure.js');

// Connect to database
mongoose.connect(secure, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {app.listen(port, function() {
        console.log('Node-Playground listening on http://localhost:' + port);
        console.log("Connected to database")
    })})
    .catch((err) => {console.log(err);});

// Initialize application
const port = 3000
const app = express()

// const server = app.listen(port, function() {
//     console.log('Node-Playground listening on http://localhost:' + port)
// });

// Configure the view settings
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    helpers: {
        if_eq : function (a, b, options) {
            console.log('a is ' + a + ', b is ' + b)
            if (a == b) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            };
        },
    }
}));

// Views
app.get('/', function(req, res) {
    console.log(req.url, req.method);
    res.setHeader('Content-Type','text/html');
    res.render('home', {title: "Home", path: '/', navbar: myContent.navbar});
});

app.get('/about', function(req,res) {
    res.render('about',{title:"About", path: '/about', navbar: myContent.navbar});
});

app.get('/notes', function(req,res) {
    res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: myContent.myNotes});
});

app.get('/createNotes', function(req,res) {
    res.render('createNotes',{title:"New note", navbar: myContent.navbar});
});

// 404 Page, must be the final method used
app.use(function(req, res) {
    res.status(404).render('404', {title: "Not Found"});
});



// Removed config items by setting the views path in Express and renaming the default
// layour file in my project to main. This allows express-handlebars to just use the
// default settings.
//defaultLayout: 'layout',
//layoutsDir: __dirname + '/views/layouts/',
//partialsDir: __dirname + '/views/partials/'