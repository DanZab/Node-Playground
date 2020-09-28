const myContent = require('../modules/content.js');
const Note = require('../models/note.js');

// note_index, note_details, note_create_get, note create_post, note_delete

const note_index = function (req,res) {
    Note.find().sort({ createdAt: -1 })
        .then(function(result) {
            res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: result});
        })
        .catch ((err) => {
            console.log(err);
        })
;}

const note_details = function (req, res) {
    const id = req.params.id
    Note.findById(id)
        .then((result) => {
            res.render('notes',{title:"Notes", path: '/notes', navbar: myContent.navbar, notes: result});
        })
        .catch ((err) => {
            console.log(err);
            res.status(404).render('404', {title: "Not Found", navbar: myContent.navbar});
        })
};

// right now I'm using createNotes instead of notes/create, that will become note_create_get

const note_create_post = function(req,res) {
    const note = new Note(req.body)
    note.save()
        .then(function(result) {
            res.redirect('/notes');
        })
        .catch ((err) => {
            console.log(err);
        })
};

const note_delete = function(req,res) {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/notes' });
        })
        .catch(err => console.log(err));
}

module.exports = {
    note_index,
    note_details,
    note_create_post,
    note_delete
}