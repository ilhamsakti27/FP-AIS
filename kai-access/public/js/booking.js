	const queryString = window.location.search;
		console.log(queryString);
		const urlParams = new URLSearchParams(queryString);
		const origination = urlParams.get('origination');
		const destination = urlParams.get('destination');
		const tanggal = urlParams.get('tanggal');
		const adult = urlParams.get('adult');
		const infant = urlParams.get('infant');
		console.log(`Data : ${origination}, ${destination}, ${tanggal}, ${adult}, ${infant}`);

document.querySelector("#origination").value = origination
document.querySelectorAll(".asal").value = origination
document.querySelector("#destination").value = destination
document.querySelector("#departure_dateh").value = tanggal
document.querySelector("#dewasa").value = adult
document.querySelector(".org-dewasa").innerHTML = `${adult} dewasa`
document.querySelector("#infant").value = infant


var myHeaders = new Headers();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://booking.kai.id/api/stations2", requestOptions)
  .then(response => response.json())
  .then(result => {
	result.forEach(element => {
		if(element.code == origination){
			document.querySelector(".stasiun-asal").innerHTML = element.name
		}
		if(element.code == destination){
			document.querySelector(".stasiun-tujuan").innerHTML = element.name
		}
	});
  }).then(()=>{
		if(origination == destination) return alert("stasiun tidak boleh sama !")
		fetch("http://localhost:5000/Kereta_API", requestOptions)
		.then(response => response.json())
		.then(result => {
			if(result){
				result.forEach(el => {
					if(el.kereta.rute.tujuan == destination ) {
						console.log("kereta : ",el.kereta.nama_kai)
						console.log("jadwal kereta : ",el.kereta.jadwal[origination])
						renderKereta(destination,origination,el.kereta.nama_kai,el.kereta.jadwal[origination],el.kereta.jadwal[destination],tanggal)
					} 
					if(el.kereta.rute.asal == origination ) {
						console.log("asal: ",origination)
						console.log("kereta : ",el.kereta.nama_kai)
						console.log("jadwal kereta : ",el.kereta.jadwal[destination])
						renderKereta(origination,destination,el.kereta.nama_kai,el.kereta.jadwal[origination],el.kereta.jadwal[destination],tanggal)
					} 
				});
			}
		}) 
	}
  )
.catch(error => console.log('error', error));


  function renderKereta(asal,tujuan,kereta,datang,tiba,tanggal) {
	fetch("https://booking.kai.id/api/stations2", requestOptions)
	.then(response => response.json())
	.then(result => {
		let kodeasal = ""
		let kodetujuan = ""
		result.forEach(element => {
			 kodeasal = asal
			 kodetujuan = tujuan
			if(element.code == tujuan) tujuan = element.name
			if(element.code == asal) asal = element.name
		});
		let pukul_datang = tiba.split(".")
		let datang_jam  = pukul_datang[0]*60
		let datang_menit = pukul_datang[1]

		let pukul_berangkat = datang.split(".")
		let berangkat_jam  = pukul_berangkat[0]*60
		let berangkat_menit = pukul_berangkat[1]
		console.log(`${berangkat_jam} + ${berangkat_menit} = ${+berangkat_jam + +berangkat_menit}`)

		let durasi = (+datang_jam + +datang_menit) - (+berangkat_jam + +berangkat_menit)
		let durasi_jam = Math.floor(durasi/60)
		let durasi_menit = durasi%60
		durasi = `${durasi_jam} jam ${durasi_menit} mnt`
		document.querySelector(".keretajadwal").innerHTML +=`<div class="data-wrapper">
			<div class="data-block list-kereta" data-hide="0" data-class="Eksekutif" data-stasiun="surabaya gubeng" data-kereta="bima" data-time="Siang - Sore" data-harga="">
				<form method="GET" action="/passenger" accept-charset="UTF-8" id="data2"><input name="_token" type="hidden" value="ZvE1kz9J2hPP0D3bpQ9DrPPcT9e6Z8nyXseEUUnc">
					<a href="javascript:;" class="card-schedule" onclick="document.getElementById('data2').submit();return false;">
						<div class="row">
							<div class="col-md-3 col-sm-3 col-xs-12">
								<div class="col-one">
									<div class="name">${kereta}<span> (75)</span></div>
									<div class="{kelas kereta}">Ekonomi (C)</div>
								</div>
							</div>
						<div class="col-md-6 col-sm-4 col-xs-12">
							<div class="col-two">
								<div class="row">
									<div class="col-md-4 col-sm-4 col-xs-4">
										<div class="station station-start">${asal}</div>
										<div class="times time-start">${datang}</div>
										<div class="station date-start">${tanggal}</div>
									</div>
									<div class="col-md-3 col-sm-4 col-xs-2">
										<div class="arrow"><i class="fas fa-arrow-circle-right"></i></div>
										<div class="long-time">11j 10m</div>
									</div>
									<div class="col-md-5 col-sm-4 col-xs-4 card-arrival">
										<div class="station station-end">${tujuan}</div>
										<div class="times time-end">${tiba}</div>
										<div class="station station-end">${tanggal}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-sm-5 col-price col-xs-12 padding-right-5 center">
							<div class="col-four">
								<div class="price">Rp 650.000,-</div>
									<div class="order-wrapper force-center">
										<div class="order-block btn">Pesan</div>
									</div>
																											<small class="form-text sisa-kursi">Tersedia</small>
																									
								</div>
							</div>
						</div>
					</a>
					<input name="asal" type="hidden" value="${asal}">
					<input name="tujuan" type="hidden" value="${tujuan}">
					<input name="kodeasal" type="hidden" value="${kodeasal}" class="asal">
					<input name="kodetujuan" type="hidden" value="${kodetujuan}">
					<input name="timestart" type="hidden" value="${datang}">
					<input name="timeend" type="hidden" value="${tiba}">
					<input name="nokereta" type="hidden" value="75">
					<input name="kereta" type="hidden" value="${kereta}">
					<input name="kelas" type="hidden" value="C">
					<input name="kelas_gerbong" type="hidden" value="EKO">
					<input name="subkelas" type="hidden" value="AA">
					<input name="dewasa" type="hidden" value="${adult}">
					<input name="infant" type="hidden" value="${infant}">
					<input name="harga" type="hidden" value="650000">
					<input name="tanggal" type="hidden" value="${tanggal}">
				</form>
			</div>
		</div>`
		document.querySelector(".long-time").innerHTML = durasi
	})

	.catch(error => console.log('error', error));

	
  }


