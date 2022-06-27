const express = require("express");
const router = express.Router();

const { getAccessToken } = require("../Controllers/refreshTokenController");

router.get("/refreshToken", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    let accessToken = getAccessToken(refreshToken);
    res.json({ status: 200, message: "success", Data: accessToken });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
