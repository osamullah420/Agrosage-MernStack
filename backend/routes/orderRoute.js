import express from "express";
import {
  addOrder,
  getOrdersById,
  confirmOrder,
  cancelOrder,
} from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addorder", requireSignIn, addOrder);

router.get("/getordersbyid", requireSignIn, getOrdersById);

// Route to confirm an order
router.put("/confirmorder/:id", requireSignIn, confirmOrder);

// Route to cancel an order
router.put("/cancelorder/:id", requireSignIn, cancelOrder);

export default router;
