const { Router } = require("express");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = Router();

// admin only
router.get("/control-board", authorizeRoles("admin"), (req, res) => {
  return res.status(200).json({
    message: "this is the control board",
    data: {
      users: 100,
      activeUsers: 75,
      inactiveUsers: 25,
      newRegistrations: 10,
    },
  });
});

// admin and mod only
router.patch("/ban-user/:id", authorizeRoles("admin", "mod"), (req, res) => {
  console.log("banning user...");
  const userId = req.params.id;

  return res.status(200).json({
    message: `user ${userId} has been banned successfully`,
  });
});

module.exports = router;
