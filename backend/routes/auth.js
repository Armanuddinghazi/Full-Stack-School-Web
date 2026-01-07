const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json("Admin already exists");
    }
    await Admin.create({
      email,
      password: password,
    });

    res.json({ message: "Admin created" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN INPUT:", email, password);

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    console.log("ADMIN FROM DB:", admin);

    if (!admin) {
      return res.status(401).json("Invalid credentials");
    }

    const match = await bcrypt.compare(password, admin.password);
    console.log("PASSWORD MATCH:", match);

    if (!match) {
      return res.status(401).json("Invalid credentials");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
