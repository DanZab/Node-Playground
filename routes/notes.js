const express = require('express');
const router = express.Router();
const Note = require('../models/note.js');
const myContent = require('../modules/content.js');

// Note Routes
router.get('/:id', (req, res) => {
    const id = req.params.id
    Note.findById(id)
        .then((result) => {
            res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: result});
        })
        .catch ((err) => {
            console.log(err);
        })
});

router.get('/', function(req,res) {
    Note.find().sort({ createdAt: -1 })
        .then(function(result) {
            res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: result});
        })
        .catch ((err) => {
            console.log(err);
        })
});

router.post('/', function(req,res) {
    const note = new Note(req.body)
    note.save()
        .then(function(result) {
            res.redirect('/notes');
        })
        .catch ((err) => {
            console.log(err);
        })
});

module.exports = router