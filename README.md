# Frontend Engineer Test - PT Data Integrasi Inovasi (NUHA)

## 📌 Overview
[cite_start]Repositori ini berisi hasil pengerjaan tes teknikal Frontend Developer untuk aplikasi **NUHA** (Modul Rawat Inap - Pasien Masuk)[cite: 59, 65]. [cite_start]Aplikasi ini mengimplementasikan Formulir Pasien Masuk dan Daftar Pasien Aktif dengan fokus pada *clean architecture*, komponen *reusable*, dan *strict type-safety*[cite: 67, 69, 78, 79].

## 🚀 Tech Stack
- [cite_start]**Framework:** React v18 (Vite) [cite: 61]
- [cite_start]**Language:** TypeScript (Strict, no `any`) [cite: 62, 78]
- [cite_start]**Styling:** Tailwind CSS [cite: 63]
- [cite_start]**State Management:** React Built-in State (`useState` / Context API) [cite: 64, 80]

## ✨ Features Implemented
[cite_start]Sesuai dengan studi kasus yang diberikan[cite: 65]:
1. [cite_start]**Formulir Pasien Masuk:** Form input lengkap (Nama, NIK, Diagnosa, Tanggal, Dokter, Ruangan) beserta validasi wajib isi (*required*) dan batas karakter NIK[cite: 67, 68].
2. [cite_start]**Daftar Pasien Aktif:** Tabel data pasien dengan fitur *sorting* (berdasarkan nama/tanggal) dan pencarian (*search* by Nama/NIK)[cite: 69, 71, 73].
3. [cite_start]**Simulasi API & UX:** Menggunakan *mock data* dengan jeda waktu (*delay*) 500ms untuk mengimplementasikan *Loading state* dan *Empty state* secara realistis.
4. [cite_start]**Transisi Halaman:** Menggunakan *conditional rendering* / *router* untuk perpindahan antara Formulir dan Tabel[cite: 74, 76].

## ⚙️ How to Run Locally
1. Clone repositori: `git clone [Link Repository GitHub Anda]`
2. Masuk ke folder proyek: `cd [Nama Folder]`
3. Instal dependensi: `npm install`
4. Jalankan server: `npm run dev`
5. Buka `http://localhost:5173` di browser.

## 📁 Folder Structure
- [cite_start]`src/components/`: Komponen UI atomik & *reusable* (Button, InputField, Spinner, EmptyState)[cite: 79].
- `src/features/`: Modul logika bisnis (*admission* dan *patients*) untuk memisahkan *concern*.
- [cite_start]`src/types/`: Definisi `interface` TypeScript (seperti `Patient`)[cite: 62].
- [cite_start]`src/data/`: Data *mocking* statis.

## 🧠 Design Decisions & Trade-offs
- [cite_start]**State Management:** Menggunakan *built-in state* (`useState`, `useEffect`) karena kompleksitas aplikasi masih bisa ditangani tanpa *overhead library* eksternal tambahan[cite: 80].
- [cite_start]**Type Safety:** Menggunakan `interface` eksplisit pada setiap *props* dan *state* untuk menghindari tipe data `any` sesuai dengan instruksi (*strict TypeScript*).
- [cite_start]**Mocking Data:** Data diletakkan di *client-side* tanpa `json-server` tambahan, dan menggunakan fungsi `setTimeout` 500ms untuk mensimulasikan pemanggilan API asinkron.
