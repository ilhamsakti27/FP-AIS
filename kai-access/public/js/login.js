const url = "http://localhost:3000/api/login"

form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const myFormData = new FormData(e.target);
    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);
    const dataRegis = JSON.stringify(formDataObj)

    try {
        const response = await fetch(url, {
            method: "POST",
            body: dataRegis,
            headers: {
                "Content-Type": "application/json",
            }
        })
   const json = await response.json()
   console.log(json)
   
   
   // Decode Token
   var base64Url = json.token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
   jsonPayload = JSON.parse(jsonPayload);
   console.log(jsonPayload.id)
   localStorage.setItem("uname",jsonPayload.id
   )
   if (json.status == 200) {
       swal("Login Successfully !", `Status ${json.status}`, "success")
       .then(function(){
           window.location.href=`http://localhost:3000`
       })
   } else {
       swal(json.message,`Status ${json.status}`,"warning")
   }
    } catch (error) {
        console.log(error)
    }

})