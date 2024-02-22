const Task = require("../models/task.model");
const Track = require("../models/track.model");

const taskController = {
    addTask: async (req, res) => {
        try {
            const { task } = req.body;
            console.log(task)
            if (!task) {
                return res.status(400).json({ error: 'Task is required' });
            }

            const newTask = new Task({ task });
            await newTask.save();

            res.status(201).json({ data: newTask });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error?.message });

        }
    },

    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { task } = req.body;
            if (!task) {
                return res.status(400).json({ message: 'Task is required' });
            }
            const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ data: updatedTask });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedTask = await Task.findByIdAndDelete(id);
            if (!deletedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: error?.message });
        }
    },
    dashboardData: async (req, res) => {
        try {
            const todoCount = await Task.countDocuments();
            const trackData = await Track.findOne({});
            // Fetching list of all todos
            const allTodos = await Task.find();
            res.status(200).json({
                todoCount,
                addCount: trackData ? trackData.addCount : 0,
                updateCount: trackData ? trackData.updateCount : 0,
                todos: allTodos
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
};

module.exports = taskController;
