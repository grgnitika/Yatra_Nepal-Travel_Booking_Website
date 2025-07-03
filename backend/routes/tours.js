import express from 'express';
import { createTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount } from './../controllers/tourController.js';

const router = express.Router();

// create new tour
router.post('/', createTour);

// update tour
router.put('/:id', updateTour);

// delete tour
router.delete('/:id', deleteTour);

// getSingle tour
router.get('/:id', getSingleTour);

// getAll tour
router.get('/', getAllTour);

// get tour by search
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTours', getFeaturedTour);
router.get('/search/getTourCount', getTourCount);

export default router;