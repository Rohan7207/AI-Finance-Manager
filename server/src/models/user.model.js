const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Name should be at least of 3 characters long"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

// methods - Belong to one document (one user).
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);

  return token;
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// statics - Belong to the Model.
// userSchema.statics.hashPassword = async (password) {
//     return bcrypt.hash(password, 10);
// }

// It's a function that Mongoose executes before saving a document.
// this. does not refer to the user document in arrow function so we use normal async
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return; // If password was'nt modified we continue saving document by returning, If you don't call next() (or don't finish the middleware properly), Mongoose waits because it thinks the middleware hasn't finished.
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
