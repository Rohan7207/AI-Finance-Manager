const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const cookieOptions = require("../utils/cookieOptions");

const crypto = require("crypto");
const passwordResetTokenModel = require("../models/passwordResetToken.model");
const { sendPasswordResetEmail } = require("../services/email.service");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Model.create() internally creates a document and calls save(), so pre("save") middleware is executed.
    // But since we have created save() in model whne object is created,  Password hashing is handled automatically by the pre("save") middleware.
    const user = new userModel({
      username,
      email,
      password,
    });

    await user.save();

    const token = user.generateAuthToken();

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPassword = await user.comparePassword(password);

    if (!isPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User login successfull",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUserProfile(req, res) {
  return res.status(200).json({ user: req.user });
}

async function logoutUser(req, res) {
  await blacklistTokenModel.create({ token: req.token });

  res.clearCookie("token", cookieOptions);

  return res.status(200).json({ message: "Logout successful" });
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists with this email, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await passwordResetTokenModel.deleteMany({
      user: user._id,
    });

    await passwordResetTokenModel.create({
      user: user._id,
      tokenHash,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15mins
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(email, resetUrl);

    return res.status(200).json({
      message:
        "If an account exists with this email, a reset link has been sent.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Intenal server error" });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;

    // Hash the incoming token from request body
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // We're checking all three things at once: tokenHash matches , used === false  , expiresAt > now      ✅
    // So an expired or already-used token can't reset the password.
    const resetToken = await passwordResetTokenModel.findOne({
      tokenHash,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    // Find user using generated resettoken
    const user = await userModel.findById(resetToken.user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    // user.password = password changes the password in the Mongoose document, and user.save() triggers the pre-save middleware, hashes the new password, and then saves it to MongoDB.
    user.password = password;
    await user.save();

    // After a successful password reset: That makes the reset token single-use.
    await passwordResetTokenModel.deleteOne({
      _id: resetToken._id,
    });

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
};
