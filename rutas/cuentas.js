import express from 'express';
import { newUser, loginUser } from '../controladores/cuenta.js';
export const router = express.Router();

router.post('/registro', newUser);
router.post('/ingreso', loginUser);