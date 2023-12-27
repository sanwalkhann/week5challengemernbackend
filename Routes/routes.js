// routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controller/tasksController');
const authMiddleware = require('../middlewares/authmiddleware');

router.use(authMiddleware.authenticateToken);

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
