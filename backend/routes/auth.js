import express from 'express';
import { login, register, forgotPassword,
  resetPassword, } from './../controllers/authController.js';

const router = express.Router()

router.post('/register', register);
router.post('/login', login);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// POST /api/auth/reset-password/:token
router.post("/reset-password/:token", resetPassword);

export default router;