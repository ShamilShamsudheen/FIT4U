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
  },
  age:{
    type: String,
    default: null
  },
  height:{
    type: String,
    default: null
  },
  weight:{
    type: String,
    default:null
  },
  goal:{
    type: String,
    default: null
  },
  profileImg:{
    type: String,
    default: null
  },
});

module.exports = mongoose.model('User', User);