const queryString = window.location.search;
		console.log(queryString);
		const urlParams = new URLSearchParams(queryString);
		const origination = urlParams.get('asal');
		const destination = urlParams.get('tujuan');
		const tanggal = urlParams.get('tanggal');
		const dewasa = urlParams.get('dewasa');
		const infant = urlParams.get('infant');
        const kereta = urlParams.get('kereta')
        const kelas = urlParams.get('kelas')
        const kelas_gerbong = urlParams.get('kelas_gerbong')
        const timestart = urlParams.get('timestart')
        const timeend = urlParams.get('timeend')
        const harga = urlParams.get('harga')

		console.log(`Data : ${origination}, ${destination}, ${tanggal}, ${dewasa}, ${infant}`);


document.querySelector(".departure_date").innerHTML = tanggal
document.querySelector(".train").innerHTML = kereta
document.querySelector(".keretakelas").innerHTML = `${kelas_gerbong} - ${kelas}`
let city = document.querySelectorAll(".city")
let time = document.querySelectorAll(".time")
city[0].innerHTML = origination
city[1].innerHTML = destination
time[0].innerHTML = timestart
time[1].innerHTML = timeend
document.querySelector(".depart").innerHTML = tanggal
document.querySelector(".arrival").innerHTML = tanggal
document.querySelector(".harga").innerHTML = `Total Rp ${harga}`