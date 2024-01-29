const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const FileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: [true, "Please provide file name"]
    },
    password: {
        type: String,
        required: true
      },
    originalName: {
        type: String,
        required: [true, "Please add original file name"]
    },
    path: {
        type: String,
        required: [true, "Please provide path name"],

    },
    downloadLink: {
        type: String,
        required: [true, "Please provide download link"]
    },
    extension: {
        type: String,
        required: [true, "Please provide file extension"]
    }
});


module.exports = mongoose.model("File", FileSchema);