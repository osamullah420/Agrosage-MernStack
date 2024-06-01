import User from "../models/usersModel.js";
import OTP from "../models/otpModel.js";
import Nadra from "../models/nadraModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";
import { sendEmail } from "../helpers/emailHelper.js";
import { generateOTP } from "../helpers/otpHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, cnic, userRole, password, phone } = req.body;

    // Check if all fields are provided
    if (!name || !email || !cnic || !password || !phone || !userRole) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the user is already registered with the given email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).send({
        success: false,
        message: "User already registered with this email",
      });
    }

    // Check if the user is already registered with the given CNIC
    const existingUserByCnic = await User.findOne({ cnic });
    if (existingUserByCnic) {
      return res.status(400).send({
        success: false,
        message: "User already registered with this CNIC",
      });
    }

    // Check if the CNIC exists in the Nadra table
    const authenticatedUser = await Nadra.findOne({ cnic });
    if (!authenticatedUser) {
      return res
        .status(400)
        .send({ success: false, message: "CNIC not authenticated with Nadra" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const user = new User({
      name,
      email,
      cnic,
      phone,
      userRole,
      password: hashedPassword,
    });

    // Save the new user to the database
    await user.save();

    // Send success response
    res
      .status(201)
      .send({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Registration error", error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password, userRole } = req.body;

    if (!email || !password || !userRole) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid password" });
    }

    if (user.userRole !== userRole) {
      return res.status(400).send({ message: "Invalid user role" });
    }

    const otp = generateOTP();
    await new OTP({ email, otp }).save();

    await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);

    res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Login error", error });
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send({ message: "Email and OTP are required" });
    }

    const record = await OTP.findOne({ email, otp });
    if (!record) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email });
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await OTP.deleteOne({ email, otp });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cnic: user.cnic,
        userRole: user.userRole,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "OTP verification error", error });
  }
};
