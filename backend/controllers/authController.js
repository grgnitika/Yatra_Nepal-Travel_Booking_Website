// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// //user registration
// export const register = async (req, res) => {
//     try {

//         // hashing password
//         const salt = bcrypt.genSaltSync(10)
//         const hash = bcrypt.hashSync(req.body.password, salt)

//         const newUser = new User ({
//             username: req.body.username,
//             email:req.body.email,
//             password: hash,
//             photo: req.body.photo,
//         });

//         await newUser.save();

//         res.status(200).json({success: true, message: 'Successfully created' });

//     } catch (err) {
//         res.status(500).json({success: false, message: 'Failed to create.Try again' });
//     }
// };

// // user login
// export const login = async (req, res) => {
//   const username = req.body.username;

//   try {
//     // find user by username
//     const user = await User.findOne({ username });

//     // if user doesn't exist
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // compare password
//     const checkCorrectPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!checkCorrectPassword) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Incorrect username or password" });
//     }

//     const { password, role, ...rest } = user._doc;

//     // create JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "15d" }
//     );

//     // set cookie & send response
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//         expires: token.expiresIn,
//       })
//       .status(200)
//       .json({
//         token,
//         data: { ...rest },
//         role,
//       });

//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to login" });
//   }
// };

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// ✅ user registration
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

// ✅ user login
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

// ✅ forgot password with Mailtrap
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user with that email found." });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // ✅ Mailtrap transporter instead of Gmail
    const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2d00f6b6c806a5",
    pass: "b216b51625d2bb",
  },
});

    const mailOptions = {
      from: '"Yatra Nepal" <no-reply@yatranepal.com>',
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset link sent. Check your inbox (Mailtrap)!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending reset link." });
  }
};


// ✅ reset password
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
