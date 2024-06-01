import express from "express";
import {
  registerController,
  loginController,
  verifyOTPController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing

//register

router.post("/register", registerController);
//login

router.post("/login", loginController);

router.post("/verify-otp", verifyOTPController);

//protected route

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
