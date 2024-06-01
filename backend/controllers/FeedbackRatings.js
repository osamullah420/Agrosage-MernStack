import usersModel from "../models/usersModel.js";
import productModel from "../models/productModel.js";
import orderSchema from "../models/orderSchema.js";

export const ReviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;

    if (!comment || !rating || !productId) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid input data" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    const productReview = {
      userId: userId,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(productReview);

    const totalProductReviews = product.reviews.length;
    const totalProductRating = product.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    product.numReviews = totalProductReviews;
    product.rating = totalProductRating / totalProductReviews;

    await product.save();

    const order = await orderSchema.findOne({
      "products.productId": productId,
    });

    const productIndex = order.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex !== -1) {
      order.products[productIndex].feedbackStatus = "yes";
      await order.save();
    }

    const company = await usersModel.findById(product.uploadedBy_id);

    const companyReview = {
      productId: productId,
      rating: Number(rating),
      comment,
    };

    company.reviews.push(companyReview);

    const totalCompanyReviews = company.reviews.length;
    const totalCompanyRating = company.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    company.numReviews = totalCompanyReviews;
    company.rating = totalCompanyRating / totalCompanyReviews;

    await company.save();

    res
      .status(200)
      .send({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
};
