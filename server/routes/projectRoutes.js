// routes/projectRoutes.js
import express from 'express';
import * as projectController from '../controllers/projectController.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();



router.post('/create', checkRole('customer'), projectController.createProject);

router.post('/', checkRole('customer'), projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

router.post('/:projectId/tasks',checkRole('freelancer'), projectController.createTaskForProject);
router.get('/:projectId/tasks', projectController.getTasksForProject);
router.get('/user/:userId', projectController.getProjectsByUser);


export default router;
