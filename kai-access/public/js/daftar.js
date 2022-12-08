const form = document.querySelector("#ini_form")
const url = "http://localhost:3000/api/register"

form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const myFormData = new FormData(e.target);
    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formDataObj,
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        console.log(error)
    }

})