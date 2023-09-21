const mongoose = require("mongoose");

const User1Schema = mongoose.Schema(
  {
    name:String ,
    email: {
      type: String,
      unique: [true, "The email is unique"],
    },
    balance: String,
    num: String,
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User1", User1Schema);
