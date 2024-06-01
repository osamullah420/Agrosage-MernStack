import Jwt from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

//protected routes token bases

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    const decode = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next(); // Call next to pass control to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

//company middlewares
export const IsCompany = async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.user._id);
    if (user.userRole != "Company") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Acess!",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Company middleware",
    });
  }
};

//retailers middlewares

export const IsRetailer = async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.user._id);
    if (user.userRole != "Retailer") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Acess!",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Retailer middleware",
    });
  }
};
