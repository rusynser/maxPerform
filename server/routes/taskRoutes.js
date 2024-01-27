// taskRoutes.js
import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

router.post('/', taskController.createTask);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.get('/project/:projectId', taskController.getTasksByProjectId);


router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
