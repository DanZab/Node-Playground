const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const _handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const _ = require('lodash'); //I'm not using lodash, should remove
const mongoose = require('mongoose');
const myContent = require('./modules/content.js')
const secure = require('./modules/secure.js');
const Note = require('./models/note.js');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');

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

// middleware
app.use(express.urlencoded({ extended: true }));
app.use('/img',express.static(path.join(__dirname, 'public/images')));

// Configure the view settings
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    helpers: {
        if_eq : function (a, b, options) {
            if (a == b) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            };
        },
    }
}));

// Routes
app.get('/', function(req, res) {
    res.setHeader('Content-Type','text/html');
    res.render('home', {title: "Home", path: '/', navbar: myContent.navbar});
});

app.get('/about', function(req,res) {
    res.render('about',{title:"About", path: '/about', navbar: myContent.navbar});
});


// Note Routes
app.get('/notes', function(req,res) {
    Note.find().sort({ createdAt: -1 })
        .then(function(result) {
            res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: result});
        })
        .catch ((err) => {
            console.log(err);
        })
    //res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: myContent.myNotes});
});

app.get('/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findById(id)
        .then((result) => {
            res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: result});
        })
        .catch ((err) => {
            console.log(err);
        })
});

app.post('/notes', function(req,res) {
    console.log(req.body);
    const note = new Note(req.body)
    note.save()
        .then(function(result) {
            res.redirect('/notes');
        })
        .catch ((err) => {
            console.log(err);
        })
    //res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: myContent.myNotes});
});

app.get('/createNotes', function(req,res) {
    res.render('createNotes',{title:"New note", navbar: myContent.navbar});
});

// 404 Page, must be the final method used
app.use(function(req, res) {
    res.status(404).render('404', {title: "Not Found"});
});