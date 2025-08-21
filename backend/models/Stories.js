const mongoose = require("mongoose");
const StorySchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
}, { collection: 'Stories' });
module.exports = mongoose.model("Stories", StorySchema);