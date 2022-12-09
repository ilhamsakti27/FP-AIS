const queryString = window.location.search;
console.log(queryString);   
const urlParams = new URLSearchParams(queryString);

// Data pemesan
const pemesan_nohp = urlParams.get('pemesan_nohp');
const pemesan_alamat = urlParams.get('pemesan_alamat');
const pemesan_nama = urlParams.get('pemesan_nama');
const pemesan_notandapengenal = urlParams.get('pemesan_notandapengenal');
const pemesan_email = urlParams.get('pemesan_email');
const data_pemesan = {
    "no_id" : pemesan_notandapengenal,
    "no_hp" : pemesan_nohp,
    "nama" : pemesan_nama,
    "alamat" : pemesan_alamat,
    "email" : pemesan_email,
}

// Data penumpang
const penumpang_notandapengenal = urlParams.get('penumpang_notandapengenal');
const penumpang_nohp = urlParams.get('penumpang_nohp');
const penumpang_nama = urlParams.get('penumpang_nama');
const data_penumpang = {
    "no_id" : penumpang_notandapengenal,
    "no_hp" : penumpang_nohp,
    "nama" : penumpang_nama,
}
console.log(data_penumpang)
document.querySelector(".namapenumpang").innerHTML = data_penumpang.nama
document.querySelector(".train").innerHTML = data_penumpang.nama


const keretaData = JSON.parse(localStorage.getItem("kereta"))
console.log(keretaData)   

var tanggallengkap = new String();
    var namahari = ("Minggu Senin Selasa Rabu Kamis Jumat Sabtu");
    namahari = namahari.split(" ");
    var namabulan = ("Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember");
    namabulan = namabulan.split(" ");
    var tgl = new Date();
    var hari = tgl.getDay();
    var tanggal = tgl.getDate();
    var bulan = tgl.getMonth();
    var tahun = tgl.getFullYear();
   let today = namahari[hari] + ", " +tanggal + " " + namabulan[bulan] + " " + tahun;

document.querySelector(".tanggal-inv").innerHTML = today
document.querySelector(".dewasa").innerHTML = keretaData.dewasa
document.querySelector(".asal").innerHTML = keretaData.origination
document.querySelector(".tujuan").innerHTML = keretaData.destination
document.querySelector(".timestart").innerHTML = keretaData.timestart
document.querySelector(".timeend").innerHTML = keretaData.timeend
document.querySelector(".total").innerHTML = `Total Rp ${keretaData.harga}`
let harga = document.querySelectorAll(".harga")
harga.forEach(el => {
    el.innerHTML = `Rp ${keretaData.harga}`
});
let tanggalkereta = document.querySelectorAll(".tgl")
tanggalkereta.forEach(el => {
    el.innerHTML = `${keretaData.tanggal}`
});
