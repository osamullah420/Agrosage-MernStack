import express from "express";
import { ReviewController } from "../controllers/FeedbackRatings.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// REVIEW PRODUCT
router.post("/reviews/:productId", requireSignIn, ReviewController);

export default router;
