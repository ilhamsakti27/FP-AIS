const form = document.querySelector("#ini_form")
const url = "http://localhost:3000/api/register"

form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const myFormData = new FormData(e.target);
    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);
    const data = JSON.stringify(formDataObj)

    try {
        const response = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json()
        console.log(json)
        if (json.status == 200) {
            swal("Register Successfully !", `Status ${json.status}`, "success")
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