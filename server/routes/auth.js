import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/login', loginUser);
router.get('/logout', logoutUser);

export default router;