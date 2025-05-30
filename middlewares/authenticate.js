const { verifyToken } = require("../util/token");

function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Please log in" });
  }
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error("token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;
