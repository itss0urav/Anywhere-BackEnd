const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "15m",
  });
};
const generateRefreshTokenToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "15m",
  });
};

module.exports = { generateAccessToken, generateRefreshTokenToken };
