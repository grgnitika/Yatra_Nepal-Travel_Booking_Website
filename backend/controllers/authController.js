import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// user registration
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: 'Successfully created' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create. Try again.' });
  }
};

// user login
export const login = async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

// forgot password with Mailtrap
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 1) find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user with that email found." });
    }

    // 2) generate token + expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1h
    await user.save();

    // 3) build reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // 4) create transporter with correct Mailtrap settings
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // 5) verify connection (will log error if bad creds/host)
    transporter.verify((err, success) => {
      if (err) {
        console.error("Mailtrap connection error:", err);
      } else {
        console.log("✅ Mailtrap is ready to take messages");
      }
    });

    // 6) send mail
    await transporter.sendMail({
      from: '"Yatra Nepal" <no-reply@yatranepal.com>',
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click this link (or paste it into your browser) to reset:\n\n${resetLink}\n\n—Yatra Nepal`,
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> (or paste this URL into your browser) to set a new password:</p>
             <p><a href="${resetLink}">${resetLink}</a></p>`,
    });

    // 7) respond to client
    res.status(200).json({
      message:
        "Reset link sent. Check your Mailtrap inbox (and make sure you’re looking in the correct inbox!)",
    });
  } catch (err) {
    console.error("ForgotPassword Error:", err);
    res.status(500).json({ message: "Error sending reset link." });
  }
};


// reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reset password." });
  }
};
