// controllers/projectController.js
import ProjectDao from '../dao/projectDao.js';
import { ObjectId } from 'mongodb';
import TaskDao from '../dao/taskDao.js';

export const createProject = async (req, res) => {
    try {
        const projectData = req.body;
        const project = await ProjectDao.createProject(projectData);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectDao.getAllProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const project = await ProjectDao.getProjectById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const updateData = req.body;
        const updatedProject = await ProjectDao.updateProject(id, updateData);
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        await ProjectDao.deleteProject(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createTaskForProject = async (req, res) => {
    try {
        const projectId = new ObjectId(req.params.projectId);
        const taskData = { ...req.body, projectId };
        const task = await TaskDao.createTask(taskData);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getProjectsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const projects = await ProjectDao.findByUserId(userId);
        res.json(projects);
    } catch (error) {
        res.status(500).send('Error fetching projects: ' + error.message);
    }
};

export const getTasksForProject = async (req, res) => {
    try {
        const projectId = new ObjectId(req.params.projectId);
        const tasks = await TaskDao.getTasksByProjectId(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
