const mongoose = require("mongoose");
const QuoteSchema = new mongoose.Schema({
    text: String,
    author: String,
}, { collection: 'Quotes' });
module.exports = mongoose.model("Quotes", QuoteSchema);