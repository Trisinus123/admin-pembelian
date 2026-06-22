const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET - Daftar stock
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT p.*, s.jumlah_stock, s.updated_at as stock_updated
      FROM produk p 
      JOIN stock_produk s ON p.id = s.produk_id
      ORDER BY s.jumlah_stock ASC
    `);
        res.render('stock/index', { title: 'Manajemen Stock', stock: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// PUT - Update stock
router.put('/:produk_id', async (req, res) => {
    try {
        const { jumlah_stock } = req.body;
        await db.query(
            'UPDATE stock_produk SET jumlah_stock = ? WHERE produk_id = ?',
            [jumlah_stock, req.params.produk_id]
        );
        res.redirect('/stock');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;