const jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;
const JWT_Secret_Refresh = process.env.JWT_Secret_Refresh;

const getAccessToken = (refreshToken) => {
  let accessToken;
  let error;
  jwt.verify(refreshToken, JWT_Secret_Refresh, (err, decoded) => {
    if (err) error = err;
    accessToken = jwt.sign(
      { id: decoded.id, username: decoded.username, role: decoded.role },
      JWT_Secret,
      { expiresIn: "1h" }
    );
  });
  return error ? error : accessToken;
};

module.exports = {
  getAccessToken,
};
