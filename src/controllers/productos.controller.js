import { pool } from "../db.js";

export const getProductos = async(req, res) => {
    const result = await pool.query('SELECT * FROM productos');
    console.log(result[0]);
    res.send(result[0]);
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM productos WHERE id = ?', [id]);
      connection.release();
  
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ mensaje: `Producto con ID ${id} no encontrado` });
      }
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };
  
  
  // Función para obtener todas las categorías de productos
  export const getProductCategories = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT DISTINCT category FROM productos');
      connection.release();
  
      const categorias = rows.map(row => row.category);
      res.status(200).json(categorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };
  
  // Función para obtener productos por categoría
  export const getProductosByCategory = async (req, res) => {
    const categoria = req.params.categoria;
  
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM productos WHERE category = ?', [categoria]);
      connection.release();
  
      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).json({ mensaje: `No se encontraron productos en la categoría ${categoria}` });
      }
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };