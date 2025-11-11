const express = require('express');
const app = express();
const tasks = require('./router/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send("Task manager initialized");
});

app.use('/api/v1/tasks', tasks);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server listening on http://localhost:${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
