import mongoose from "mongoose";

const nadraSchema = new mongoose.Schema(
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
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model("nadra", nadraSchema);
