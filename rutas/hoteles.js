import express from 'express';
import { deleteHotel, getHotel, getHotels, newHotel, editHotel } from '../controladores/hotel.js';
import { autenticacion } from '../middleware/auth.js';
export const router = express.Router();

router.get('/', autenticacion, getHotels);
router.get('/:id', getHotel);
router.post('/nuevo', newHotel);
router.delete('/:id', deleteHotel);
router.patch('/:id', editHotel)
