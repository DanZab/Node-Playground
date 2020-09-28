const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const _handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose');
const myContent = require('./modules/content.js');
const secure = require('./modules/secure.js');
const noteRoutes = require('./routes/noteRoutes.js');
//const Note = require('./models/note.js');

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
app.use('/notes', noteRoutes);

app.get('/', function(req, res) {
    res.setHeader('Content-Type','text/html');
    res.render('home', {title: "Home", path: '/', navbar: myContent.navbar});
});

app.get('/about', function(req,res) {
    res.render('about',{title:"About", path: '/about', navbar: myContent.navbar});
});

app.get('/createNotes', function(req,res) {
    res.render('createNotes',{title:"New note", navbar: myContent.navbar});
});

// 404 Page, must be the final method used
app.use(function(req, res) {
    res.status(404).render('404', {title: "Not Found", navbar: myContent.navbar});
}); 