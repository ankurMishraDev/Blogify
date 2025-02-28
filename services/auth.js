const jwt = require("jsonwebtoken");
const secret = "7";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
  
}

module.exports = {createTokenForUser, validateToken};