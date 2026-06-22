# Admin Pembelian — Panduan Penggunaan

## Cara Menjalankan
1. Install dependencies: `npm install`
2. Jalankan schema.sql di MySQL
3. Buat file `.env` dan isi:
   - DB_HOST=localhost
   - DB_USER=root
   - DB_PASSWORD=root
   - DB_NAME=admin_pembelian
   - PORT=3000
4. Jalankan server: `npm run dev`
5. Buka browser: `http://localhost:3000`

## Cara Menggunakan

### Tambah Pembelian
1. Klik tombol **+ Tambah Pembelian**
2. Isi nama pembeli
3. Pilih produk
4. Isi jumlah
5. Klik **Simpan Pembelian**

### Cancel Pembelian
1. Di daftar pembelian, klik **Batalkan**
2. Konfirmasi pembatalan
3. Status berubah jadi **dibatalkan** dan stok otomatis kembali

### Lihat Produk
- Klik menu **Produk** di sidebar

### Kelola Stock
- Klik menu **Stock** di sidebar
- Ubah jumlah stok lalu klik **Simpan**
