// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';
//import * as taskController from '../controllers/taskController.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

export default router;
