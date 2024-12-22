//CARDS DINAMICAS
document.addEventListener("DOMContentLoaded", function() {
    fetch('json/rescatados.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const cardContainer = document.querySelector(".card-container");

            data.rescatados.forEach(rescatado => {
                const card = document.createElement("div");
                card.className = "card";

                const img = document.createElement("img");
                img.src = rescatado.img;
                img.alt = "Foto de " + rescatado.nombre;
                card.appendChild(img);

                const name = document.createElement("h2");
                name.innerHTML = "<strong>Nombre:</strong> " + rescatado.nombre;
                card.appendChild(name);

                const edad = document.createElement("p");
                edad.innerHTML = "<strong>Edad:</strong> " + rescatado.edad;
                card.appendChild(edad);

                const tamaño = document.createElement("p");
                tamaño.innerHTML = "<strong>Tamaño:</strong> " + rescatado.tamaño;
                card.appendChild(tamaño);

                const vacunas = document.createElement("p");
                vacunas.textContent = `${rescatado.vacunas? "Vacunas al día" : "Sin vacunas"}`;
                card.appendChild(vacunas);

                const castracion = document.createElement("p");
                castracion.textContent = `${rescatado.castracion? "Castrado/a" : "Sin castrar"}`;
                card.appendChild(castracion);

                const info = document.createElement("p");
                info.id = `informacion${rescatado.id}`;
                info.className = "informacion";
                info.innerHTML = "<strong>Información:</strong> " + rescatado.info;
                card.appendChild(info);

                const favoriteBtn = document.createElement("button");
                favoriteBtn.className = "favorite-btn";
                favoriteBtn.textContent = "Agregar a Favoritos";
                card.appendChild(favoriteBtn);

                const infoBtn = document.createElement("button");
                infoBtn.className = "info-btn";
                infoBtn.textContent = "Más Información";
                infoBtn.addEventListener("click", function() { 
                const informacion = document.getElementById(`informacion${rescatado.id}`);
                if (informacion.style.display === "none" || informacion.style.display === "") { 
                    informacion.style.display = "block"; 
                    infoBtn.textContent = "Cerrar Información";
                } else { 
                    informacion.style.display = "none"; 
                    infoBtn.textContent = "Más Información";
                } 
                }
            );
                card.appendChild(infoBtn);

                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Ocurrió un problema al realizar Fetch:', error);
        });
});




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


