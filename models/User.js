const mongoose = require("mongoose");

const UserPlayerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
});

const users = mongoose.connection.useDb('Users');

module.exports = users.model.Users || users.model("User", UserPlayerSchema);