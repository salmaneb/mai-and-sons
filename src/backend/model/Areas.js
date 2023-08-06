const mongoose = require("mongoose");

const areasSchema = new mongoose.Schema({
  
  areasname: {
    type: String,
    required: true,
  },
});

const Areas = mongoose.model("Areas", areasSchema);

module.exports = Areas;
