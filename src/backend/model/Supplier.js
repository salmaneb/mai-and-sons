const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  
  distributername: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  debit: {
    type: String,
    required: true,
    },
    credit: {
        type: String,
        required: true,
      },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
