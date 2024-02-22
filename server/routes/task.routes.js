const express = require('express');
const taskController = require('../controllers/task.controller');

const taskRouter = express.Router();
taskRouter.post('/create-task', taskController.addTask);
taskRouter.put('/update-task/:id', taskController.updateTask);
taskRouter.delete('/delete-task/:id', taskController.deleteTask);
taskRouter.get('/dashboard', taskController.dashboardData);


module.exports = taskRouter