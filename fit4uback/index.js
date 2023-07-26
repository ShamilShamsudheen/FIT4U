// Import required modules
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const trainerRouter = require('./routes/trainerRouter');

// Define database connection
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database successfully..');
  })
  .catch((error) => {
    console.log('Database connection error', error);
  });

app.use(cors());

// Set up middleware
app.use(express.json()); // for parsing JSON data
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded data
app.use(express.static(path.join(__dirname,'public'))); // for serving static files (CSS, images, etc.)

// Define routes
app.use('/', userRouter); // example route for user
app.use('/admin', adminRouter); // example route for admin
app.use('/trainer', trainerRouter); // example route for trainer





app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = process.env.PORT || 3000; // specify the port number, use process.env.PORT for Heroku deployment
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
