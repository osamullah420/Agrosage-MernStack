import express from "express";
import {
  createSchedule,
  getschedulesbyId,
} from "../controllers/scheduleController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//create schedule

router.post("/createschedule", requireSignIn, createSchedule);

//get schedules by id / user

router.get("/getschedulesbyid", requireSignIn, getschedulesbyId);

export default router;
