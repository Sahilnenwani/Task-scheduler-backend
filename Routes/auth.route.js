const express = require("express");
const router = express.Router();
const {
  registerUser,
  handleLogin,
  handleLogout,
} = require("../Controllers/authController");

router.post("/login", async (req, res) => {
  const bodyData = req.body;
  try {
    const LoginData = await handleLogin(bodyData);

    res.cookie("jwt", LoginData.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    LoginData.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: LoginData.errors,
        })
      : LoginData == "invalid username/password"
      ? res.json({ status: 400, message: "invalid username/password" })
      : LoginData === "not authorized"
      ? res.json({ status: 403, message: "invalid username/password" })
      : res.json({ status: "200", message: "success", Data: LoginData.token });
  } catch (error) {
    res.sendStatus(500);
    console.log("user login errors", error);
  }
});
router.post("/register", async (req, res) => {
  const bodyData = req.body;
  try {
    const userData = await registerUser(bodyData);
    userData.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: userData.errors,
        })
      : res.json({ status: 200, message: "success", Data: userData });
  } catch (error) {
    res.sendStatus(500), console.log("creating new user error", error);
  }
});
router.post("/logout", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.sendStatus(401);
  // console.log(accessToken)
  const tokenData = {
    refreshToken,
    accessToken,
  };
  try {
    const logout = await handleLogout(tokenData);

    logout.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: logout.errors,
        })
      : res.json({
          status: 200,
          message: "logout success"
        });
  } catch (error) {
    res.sendStatus(500);
    console.log("user logout errors", error);
  }
});

module.exports = router;
