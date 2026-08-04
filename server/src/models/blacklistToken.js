const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // token document automatically deletes from blacklist database after 7 days
  },
});

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
