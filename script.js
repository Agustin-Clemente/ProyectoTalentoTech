// VALIDACIONES FORM

let nombre = document.getElementById("nombre");
let nombreError = document.getElementById("nombreError");
let email = document.getElementById("email"); 
let emailError = document.getElementById("emailError"); 
let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
let mensaje = document.getElementById("mensaje"); 
let mensajeError = document.getElementById("mensajeError"); 

function validarNombre() {
    if (nombre.value.length < 3 || /\d/.test(nombre.value)) {
        nombreError.textContent = "El nombre debe tener al menos 3 caracteres y no incluir números.";
        nombre.style.border = "3px solid red";
    } else {
        nombreError.textContent = "";
        nombre.style.border = "3px solid green";
    }
}



function validarEmail() { 
    if (!emailRegExp.test(email.value)) { 
        emailError.textContent = "Por favor, ingresa un correo electrónico válido."; 
        email.style.border = "3px solid red";
    } else { 
        emailError.textContent = ""; 
        email.style.border = "3px solid green";
    } 
}

function validarMensaje() { 
    if (mensaje.value.length < 3) { 
        mensajeError.textContent = "El mensaje debe tener al menos 3 caracteres."; 
        mensaje.style.border = "3px solid red";
    } else { 
        mensajeError.textContent = ""; 
        mensaje.style.border = "3px solid green"; 
    } 
}

nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
mensaje.addEventListener("input", validarMensaje);


// API CLIMA
let spanCiudad = document.querySelector("#ciudad")
let spanTemp = document.querySelector("#temperatura")
let imagen = document.querySelector("#wicon")
let descripcion = document.querySelector("#descripcion")

/* function clima() {

    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es", function (data) {

        console.log(data)
        spanCiudad.textContent = data.name
        spanTemp.textContent = data.main.temp.toFixed(1)
        spanTemp.innerHTML += "<sup>°C</sup>"
        imagen.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
        descripcion.textContent = data.weather[0].description
    })

} 
    // clima()

    */
//CON FETCH
function clima() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=es")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("ciudad").textContent = data.name;
            document.getElementById("temperatura").textContent = data.main.temp.toFixed(1);
            document.getElementById("grados").innerHTML = "<sup>°C</sup>";
            document.getElementById("wicon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            document.getElementById("descripcion").textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Ocurrió un problema en el método fetch:', error);
        });
}

window.onload = clima;


