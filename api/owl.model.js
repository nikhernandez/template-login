const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for audio
let owl = new Schema({
  _id: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String 
  },
  createdAt: {
    type: Number 
  },
  blobsize: {
    type: String 
  },
  startTime: {
    type: Number 
  },
  stopTime: {
    type: Number 
  },
  cloudinaryURL: {
    type: String 
  },
  idThread: {
    type: Number
  },
  cloudinaryURLFile: {
    type: Array 
  }
},{
    collection: 'record'
});

module.exports = mongoose.model('owl', owl);