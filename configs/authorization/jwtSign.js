const jwt = require("jsonwebtoken");

const generateAccessToken = (encode) => {
  return jwt.sign(encode, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
};
const generateRefreshTokenToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "15m",
  });
};

module.exports = { generateAccessToken, generateRefreshTokenToken };
