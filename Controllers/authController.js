const userDocument = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("../Models/sessionSchema");

const registerUser = async (bodyData) => {
  const passwordhash = await bcrypt.hash(bodyData.password, 10);
  const newUser = new userDocument({
    username: bodyData.username,
    email: bodyData.email,
    password: passwordhash,
  });
  try {
    const savedUser = await newUser.save();
    return savedUser;
    //res.status(200).json(savedUser);
  } catch (error) {
    return error;
    //res.sendStatus(500), console.log("creating new user error", error);
  }
};
const handleLogin = async (bodyData) => {
  const { username, password } = bodyData;
  console.log(process.env.JWT_Secret);
  try {
    const User = await userDocument.findOne({ username });
    // console.log("user data in login request",User)

    if (!User) {
      return "invalid username/password";
    }

    if (await bcrypt.compare(password, User.password)) {
      const token = jwt.sign(
        { id: User._id, username: User.username, role: User.role },
        process.env.JWT_Secret,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { id: User._id, username: User.username, role: User.role },
        process.env.JWT_Secret_Refresh,
        { expiresIn: "1d" }
      );
      return { token: token, refreshToken: refreshToken };
    } else {
      return "not authorized";
    }
  } catch (error) {
    return error;
  }
};
const handleLogout = async (tokenData) => {
  try {
    const responce = await session.create(tokenData);
    return responce;
  } catch (error) {
    return error;
  }
};

module.exports = {
  registerUser,
  handleLogin,
  handleLogout,
};
