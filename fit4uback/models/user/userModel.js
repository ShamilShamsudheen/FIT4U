const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required:true
  },
  isBlocked:{
    type:Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', User);