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
const purchaseModel = require('./models/purchase/purchaseModel');
const trainerModel = require('./models/trainer/trainerModel');

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
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'charge.succeeded':

      const session = event.data.object;

      const {trainerId,userId,trainername,username} = session.metadata
      const currentDate = new Date();

      // Add one month to the current date
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      const purchase = new purchaseModel({
        purchase_id: session.id,
        purchase_amount: 1000,
        purchase_date: currentDate,
        purchase_expire: oneMonthLater,
        trainer_id: trainerId,
        user_id: userId,
        user_name: username,
        trainer_name: trainername,
      });
      trainerModel.updateOne(
        { _id: trainerId }, // Use the appropriate ID format in MongoDB
        { $push: { wallet: 500 } }
      );
      purchase.save();

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  if(event.type === charge.succeeded){

  }
  response.send();
});





app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = process.env.PORT || 3000; // specify the port number, use process.env.PORT for Heroku deployment
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
