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
// document.querySelector(".stasiun-asal").value = origination
document.querySelector("#destination").value = destination
document.querySelector("#departure_dateh").value = tanggal
document.querySelector("#dewasa").value = adult
document.querySelector(".org-dewasa").innerHTML = `${adult} dewasa`
document.querySelector("#infant").value = infant


var myHeaders = new Headers();
myHeaders.append("Cookie", "TS0100e4aa=015e85d922a66611d8aead13855e8570f84c3c944718851455ab02442c661b9f2a141e4eee46e99e2a8161aa8b7a660402d2cac5c1");


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
			console.log(element.name)
			document.querySelector(".stasiun-asal").innerHTML = element.name
		}
		if(element.code == destination){
			console.log(element.name)
			document.querySelector(".stasiun-tujuan").innerHTML = element.name
		}
	});
  })
  .catch(error => console.log('error', error));

// fetch(`https://booking.kai.id/api/stations2`, options)
// .then(response => response.json())
// .then(response => {
// 	let dataRes = response.response
// 	console.log(dataRes)
// })
// .catch(err => {
// 	console.error(err)
// });