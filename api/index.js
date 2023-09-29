const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"images")));
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to mongo"))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", catRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Backend is running at PORT 5000");
})