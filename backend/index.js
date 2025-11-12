const express = require('express');
const app = express();
const tasks = require('./router/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const cors = require('cors');
app.use(express.json());
app.use(cors({
  origin: ['https://task-manager-system-1-t3du.onrender.com']
}));
app.get('/', (req, res) => {
  res.send("Task manager initialized");
});
app.use('/api/v1/tasks', tasks);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
