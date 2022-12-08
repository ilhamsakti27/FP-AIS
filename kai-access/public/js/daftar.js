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
        console.log(response)
    } catch (error) {
        console.log(error)
    }
})