import mongoose from "mongoose";

const installmentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" }, // Add this line
  returnReceipt: {
    public_id: { type: String },
    url: { type: String },
  },
});

const loanSchema = new mongoose.Schema(
  {
    currentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    targetUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    loanAmount: { type: Number, required: true },
    loanDuration: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    loanReturnStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    loanReceipt: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    installments: [installmentSchema],
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
