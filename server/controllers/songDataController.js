const SongData = require('../models/SongDataSchema');

// Create new song data
exports.createSongData = async (req, res) => {
    try {
      const songData = new SongData(req.body);
      const savedData = await songData.save();
      res.status(201).json({status:"success",data:savedData});
      console.log("data insert successful")
    } catch (error) {
      res.status(400).json({ message: 'Error creating cube data', error });
      console.log("data insert get an error")
    }
  };


  // Get all song data
  exports.getAllSongsData = async (req, res) => {
    try {
      const songDataList = await SongData.find();
      res.status(200).json(songDataList);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving song data', error });
    }
  };


  // Get single song data by ID
exports.getSongDataById = async (req, res) => {
    try {
      const songData = await SongData.findById(req.params.id);
      if (!songData) return res.status(404).json({ message: 'Song data not found' });
      res.status(200).json(songData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving song data', error });
    }
  };


  // Update song data by ID
exports.updateSongData = async (req, res) => {
    try {
      const updatedSongData = await SongData.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedSongData) return res.status(404).json({ message: 'Song data not found' });
      res.status(200).json(updatedSongData);
    } catch (error) {
      res.status(400).json({ message: 'Error updating song data', error });
    }
  };
  
  // Delete cube data by ID
  exports.deleteSongData = async (req, res) => {
    try {
      const deletedSongData = await SongData.findByIdAndDelete(req.params.id);
      if (!deletedSongData) return res.status(404).json({ message: 'song data not found' });
      res.status(200).json({ message: 'song data deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting song data', error });
    }
  };