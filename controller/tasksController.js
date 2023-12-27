// controllers/taskController.js
const Task = require('../Model/tasks');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new task
    const newTask = new Task({
      user: req.user._id,
      title,
      description,
    });

    // Save the task to the database
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Update the task
    await Task.findByIdAndUpdate(req.params.id, { title, description, completed });

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // Delete the task
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
