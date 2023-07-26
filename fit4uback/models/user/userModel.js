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
    default: 'Nill'
  },
  height:{
    type: String,
    default: 'Nill'
  },
  weight:{
    type: String,
    required:"Nil"
  },
  goal:{
    type: String,
    default: 'Nill'
  },
  profileImg:{
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('User', User);