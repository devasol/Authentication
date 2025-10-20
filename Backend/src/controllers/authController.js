import bcrypt from "bcrypt";
import User from "../models/user.js";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registerd successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error registering user.",
      message: error,
    });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error logging in" });
      }
      return res.status(200).json({
        message: "User logged in successfully",
        username: user.username,
        isMfaActive: user.isMfaActive,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }
};
export const logout = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Error destroying session" });
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logout successful" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};
export const setup2FA = async (req, res) => {
  try {
    console.log("The req.user is:", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The secret key is:", secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "Dawit Solomon",
      encoding: "base32",
    });
    const qrImageUrl = await qrcode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error registering user.",
      message: error,
    });
  }
};
export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  console.log("Verifying token:", token);
  console.log("User secret:", user.twoFactorSecret);

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1,
  });

  console.log("Verification result:", verified);

  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "2FA successfull",
      token: jwtToken,
    });
  } else {
    res.status(400).json({
      message: "Invalid 2FA token",
    });
  }
};
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.isMfaActive = false;
    user.twoFactorSecret = "";

    await user.save();
    res.status(200).json({
      message: "@2FA reset successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error reseting 2Fa ${error}`,
    });
  }
};
