# FP-AIS
Repositori ini berisi dokumentasi pengerjaan Final Project Mata Kuliah Arsitektur dan Integrasi Sistem. Final project yang kita usung adalah KAI Access & Jenius.

---

### Anggota Kelompok 3

Nama | NRP
--- | ---
Hafif Rasya Fauzi | 5027201002
Fairuz Azka Maulana | 5027201017
Ilham Muhammad Sakti | 5027201042
<br>

### Anggota Kelompok 8

Nama | NRP
--- | ---
Bagus Ridho Rosfandy | 5027201043
Muhammad Rifqi Fernanda | 5027201050
Satrio Kamil Widhiwoso | 5027201051

<br>

# Dokumentasi KAI

## Daftar isi : 
- [Registrasi Akun](#registrasi-akun)
- [Login Akun](#login-akun)
- [Pemesanan Tiket](#pemesanantiket)
- [Pembayaran Tiket](#pembayaran-tiket-kai)

## Registrasi akun 

Endpoint : `POST {{KAI}}` 
<br>
Body Request : name, email, noTelp, NoIdentitas, TipeIdentitas, TglLahir, jenisKelamin, password, konfirmasiPassword
<br>
Authorization : -

Contoh payload: 
```json
{
    "name" : "Fairuz Azka",
    "email" : "fairuzazkamaulana@gmail.com",
    "noTelp" : "085869696969",
    "NoIdentitas" : "314123456789012",
    "TipeIdentitas" : "KTP",
    "TglLahir" : "26/06/2002",
    "jenisKelamin" : "Laki-Laki",
    "password" : "Testimoni12345",
    "konfirmasiPassword" : "Testimoni12345"
}
```

Respon :
```json
{
    "message" : "Register Successfull",
    "status" : "200"
}
```

## Login akun

Endpoint : `POST {{KAI}}`
<br>
Body Request : email, password
<br>
Authorization : -

Contoh payload :
```json
{
    "email" : "fairuzazkamaulana@gmail.com",
    "password" : "Testimoni12345"
}
```
Respon : 
```json 
{
    "message" : "Login Successfull",
    "status" : "200"
}
```

## PemesananTiket

Endpoint : `POST {{KAI}}`
<br>
Body Request : "Title, name, TipeIdentitas, NoIdentitas, noTelp, email, Alamat,"
<br>
Authorization : -

Contoh payload:
```json 
{
    "Title" : "Tuan"
    "name" : "fairuzazkamaulana"
    "TipeIdentitas" : "KTP"
    "NoIdentitas" : "314123456789012"
    "noTelp" : "085869696969"
    "email" : "fairuzazkamaulana@gmail.com"
    "Alamat" : "Jakarta"
}
```

Respon: 
```json
{
    "message" : "Ticket Order Successfull"
}
```

## Pembayaran Tiket KAI

Endpoint : `POST {{KAI}}`
<br>
Body Request : "KodePemesanan, KodePembayaran"
<br>
Authorization : -

Contoh payload : 
```json
{
    "KodePemesanan" : "X9XX9X9",
    "KodePembayaran" : "1234567890123"
}
```

Respon :
```json
{
    "message" : "Kode Pembayaran Telah Dikirimkan"
}
```

# Dokumentasi Jenius

## Daftar isi : 
- [Registrasi Akun](#registrasi-akun-jenius)
- [Login Akun](#login-akun-jenius)

## Registrasi Akun Jenius

Endpoint : `POST {{../api/auth/signup}}`
<br>
Body Request : "no_hp, username, nik, pin, email, password, roles"
<br>
Authorization : -

Contoh payload : 
```json
{
    "no_hp": "08123456789",
    "username": "test",
    "nik": "317453267430001",
    "pin": "123456",
    "email": "test@gmail.com",
    "password": "test123",
    "roles": ["user"]
}
```

## Login Akun Jenius

Endpoint : `POST {{../api/auth/signin}}`
<br>
Body Request : "no_hp, password"
<br>
Authorization : -

Contoh payload : 
```json
{
    "no_hp": "08123456789",
    "password": "test123"
}
```