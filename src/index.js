import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.routes.js';
import reviewsRoutes from './routes/reviews.routes.js';
const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // Permitir solicitudes desde el puerto de Angular
}));

app.use(express.json());
app.use('/', productosRoutes);

// Rutas para reviews
app.use('/', reviewsRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});