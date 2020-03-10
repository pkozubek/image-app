const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const imageSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  views: { type: Number, required: true },
  likes: { type: Number, required: true },
  userID: { type: mongoose.Types.ObjectId, required: true, ref: "User" }
});

module.exports = mongoose.model("Image", imageSchema);