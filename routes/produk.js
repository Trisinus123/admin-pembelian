const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, s.jumlah_stock 
            FROM produk p 
            LEFT JOIN stock_produk s ON p.id = s.produk_id
            ORDER BY p.id ASC
        `);
        res.render('produk/index', { title: 'Daftar Produk', produk: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;