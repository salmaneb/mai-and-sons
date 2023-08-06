const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  
  customername: {
    type: String,
    required: true,
  },
  area: {
    type:String,
    ref: "Areas",
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  openingbalance: {
    type: String,
    required: true,
    },
    commoncode: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: true,
      },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
