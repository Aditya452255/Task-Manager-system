const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url, {
    writeConcern: {
      w: "majority",
      wtimeout: 5000,
      j: true,
    }
  });
};

module.exports = connectDB;