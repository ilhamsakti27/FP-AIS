const username = document.getElementById("username");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

const removeClass = (el) => {
  el.classList.value = "";
};

//const KAIRegister
//const JeniusRegister

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    var raw = JSON.stringify({
        username: username.value,
        password: password.value,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(KAILoginUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            removeClass(resultContent);

            if (result.message === "Auth failed") {
                resultContent.classList.add("alert");
                resultContent.classList.add("alert-danger");
                resultContent.innerText = result.message;
            } else if (result.message === "Auth success") {
            localStorage.setItem("eclogin", JSON.stringify({ jwt: result.token }));

            // setup new body for other requests
            requestOptions.body = JSON.stringify({
                username: username.value,
                pass: password.value,
            });
        }

        resultEl.append(resultContent);
        })
        .catch((error) => {
            console.log("error", error);
            alert("Login Error");
        });
});