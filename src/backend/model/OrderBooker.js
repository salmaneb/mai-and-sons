const mongoose = require("mongoose");

const orderBookerSchema = new mongoose.Schema({
  orederBookerName: {
    type: String,
    required: true,
  },  
});

const OrderBooker = mongoose.model("OrderBooker", orderBookerSchema);

module.exports = OrderBooker;
