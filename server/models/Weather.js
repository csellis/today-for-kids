const mongoose = require("mongoose");
const { Schema } = mongoose;

const weatherSchema = new Schema({
  location: Object,
  weather: Object,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("weathers", weatherSchema);
