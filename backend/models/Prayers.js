const mongoose = require("mongoose");
const PrayerSchema = new mongoose.Schema({
    text: String,
    meaning: String,
}, { collection: 'Prayers' });
module.exports = mongoose.model("Prayers", PrayerSchema);