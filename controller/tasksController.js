const Task = require("../Model/tasks");
exports.createTask = async (req, res) => {
    try {
      console.log('Creating Task:', req.body);
      const { title, description } = req.body;
  
      const newTask = new Task({
        user: req.user._id,
        title,
        description,
      });
  
      await newTask.save();
  
      console.log('Task created successfully');
      res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.getAllTasks = async (req, res) => {
    try {
      console.log('Fetching tasks for user:', req.user._id);
      const tasks = await Task.find({ user: req.user._id });
      console.log('Fetched tasks:', tasks);
      res.status(200).json(tasks);  
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      completed,
    });

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
