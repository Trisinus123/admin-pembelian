const express = require('express');
const router = express.Router();
const db = require('../database/db');

function generateKode() {
    const now = new Date();
    const year = now.getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `PBL-${year}${rand}`;
}

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, pr.nama_produk 
            FROM pembelian p 
            JOIN produk pr ON p.produk_id = pr.id
            ORDER BY p.created_at DESC
        `);
        res.render('pembelian/index', {
            title: 'Manajemen Pembelian',
            pembelian: rows
        });
    } catch (err) {
        console.error('ERROR:', err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

router.get('/tambah', async (req, res) => {
    try {
        const [produk] = await db.query(`
            SELECT p.*, s.jumlah_stock 
            FROM produk p 
            JOIN stock_produk s ON p.id = s.produk_id
            WHERE s.jumlah_stock > 0
        `);
        res.render('pembelian/tambah', { title: 'Tambah Pembelian', produk });
    } catch (err) {
        console.error('ERROR:', err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { nama_pembeli, produk_id, jumlah, catatan } = req.body;
        const [[produk]] = await db.query('SELECT harga FROM produk WHERE id = ?', [produk_id]);
        const total_harga = produk.harga * jumlah;
        const kode_pembelian = generateKode();

        await db.query(
            'INSERT INTO pembelian (kode_pembelian, nama_pembeli, produk_id, jumlah, total_harga, catatan) VALUES (?, ?, ?, ?, ?, ?)',
            [kode_pembelian, nama_pembeli, produk_id, jumlah, total_harga, catatan || null]
        );

        await db.query(
            'UPDATE stock_produk SET jumlah_stock = jumlah_stock - ? WHERE produk_id = ?',
            [jumlah, produk_id]
        );

        res.redirect('/pembelian');
    } catch (err) {
        console.error('ERROR:', err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

router.put('/:id/cancel', async (req, res) => {
    try {
        const [[pembelian]] = await db.query(
            'SELECT * FROM pembelian WHERE id = ?',
            [req.params.id]
        );

        await db.query(
            'UPDATE pembelian SET status = "dibatalkan" WHERE id = ?',
            [req.params.id]
        );

        await db.query(
            'UPDATE stock_produk SET jumlah_stock = jumlah_stock + ? WHERE produk_id = ?',
            [pembelian.jumlah, pembelian.produk_id]
        );

        res.redirect('/pembelian');
    } catch (err) {
        console.error('ERROR:', err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

module.exports = router;