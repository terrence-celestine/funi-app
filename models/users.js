const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: String,
    password: { type: String, select: true },
  },
  { _id: false },
  { index: false }
);

module.exports = mongoose.model("User", schema);
