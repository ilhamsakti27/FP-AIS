const url = "http://localhost:3000/login"

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
   if (json.status == 200) {
       swal("Login Successfully !", `Status ${json.status}`, "success")
       .then(function(){
           window.location.reload()
       })
   } else {
       swal(json.message,`Status ${json.status}`,"warning")
   }
    } catch (error) {
        console.log(error)
    }

})