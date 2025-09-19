import express from 'express';
import { newReserva } from '../controladores/reserva.js';
import { autenticacion } from '../middleware/auth.js';
export const router = express.Router();

router.post('/nueva', newReserva);
