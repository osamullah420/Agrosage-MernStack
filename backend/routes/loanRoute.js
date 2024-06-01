import express from "express";
import {
  applyLoan,
  getAllLoans,
  getUnpaidLoans,
  orderTrack,
  approveLoan,
  returnLoan,
  getAcceptedloans,
  getPaidloans,
  getCompanyPayment,
  rejectLoan,
} from "../controllers/loanControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/applyforloan", requireSignIn, applyLoan);

router.get("/getallloans", requireSignIn, getAllLoans);

router.get("/unpaid/:retailerId", requireSignIn, getUnpaidLoans);

router.get("/orders/:retailerId", requireSignIn, orderTrack);

router.put("/:loanId/accept", requireSignIn, approveLoan);

router.put("/:loanId/reject", requireSignIn, rejectLoan);

router.put("/:loanId/returnloan", requireSignIn, returnLoan);

router.get("/getloanpaymentdetails/:companyId", getCompanyPayment);

router.get("/getacceptedloans", requireSignIn, getAcceptedloans);

router.get("/getpaidloans", requireSignIn, getPaidloans);

export default router;
