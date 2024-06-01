import express from "express";
import {
  getAllRetailers,
  getAllCompanies,
  getAllUsers,
} from "../controllers/userController.js";

//router object

const router = express.Router();

//routing

//getting all retailers

router.get("/getallretailers", getAllRetailers);

//getting all companies
router.get("/getallcompanies", getAllCompanies);

//getting all users

router.get("/getallusers", getAllUsers);

export default router;
