const mongoose = require("mongoose");
const authDatabase = mongoose.createConnection('mongodb://127.0.0.1:27017/new');
const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    default: null,
  },
  fbId: {
    type: String,
    default: null,
  },
  picUrl: {
    type: String,
    default: "https://static.thenounproject.com/png/4851855-200.png",
  },
});

module.exports = authDatabase.model("Authentication", schema);
