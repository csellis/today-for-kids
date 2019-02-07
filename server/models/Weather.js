const mongoose = require("mongoose");
const { Schema } = mongoose;

const weatherSchema = new Schema({
  location: String,
  weather: Object,
  dateCreated: Date,
  dateUpdated: Date
});

mongoose.model("weathers", weatherSchema);
