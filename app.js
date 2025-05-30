const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
); // study more about this. same as app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);

// app.get("/private", (req, res) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer token
//   if (!token) {
//     return res.status(401).json({ message: "please log in" });
//   }

//   try {
//     verifyToken(token);

//     // 200
//     res.json({ meesage: "this is the private information" });
//   } catch (error) {
//     console.error("token verification failed:", error);
//     res.status(401).json({ message: "invalid token" });
//   }
// });

// app.get("/admin-only", (req, res) => {
//   const authHeader = req.headers["authorization"];

//   const token = authHeader && authHeader.split(" ")[1]; // Bearer token
//   if (!token) {
//     return res.status(401).json({ message: "please log in" });
//   }

//   try {
//     const payload = verifyToken(token);
//     if (payload.role !== "admin") {
//       return res.status(403).json({ message: "access denied" });
//     }

//     // 200
//     res.json({ message: "this is the private information" });
//   } catch (error) {
//     console.error("token verification failed", error);
//     res.status(401).json({ message: "invalid token" });
//   }
// });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
