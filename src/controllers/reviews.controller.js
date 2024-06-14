import { pool } from '../db.js';
export const getReviewsByProductId = async (req, res) => {
  const productId = req.query.productId;

  try {
    const connection = await pool.getConnection();
    // Consulta SQL con JOIN para obtener username, photo_url y otros datos de usuarios
    const query = `
      SELECT r.id, r.product_id, r.user_id AS userId, u.username, u.photo_url,
             r.rate, r.comment, r.created_at
      FROM reviews r
      INNER JOIN usuarios u ON r.user_id = u.id
      WHERE r.product_id = ?;
    `;
    const [rows, fields] = await connection.query(query, [productId]);
    connection.release();

    if (rows.length > 0) {
      console.log(`Reviews encontrados para el producto con ID ${productId}:`, rows);
      res.status(200).json(rows);
    } else {
      console.log(`No se encontraron reviews para el producto con ID ${productId}`);
      res.status(404).json({ mensaje: `No se encontraron reviews para el producto con ID ${productId}` });
    }
  } catch (error) {
    console.error("Error al obtener reviews por ID de producto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
// Crear una nueva review
export const createReview = async (req, res) => {
  const { productId, rating, comment } = req.body;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      connection.query('INSERT INTO reviews (product_id, rating, comment) VALUES (?, ?, ?)', [productId, rating, comment], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error al ejecutar consulta:', error);
          return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
        res.status(201).json({ mensaje: 'Review creada exitosamente', id: results.insertId });
      });
    });
  } catch (error) {
    console.error("Error al crear review:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Eliminar una review por ID
export const deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      connection.query('DELETE FROM reviews WHERE id = ?', [reviewId], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error al ejecutar consulta:', error);
          return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
        if (results.affectedRows > 0) {
          res.status(200).json({ mensaje: `Review con ID ${reviewId} eliminada correctamente` });
        } else {
          res.status(404).json({ mensaje: `Review con ID ${reviewId} no encontrada` });
        }
      });
    });
  } catch (error) {
    console.error("Error al eliminar review:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Actualizar una review por ID
export const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      connection.query('UPDATE reviews SET rating = ?, comment = ? WHERE id = ?', [rating, comment, reviewId], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error al ejecutar consulta:', error);
          return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
        if (results.affectedRows > 0) {
          res.status(200).json({ mensaje: `Review con ID ${reviewId} actualizada correctamente` });
        } else {
          res.status(404).json({ mensaje: `Review con ID ${reviewId} no encontrada` });
        }
      });
    });
  } catch (error) {
    console.error("Error al actualizar review:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
