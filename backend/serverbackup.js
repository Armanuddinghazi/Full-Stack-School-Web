require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Hero = require("./models/Hero");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// async function createDefaultHero() {
//   const exists = await Hero.findOne();
//   if (!exists) {
//     await Hero.create({
//       slides: [
//         { title: "Welcome", subtitle: "Bright Future", description: "Slide 1" },
//         { title: "Education", subtitle: "Best Campus", description: "Slide 2" },
//         { title: "Success", subtitle: "Join Us Today", description: "Slide 3" }
//       ]
//     });
//     console.log("Default Hero Created");
//   }
// }


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" Mongo Error:", err.message));


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

app.listen(process.env.PORT, () =>
console.log(`server is running in mode on port ${process.env.PORT}`)
);

