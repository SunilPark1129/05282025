const { Router } = require("express");
const router = Router();

const todosApi = require("./todos");
const authApi = require("./auth");
const internal = require("./internal");
const { verifyToken } = require("../util/token");
const authenticate = require("../middlewares/authenticate");

// session || localstore
// // private
// function authenticationMiddleware(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer token
//   if (!token) {
//     return res.status(401).json({ message: "please log in" });
//   }

//   try {
//     verifyToken(token);
//     next();
//   } catch (error) {
//     console.error("token verification failed:", error);
//     res.status(401).json({ message: "invalid token" });
//   }
// }

router.use("/todos", authenticate, todosApi);
router.use("/auth", authApi);
router.use("/", internal);

module.exports = router;
