const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Listing = require("./listing")

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing"}] // ✅ Ensure this field exists
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);