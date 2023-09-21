const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    
    sender: String,
    receiver: String,
    amount: String,

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
