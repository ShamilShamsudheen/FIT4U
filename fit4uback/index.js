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
const chat = require('./models/chat/chat');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
// const io = socketIo(server);

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

// Socket.IO Connect:
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  }
});

// Socket.IO Connection Event:
io.on('connection', (socket) => {
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });
});


// Set up middleware
app.use((req, res, next) => {
  if (req.originalUrl.includes("/webhook")) {
    next();
  } else {
    express.json({ limit: "1mb" })(req, res, next);
  }
});
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', userRouter); // example route for user
app.use('/admin', adminRouter); // example route for admin
app.use('/trainer', trainerRouter); // example route for trainer
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
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
    case 'checkout.session.completed':

      const session = event.data.object;

      const { trainerId, userId, trainername, username } = session.metadata
      const currentDate = new Date();
      console.log(session)
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
      await purchase.save();
      console.log('database saved')
      await trainerModel.findByIdAndUpdate(
        { _id: trainerId },
        { $push: { wallet: 500 } }
      );
      console.log('wallet updated')
      const newChat = new chat({
        participants: [userId, trainerId]
      });

      await newChat.save()
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
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
