const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: String,
  },
  { _id: false },
  { index: false }
);

module.exports = mongoose.model("Show", schema);
