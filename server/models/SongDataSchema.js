// const mongoose = require("mongoose");

// const SongData = new mongoose.Schema({
//     name:{
//         type:String,
//         require:false
//     },
//     totalTime:{
//         type:String,
//         require:false

//     },
//     cubes{

//     }
// })

const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  // Define fields for each entry in a cube, such as color, duration, or effect type if applicable
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  topColor: { type: String, required: true },
  sidesColor: { type: String, required: true },
  bottomColor: { type: String, required: true },
  effectType: { type: String, required: true },
  duration: { type: String, required: true }
});

const CubeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  entries: { type: [EntrySchema], default: [] } // Array of entries
});

const SongDataSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  cubes: { type: [CubeSchema], default: [] } // Array of cubes with entries
},{
    timestamps:true
});

module.exports = mongoose.model('SongData', SongDataSchema);