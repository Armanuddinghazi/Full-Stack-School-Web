require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  dbName: "school_Project"
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err.message));

app.use("/uploads", express.static("uploads"));
app.use("/api/header", require("./routes/headerRoutes"));
app.use("/api/headertop", require("./routes/headerTopRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/counter", require("./routes/counterRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/features", require("./routes/featureRoutes"));
app.use("/api/chooseus", require("./routes/chooseusRoutes"));
app.use("/api/contactMessage", require("./routes/contactRoutes"));
app.use("/api/admission", require("./routes/admissionRoutes"));
app.use("/api/department", require("./routes/departmentRoutes"));
app.use("/api/sections", require("./routes/sectionRoutes"));
app.use("/api/disclosure", require("./routes/disclosureRoutes"));
app.use("/api/applypage", require("./routes/applyPageRoutes"));
app.use("/api/infrastructure", require("./routes/infraRoutes"));
app.use("/api/scholarshipSection", require("./routes/scholarshipSectionRoutes"));
app.use("/api/scholarshipCards", require("./routes/scholarshipCardRoutes"));
app.use("/api/careers", require("./routes/careerRoutes"));
app.use("/api/theme", require("./routes/themeRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));

// module.exports = app; 
app.listen(process.env.PORT, () =>
console.log(`server is running in mode on port ${process.env.PORT}`)
);
