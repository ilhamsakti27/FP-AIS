const name = document.getElementById("name");
const email = document.getElementById("email");
const noTelp = document.getElementById("noTelp");
const NoIdentitas = document.getElementById("NoIdentitas");
const TipeIdentitas = document.getElementById("TipeIdentitas");
const TglLahir = document.getElementById("TglLahir");
const jenisKelamin = document.getElementById("jenisKelamin");
const password = document.getElementById("password");
const konfirmasiPassword = document.getElementById("konfirmasiPassword");

const buttonSubmit = document.getElementById("submit");
const resultEl = document.getElementById("result");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

const removeClass = (el) => {
    el.classList.value = "";
}

//const KAIRegister
//const JeniusRegister

buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
  
    var raw = JSON.stringify({
        name: name.value,
        email: email.value,
        noTelp: noTelp.value,
        NoIdentitas: NoIdentitas.value,
        TipeIdentitas: TipeIdentitas.value,
        TglLahir: TglLahir.value,
        jenisKelamin: jenisKelamin.value,
        password: password.value,
        konfirmasiPassword: konfirmasiPassword.value
    });
  
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(KAIRegistUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        // setup remove class result content
        removeClass(resultContent);

        if (result.message === "User created") {
            // setup new body for other requests
            requestOptions.body = JSON.stringify({
                name: nama.value,
                email: email.value,
                pass: password.value,
            });
        } else {
            resultContent.classList.add("alert");
            resultContent.classList.add("alert-danger");
            resultContent.innerText = "Failed to create an account for KAI";
        }
    
          resultEl.append(resultContent);
    
          document.body.scrollTop = 0; // safari
          document.documentElement.scrollTop = 0; // chrome
        })
        .catch((error) => {
          console.log("error", error);
          alert("Error KAI server");
        });
    });
