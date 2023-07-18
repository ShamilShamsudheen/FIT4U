const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Trainer = new Schema({
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
  isApproved:{
    type:Boolean,
    default: false
  },
  resume:{
    type:String,
    reuired: true
  },
  certificate:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required: true
  },
  profileImg:{
    type:String,
    default:'NIL'
  },
});

module.exports = mongoose.model('Trainer', Trainer);