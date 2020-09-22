const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const _ = require('lodash');

// Initialize application
const port = 3000
const app = express()

const server = app.listen(port, function() {
    console.log('Node-Playground listening on http://localhost:' + port)
});

// Temp - notes variable
const myNotes = [
    {
        Title: "",
        Note: "Add the \"Start\" script to the scripts object in package.json with \"nodemon\" specified, then use 'npm start' to start the server."
    },
    {
        Title: "",
        Note: "Use .gitignore to remove the node_modules folder from your project, use npm install to initialize dependencies from new workspace."
    },
    {
        Title: "",
        Note: "Next step is to dynamically populate the Navbar and fix the .active class assignment."
    },
]

// Configure the view settings
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs');
app.engine('hbs', hbs( {extname: 'hbs'}));

// Views
let pathRequest = 'home'
app.get('/', function(req, res) {
    console.log(req.url, req.method, pathRequest);
    res.setHeader('Content-Type','text/html');
    res.render(pathRequest, {title: pathRequest, pathRequest: pathRequest});
});

app.get('/about', function(req,res) {
    res.render('about',{title:"About"});
});

app.get('/notes', function(req,res) {
    res.render('notes',{title:"Notes", myNotes});
});

app.get('/createNotes', function(req,res) {
    res.render('createNotes',{title:"New note"});
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