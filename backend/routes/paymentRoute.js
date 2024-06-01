import express from "express";
import {
  addpayment,
  getPaymentDetails,
  deletePayment,
  updatepayment,
  getSinglePaymentDetail,
  getPaymentOrder,
} from "../controllers/paymentController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addpayment", requireSignIn, addpayment);

router.get("/getpayment", requireSignIn, getPaymentDetails);

router.delete("/deletepayment/:paymentId", requireSignIn, deletePayment);

router.put("/updatepayment/:paymentId", requireSignIn, updatepayment);

router.get("/getpaymentorder/:id", getPaymentOrder);

router.get(
  "/getsinglepayment/:paymentId",
  requireSignIn,
  getSinglePaymentDetail
);

export default router;
