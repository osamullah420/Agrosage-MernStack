import Product from "../models/productModel.js"; // Adjust import path as per your file structure
import User from "../models/usersModel.js"; // Adjust import path as per your file structure

// Fetch top rated products with rating > 2.5
export const getTopRatedProducts = async (req, res) => {
  try {
    const recommendations = await Product.aggregate([
      {
        $project: {
          name: 1,
          category: 1,
          description: 1,
          price: 1,
          photo: 1,
          uploadedBy_id: 1,
          uploadedBy_name: 1,
          numReviews: { $size: "$reviews" },
          rating: { $avg: "$reviews.rating" },
        },
      },
      { $match: { rating: { $gt: 2.5 } } }, // Filter products with rating > 2.5
      { $sort: { rating: -1 } }, // Sort by highest average rating
      { $limit: 10 }, // Limit to 10 products
    ]);

    res.status(200).send({ success: true, recommendations });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).send({ success: false, message: "Server error", error });
  }
};

// Fetch top rated users with rating > 2.5
export const getTopRatedUsers = async (req, res) => {
  try {
    const topRatedUsers = await User.aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          ratings: "$reviews.rating", // Map 'reviews.rating' to 'ratings' array for aggregation
          rating: { $avg: "$reviews.rating" }, // Calculate average rating
          numReviews: { $size: "$reviews" }, // Count total reviews
        },
      },
      { $match: { rating: { $gt: 2.5 } } }, // Filter users with rating > 2.5
      { $sort: { rating: -1 } }, // Sort by highest average rating
      { $limit: 10 }, // Limit to 10 users
    ]);

    res.status(200).send({ success: true, topRatedUsers });
  } catch (error) {
    console.error("Error fetching top rated users:", error);
    res.status(500).send({ success: false, message: "Server error", error });
  }
};
