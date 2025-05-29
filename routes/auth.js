const { Router } = require("express");
const shortid = require("shortid");
const { encryptPassword, comparePassword } = require("../util/password");
const { signToken } = require("../util/token");
const { userInfo } = require("os");

const router = Router();

const users = [
  {
    id: shortid.generate(),
    role: "admin",
    username: "John_Doe",
    password: "123",
  },
  {
    id: shortid.generate(),
    role: "user",
    username: "Jane_Doe",
    password: "123",
  },
];

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // if the input value is empty
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // already have username in db
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "Username already existgs" });
  }

  const newUser = {
    id: shortid.generate(),
    username,
    role: "user", // default value for new users
    password: encryptPassword(password),
  };

  const { password: _, ...userInfo } = newUser; // exclude password from the response

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: userInfo,
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  const isMatch = comparePassword(password, user.password);

  if (!user || !isMatch) {
    return res.status(404).json({ message: "invalid username or password" });
  }

  const { password: _, ...userInfo } = user;

  res.json({
    message: "login successful",
    token: signToken(userInfo),
    user: { id: user.id, username: user.username },
  });
});

module.exports = router;
