import express from 'express';

import { verifyUser } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking, deleteBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', verifyUser, createBooking);
router.get('/:id', verifyUser, getBooking);
router.get('/', verifyUser, getAllBooking);
router.delete('/:id', verifyUser, deleteBooking);

export default router;