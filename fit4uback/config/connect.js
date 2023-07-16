require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO)
module.exports = {
    mongoose
}