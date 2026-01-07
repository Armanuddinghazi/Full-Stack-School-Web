require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err.message));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/counter", require("./routes/counterRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/contactMessage", require("./routes/contactRoutes"));

// module.exports = app; 
app.listen(process.env.PORT, () =>
console.log(`server is running in mode on port ${process.env.PORT}`)
);
