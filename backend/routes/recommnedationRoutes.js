import express from "express";
import {
  getTopRatedProducts,
  getTopRatedUsers,
} from "../controllers/recommendationController.js"; // Adjust import path as per your file structure

const router = express.Router();

router.get("/recommendations", getTopRatedProducts);
router.get("/companies", getTopRatedUsers);

export default router;
