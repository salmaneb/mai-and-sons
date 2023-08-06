const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyValue: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
    unique: true,
  },
  purchasePrice: {
    type: String,
    required: true,
  },
  purchaseDiscount: {
    type: Number,
    required: true,
  },
  reOrderLevel: {
    type: Number,
    required: true,
  },
  minSalePrice: {
    type: Number,
    required: true,
  },
});

const Items = mongoose.model("Items", itemSchema);

module.exports = Items;
