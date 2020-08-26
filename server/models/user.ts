import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  avatar: { type: String, required: false },
  images: [{ type: mongoose.Types.ObjectId, required: true, ref: "Image" }],
});
userSchema.plugin(uniqueValidator);
export default mongoose.model("User", userSchema);
