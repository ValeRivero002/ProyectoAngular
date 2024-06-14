import express from 'express';
import {
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview
} from '../controllers/reviews.controller.js';

const router = express.Router();

// Ruta para obtener todos los reviews de un producto por su ID
router.get('/reviews', getReviewsByProductId);

// Ruta para crear un nuevo review
router.post('/reviews', createReview);

// Ruta para actualizar un review existente por su ID
router.put('/reviews/:id', updateReview);

// Ruta para eliminar un review existente por su ID
router.delete('/reviews/:id', deleteReview);

export default router;
