const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  themeColor: String,
  themeColor2: String,
  mainHeaderBg: String,
  headerBg: String,
  headerTopBg: String,
  headerSocialIconbg: String,
  headerSocialIconbgHover: String,
  btnBg: String,
  btnHoverBg: String,
  iconColor: String,
  cardBg: String,
  themeColorLight: String,
  themeBgLight: String,
  themeNoticeBgColor: String,
  themeNoticeTextColor: String,
  bodyTextColor: String,
  colorWhite: String,
  colorDark: String,
  heroOverlayColor: String,
  footerBg: String,
  footerBg2: String,
  footerTextColor: String
}, { timestamps: true });

module.exports = mongoose.model("Theme", ThemeSchema);
