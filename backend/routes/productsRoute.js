import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductsByIdController,
  deleteProduct,
  updateProduct,
  getSingleProductController,
} from "../controllers/productController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing

//create product

router.post("/createproduct", requireSignIn, createProductController);

//get all products
router.get("/getallproducts", getAllProductsController);

//get AllproductsByID

router.get("/getproductsbyid", requireSignIn, getProductsByIdController);

//get single product
router.get("/getsingleproduct/:pid", getSingleProductController);

//delete product

router.delete("/deleteproduct/:pid", deleteProduct);

//update Product

router.put("/updateproduct/:pid", requireSignIn, updateProduct);

export default router;
