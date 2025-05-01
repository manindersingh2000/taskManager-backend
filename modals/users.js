import mongoose from "mongoose";
const { Schema } = mongoose;
// Define the User Schema
const userSchema = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // Ensures email is unique
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});
// Create and export the model based on the schema
const User = mongoose.model("User", userSchema);
// module.exports = User;
export default User