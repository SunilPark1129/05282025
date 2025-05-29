const { Router } = require("express");
const router = Router();

const todosApi = require("./todos");
const authApi = require("./auth");

router.use("/todos", todosApi);
router.use("/auth", authApi);

module.exports = router;
