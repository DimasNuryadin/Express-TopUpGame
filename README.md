# 🧱 Express-TopUpGame

**Express-TopUpGame** adalah backend API untuk proyek **Top Up Game** dalam kelas **BuildWithAngga**.  
Aplikasi ini dibangun dengan **Express.js** dan **MongoDB**, berfungsi untuk menangani autentikasi, data game, transaksi, serta komunikasi data ke frontend **[Next-TopUpGame](https://github.com/DimasNuryadin/Next-TopUpGame)**.

---

## 🏗️ Teknologi & Arsitektur

Proyek ini dibangun dengan stack berikut:

- **Express.js** — framework backend berbasis Node.js  
- **MongoDB + Mongoose** — database dan ODM  
- **JWT (JSON Web Token)** — autentikasi pengguna  
- **bcrypt.js** — enkripsi password  
- **dotenv** — konfigurasi environment  
- **CORS & Morgan** — keamanan & logging API  

---

## 📁 Struktur Direktori

```
src/
 ├─ config/
 ├─ controllers/
 ├─ middlewares/
 ├─ models/
 ├─ routes/
 ├─ utils/
 └─ server.js
.env.example
package.json
```

Penjelasan singkat:

- `config/` — koneksi database & konfigurasi dasar  
- `controllers/` — logika utama API (auth, top-up, transaksi)  
- `middlewares/` — middleware autentikasi dan validasi  
- `models/` — skema Mongoose untuk data user & game  
- `routes/` — definisi endpoint API  
- `utils/` — helper seperti error handling & response standar  
- `server.js` — entry point aplikasi  

---

## 🚀 Instalasi & Menjalankan Server

### Prasyarat
- Node.js (versi 18+ disarankan)  
- MongoDB (lokal atau Atlas)  
- npm / yarn  

### Langkah

1. Clone repository:

   ```bash
   git clone https://github.com/DimasNuryadin/Express-TopUpGame.git
   cd Express-TopUpGame
   ```

2. Install dependencies:

   ```bash
   npm install
   # atau
   yarn install
   ```

3. Buat file `.env` dan isi seperti contoh berikut:

   ```bash
   MODE=dev
   SERVICE_NAME=express-topupgame
   MONGO_URL=mongodb://127.0.0.1:27017/db_name
   JWT=your_jwt_secret
   ```

4. Jalankan server development:

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. Server berjalan di **http://localhost:4000** (atau sesuai PORT di `.env`).

---

## 🔗 Integrasi dengan Frontend

Frontend: [Next-TopUpGame](https://github.com/DimasNuryadin/Next-TopUpGame)

Gunakan variabel berikut di frontend:

```
NEXT_PUBLIC_API=https://express-top-up-game.vercel.app
NEXT_PUBLIC_IMG=https://express-top-up-game.vercel.app/uploads
```

Pastikan **CORS** aktif agar request dari domain frontend dapat diterima oleh backend.

---

## 📚 Endpoint Utama (Contoh)

| Method | Endpoint | Deskripsi |
|--------|-----------|-----------|
| `POST` | `/api/v1/auth/signup` | Registrasi pengguna |
| `POST` | `/api/v1/auth/signin` | Login pengguna & JWT token |
| `GET` | `/api/v1/games` | Mendapatkan daftar game |
| `GET` | `/api/v1/categories` | Mendapatkan kategori game |
| `POST` | `/api/v1/transactions` | Membuat transaksi top up |
| `GET` | `/api/v1/transactions/history` | Melihat riwayat transaksi |

---

## 🧩 Middleware

Middleware penting yang digunakan:

- `authMiddleware.js` — verifikasi JWT  
- `errorHandler.js` — penanganan error global  
- `validateInput.js` — validasi input pengguna  

---

## 📦 Deployment

Aplikasi dapat dideploy ke **Vercel**, **Render**, **Railway**, atau server Node.js lain.  
Untuk mode produksi:

```bash
npm run build
npm start
```

Pastikan `.env` disesuaikan dengan konfigurasi produksi (database & JWT secret).

Link deployment:  
🔗 [https://express-top-up-game.vercel.app](https://express-top-up-game.vercel.app)

---

## ✅ Fitur Utama

- Autentikasi pengguna dengan JWT  
- Manajemen data game & kategori  
- Transaksi top up & riwayat pengguna  
- Integrasi penuh dengan frontend Next.js  
- Struktur modular & mudah dikembangkan  

---

## 📸 Screenshoot
<img src="https://res.cloudinary.com/dgharj3cy/image/upload/v1736314851/img_project101_ckmeu7.png" alt="StoreGG Backend" />

---

## ℹ️ Catatan & Tips

- Pastikan database MongoDB berjalan sebelum menjalankan server.  
- Gunakan **Postman** untuk menguji endpoint API.  
- Simpan JWT secret dengan aman dan jangan commit ke repo publik.  

---
