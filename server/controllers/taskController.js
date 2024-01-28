// taskController.js
import TaskDao from '../dao/taskDao.js';
import { ObjectId } from 'mongodb';

export const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await TaskDao.createTask(taskData);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskDao.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const task = await TaskDao.getTaskById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const id = (req.params.id);
        const updateData = req.body;
        const updatedTask = await TaskDao.updateTask(id, updateData);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        await TaskDao.deleteTask(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksByProjectId = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const tasks = await TaskDao.getTasksByProjectId(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
