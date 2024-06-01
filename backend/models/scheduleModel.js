import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  schedulerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  schedulername: {
    type: String,
  },
  targetUsername: {
    type: String,
  },
  scheduledTime: { type: Date, required: true },
});

export default mongoose.model("Schedule", scheduleSchema);
