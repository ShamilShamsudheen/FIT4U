const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Blog = new Schema({
    blog_template:{
        type:String,
        required:true
    },
    blog_title:{
        type:String,
        required:true
    },
    blog_content:{
        type:String,
        required:true
    },
    blog_writer:{
        type:String,
        required:true
    },
    blog_date:{
        type:Date,
        required:true
    },
    blog_category:{
        type:String,
        required:true
    },
    blog_approve:{
        type:Boolean,
        default:true
    },
});

module.exports = mongoose.model('Blog',Blog);