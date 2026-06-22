-- Gunakan database
USE admin_pembelian;

-- Tabel Produk
CREATE TABLE IF NOT EXISTS produk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_produk VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  harga DECIMAL(10,2) NOT NULL,
  kategori VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Stock
CREATE TABLE IF NOT EXISTS stock_produk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produk_id INT NOT NULL,
  jumlah_stock INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (produk_id) REFERENCES produk(id)
);

-- Tabel Pembelian
CREATE TABLE IF NOT EXISTS pembelian (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_pembelian VARCHAR(20) UNIQUE NOT NULL,
  nama_pembeli VARCHAR(100) NOT NULL,
  produk_id INT NOT NULL,
  jumlah INT NOT NULL,
  total_harga DECIMAL(10,2) NOT NULL,
  status ENUM('pending','diproses','selesai','dibatalkan') DEFAULT 'pending',
  catatan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produk_id) REFERENCES produk(id)
);

-- 10 Data Produk
INSERT INTO produk (nama_produk, deskripsi, harga, kategori) VALUES
('Laptop ASUS VivoBook', 'Laptop ringan untuk kerja', 7500000, 'Elektronik'),
('Mouse Wireless Logitech', 'Mouse nirkabel ergonomis', 250000, 'Aksesoris'),
('Keyboard Mechanical', 'Keyboard gaming switch blue', 450000, 'Aksesoris'),
('Monitor 24 inch FHD', 'Monitor IPS Full HD 75Hz', 1800000, 'Elektronik'),
('Headset Gaming RGB', 'Headset surround sound 7.1', 350000, 'Aksesoris'),
('USB Hub 7 Port', 'USB Hub dengan adapter daya', 180000, 'Aksesoris'),
('Webcam HD 1080p', 'Webcam untuk meeting online', 320000, 'Elektronik'),
('SSD External 512GB', 'SSD portabel kecepatan tinggi', 850000, 'Penyimpanan'),
('Kursi Gaming Ergonomis', 'Kursi dengan sandaran punggung', 2200000, 'Furnitur'),
('Meja Gaming L-Shape', 'Meja gaming bentuk L', 1500000, 'Furnitur');

-- Data Stock
INSERT INTO stock_produk (produk_id, jumlah_stock) VALUES
(1,15),(2,50),(3,30),(4,20),(5,40),
(6,60),(7,25),(8,35),(9,10),(10,8);