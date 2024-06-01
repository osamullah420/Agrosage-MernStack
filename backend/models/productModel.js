import mongoose from "mongoose";

// REVIEW
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: ["seed", "pesticide", "machine", "nitrates"],
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    photo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    uploadedBy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    uploadedBy_name: {
      type: String,
    },
    reviews: [reviewSchema], // Array to store reviews for the product
    numReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
