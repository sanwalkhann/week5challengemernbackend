const express = require("express");
const router = express.Router();
const taskController = require("../controller/tasksController");
const passport = require("../config/passport");

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
