const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  images: [{ type: mongoose.Types.ObjectId, required: true, ref: "Image" }]
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
