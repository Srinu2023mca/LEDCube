const express = require('express');
const router = express.Router();

const songDataController = require('../controllers/songDataController');

// Create song data
router.post('/createSongData', songDataController.createSongData);

// Get all song data
router.get('/songsData', songDataController.getAllSongsData);

// Get song data by ID
router.get('/songData/:id', songDataController.getSongDataById);

// Update song data by ID
router.put('/songData/:id', songDataController.updateSongData);

// Delete song data by ID
router.delete('/songData/:id', songDataController.deleteSongData);

module.exports = router;