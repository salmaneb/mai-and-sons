const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyPhone: {
    type: Number,
    required: true,
  },
});

const CompaniesList = mongoose.model("CompaniesList", companiesSchema);

module.exports = CompaniesList;
