const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController.js')

// Note Routes
router.get('/add', noteController.note_create_get);
router.get('/', noteController.note_index);
router.post('/', noteController.note_create_post);
router.get('/:id', noteController.note_details);
router.post('/:id', noteController.note_update);
router.delete('/:id', noteController.note_delete);

module.exports = router