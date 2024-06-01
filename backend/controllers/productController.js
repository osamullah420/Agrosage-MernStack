import productModel from "../models/productModel.js";
import usersModel from "../models/usersModel.js";
import cloudinary from "cloudinary";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const { photo } = req.files;
    const uploadedBy_id = req.user._id;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ error: "Photo is required and should be less than 1MB" });
    }

    // Fetch the user's name from usersModel based on uploadedBy_id
    const user = await usersModel.findById(uploadedBy_id);

    const CloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );

    if (!CloudinaryResponse) {
      console.error(
        "Cloudinary error : ",
        CloudinaryResponse.error || "unknown cloudinary error!"
      );
    }

    // Create a new product instance
    const product = new productModel({
      name,
      description,
      price,
      category,
      photo: {
        public_id: CloudinaryResponse.public_id,
        url: CloudinaryResponse.secure_url,
      },
      uploadedBy_id,
      uploadedBy_name: user ? user.name : "Unknown", // Include the username
    });

    // Save the product to the database
    await product.save();

    // Send the response
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Error in creating product",
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (products.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No products available",
        products: [],
      });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).send({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error: error.message,
    });
  }
};

export const getProductsByIdController = async (req, res) => {
  try {
    const user = req.user._id;
    const products = await productModel.find({ uploadedBy_id: user });
    if (products.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No products available",
        products: [],
      });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).send({
      success: true,
      message: "Successfully get company all products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting company products",
      error: error.message,
    });
  }
};

//delete product

export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    return res.status(200).send({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting product ",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .populate("reviews.userId");
    // Set response headers to disable caching
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single product",
      error,
    });
  }
};

// update product

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, photoUrl } = req.body;
    let photo;

    if (req.files && req.files.photo) {
      const CloudinaryResponse = await cloudinary.uploader.upload(
        req.files.photo.tempFilePath
      );

      if (!CloudinaryResponse) {
        console.error(
          "Cloudinary error : ",
          CloudinaryResponse.error || "unknown cloudinary error!"
        );
      }

      photo = {
        public_id: CloudinaryResponse.public_id,
        url: CloudinaryResponse.secure_url,
      };
    } else if (photoUrl) {
      photo = { url: photoUrl };
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        price,
        category,
        photo,
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Error while updating product",
    });
  }
};
