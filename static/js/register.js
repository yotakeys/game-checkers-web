function submitForm(e) {
    e.preventDefault();
 
    var myform =    document.getElementById("register-form");
  
    var payload = {
        "nama" : myform.querySelector("#nama").value,
        "email" : myform.querySelector("#email").value,
        "password" : myform.querySelector("#password").value,

    }
    console.log(payload);
    fetch("https://ets-pemrograman-web-f.cyclic.app/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Register failed");
            }
            return response.json();
        })
        .then((resp) => {
            alert("Register berhasil");
            console.log("resp from server ", resp);
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert(error)
            console.log("error ", error);
        });
}

var myform = document.getElementById("register-form");

myform.addEventListener("submit", submitForm);