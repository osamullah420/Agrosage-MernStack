import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    userRole: {
      type: String,
      enum: {
        values: ["Retailer", "Company"],
      }, //company or retailer
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    paymentDetails: [
      {
        accountname: {
          type: String,
          enum: {
            values: ["jazzcash", "easypaisa", "HBL", "MCB", "allied"],
          },
        },
        accountnumber: {
          type: String,
        },
      },
    ],
    reviews: [reviewSchema], // Array to store reviews for the user
    totalRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

export default mongoose.model("users", userSchema);
