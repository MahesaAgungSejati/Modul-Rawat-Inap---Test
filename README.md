# Frontend Developer Test - PT Data Integrasi Inovasi

## Overview

Repositori ini berisi hasil pengerjaan tes teknikal Frontend Developer

## Tech Stack

* **Framework:** React v19 (Vite)
* **Language:** TypeScript (Strict, no `any`)
* **Styling:** Tailwind CSS
* **State Management:** React Built-in State (`useState`)

## Features Implemented

Sesuai dengan studi kasus yang diberikan:

1. **Formulir Pasien Masuk:** Form input lengkap (Nama, NIK, Diagnosa, Tanggal, Dokter, Ruangan) beserta validasi wajib isi (*required*) dan batas karakter NIK.
2. **Daftar Pasien Aktif:** Tabel data pasien dengan fitur *sorting* (berdasarkan nama/tanggal) dan pencarian (*search* by Nama/NIK).
3. **Simulasi API & UX:** Menggunakan *mock data* dengan jeda waktu (*delay*) 500ms untuk mengimplementasikan *Loading state* dan *Empty state* secara realistis.
4. **Transisi Halaman:** Menggunakan *conditional rendering* / *router* untuk perpindahan antara Formulir dan Tabel.

## How to Run Locally

1. Clone repositori: `git clone`
2. Masuk ke folder proyek: `cd [Nama Folder]`
3. Instal dependensi: `npm install`
4. Jalankan server: `npm run dev`
5. Buka `http://localhost:5173` di browser.

## Folder Structure

* `src/components/`: Komponen UI & *reusable* (Button, InputField, Spinner, EmptyState).
* `src/features/`: Modul logika bisnis (*admission* dan *patients*) untuk memisahkan *concern*.
* `src/types/`: Definisi `interface` TypeScript (seperti `Patient`).
* `src/data/`: Data *mocking* statis.

## Design Decisions

* **State Management:** Menggunakan *built-in state* (`useState`, `useEffect`) karena kompleksitas aplikasi masih bisa ditangani tanpa *overhead library* eksternal tambahan.
* **Type Safety:** Menggunakan `interface` eksplisit pada setiap *props* dan *state* untuk menghindari tipe data `any` sesuai dengan instruksi (*strict TypeScript*).
* **Mocking Data:** Data diletakkan di *client-side* tanpa `json-server` tambahan, dan menggunakan fungsi `setTimeout` 500ms untuk mensimulasikan pemanggilan API asinkron.
