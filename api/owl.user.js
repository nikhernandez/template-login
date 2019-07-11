const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for audio
let user = new Schema({
  _id: {
    type: String
  },
  user: {
    type: String
  },
  password: {
    type: String 
  }
},{
    collection: 'users'
});

module.exports = mongoose.model('user', user);