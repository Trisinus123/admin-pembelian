const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const produkRoutes = require('./routes/produk');
const stockRoutes = require('./routes/stock');
const pembelianRoutes = require('./routes/pembelian');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.redirect('/pembelian'));
app.use('/produk', produkRoutes);
app.use('/stock', stockRoutes);
app.use('/pembelian', pembelianRoutes);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});