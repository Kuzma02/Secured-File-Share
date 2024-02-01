require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("./db/connect");
const File = require("./models/File");
const fs = require("fs");
const rateLimit = require('express-rate-limit');
const nosqlSanitizer = require('express-nosql-sanitizer');
const { xss } = require('express-xss-sanitizer');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

const sendEmailMailjet = require("./controllers/sendEmail");



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

app.use(nosqlSanitizer());

app.use(limiter)


app.use(cors({
  exposedHeaders: ['Content-Disposition']
}));
app.use(fileUpload());


app.post("/", express.json(), async (req, res) => {

  if (!req.files || !req.files.encryptedFile) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.encryptedFile;
  const originalName = req.body.originalName;
  const receiverEmail = req.body.receiverEmail;
  const password = req.body.password;

  const filename = Date.now() + "_" + file.name;
  const uploadPath = __dirname + "/uploads/" + filename;
  try {
    await file.mv(uploadPath);

    const extension = path.extname(originalName);
    const fileId = uuidv4();
    const downloadLink = `http://localhost:4000/download/${fileId}`;

    const newFile = new File({
      fileName: filename,
      originalName: originalName,
      path: uploadPath,
      downloadLink: downloadLink,
      extension: extension,
      password: password
    });
    await newFile.save();

    
    if (receiverEmail) {
      try {
        await sendEmailMailjet(receiverEmail, fileId);
      } catch (error) {
        console.log("Error sending email:", error);

        return res.status(500).json({ msg: "Error sending email", error: error.message });
      }
    }
    

    res
      .status(200)
      .json({ msg: "File uploaded successfully", link: downloadLink });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error while uploading file", error: err.message });
  }
});


app.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findOne({
      downloadLink: `http://localhost:4000/download/${req.params.id}`,
    });


    const password = req.headers['password'];

    if (!file || !file.path || file.password !== password) {
      return res.status(403).send({ msg: "Access denied" });
    }

    const filename = file.originalName || "downloaded_file";
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(filename)}"`
    );
    res.download(file.path, filename, async (err) => {
      if (!err) {

        await File.deleteOne({ _id: file._id });

        fs.unlink(file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Greška prilikom brisanja fajla:", unlinkErr);
          } else {
            console.log("Fajl uspešno obrisan nakon preuzimanja.");
          }
        });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Error retrieving file", error: err.message });
  }
});

app.post("/send", express.json(), async (req, res) => {

  const { receiverEmail, fileID, senderName } = req.query;
  try {
    await sendEmailMailjet(receiverEmail, fileID, senderName);
    res.status(200).json({ msg: "Email sent successfully" });
  } catch (error) {
    console.error("Greška prilikom slanja e-maila:", error);
    res.status(500).json({ error: error.message });
  }
});


const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
