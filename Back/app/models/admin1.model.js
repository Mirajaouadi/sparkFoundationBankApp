const mongoose = require("mongoose");

const Admin1Schema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "The login is unique"],
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin1", Admin1Schema);
