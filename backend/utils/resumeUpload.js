const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/resumes",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(null, false); 
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
