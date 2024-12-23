//CARDS DINAMICAS
document.addEventListener("DOMContentLoaded", function () {
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
                card.className = "card open-sans-400";

                const img = document.createElement("img");
                img.src = rescatado.img;
                img.alt = "Foto de " + rescatado.nombre;
                card.appendChild(img);

                const nombre = document.createElement("h2");
                nombre.className = "dynapuff-font";
                nombre.innerHTML = rescatado.nombre;
                card.appendChild(nombre);

                const edad = document.createElement("p");
                edad.innerHTML = "<strong>Edad:</strong> " + rescatado.edad;
                card.appendChild(edad);

                const tamaño = document.createElement("p");
                tamaño.innerHTML = "<strong>Tamaño:</strong> " + rescatado.tamaño;
                card.appendChild(tamaño);

                const vacunas = document.createElement("p");
                vacunas.textContent = `${rescatado.vacunas ? "Vacunas al día" : "Sin vacunas"}`;
                card.appendChild(vacunas);

                const castracion = document.createElement("p");
                castracion.textContent = `${rescatado.castracion ? "Castrado/a" : "Sin castrar"}`;
                card.appendChild(castracion);

                const info = document.createElement("p");
                info.id = `informacion${rescatado.id}`;
                info.className = "informacion";
                info.innerHTML = "<strong>Información:</strong> " + rescatado.info;
                card.appendChild(info);

                const favoriteBtn = document.createElement("button");
                favoriteBtn.className = "favorite-btn";


                let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                const enFavoritos = favoritos.some(fav => fav.id === rescatado.id);
                favoriteBtn.textContent = enFavoritos ? "Quitar de Favoritos" : "Agregar a Favoritos";
                if (enFavoritos) {
                    favoriteBtn.classList.add("rojo")
                }
                favoriteBtn.addEventListener("click", function () {
                    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                    const index = favoritos.findIndex(fav => fav.id === rescatado.id);
                    if (index !== -1) {
                        Swal.fire({
                            title: '¿Estás seguro/a?',
                            text: `Vas a quitar a ${rescatado.nombre} de tus favoritos.`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#e39857',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, quitarlo/a',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                favoritos.splice(index, 1);
                                favoriteBtn.textContent = "Agregar a Favoritos";
                                favoriteBtn.classList.remove("rojo");
                                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                                contarFavoritos();
                                favoriteBtn.classList.add("favorite-btn");
                                Swal.fire({
                                    title: '¡Eliminado/a!',
                                    text: `${rescatado.nombre} ha sido eliminado/a de tus favoritos.`,
                                    icon: 'success',
                                    confirmButtonColor: '#a5dc86',
                                    confirmButtonText: 'OK'
                                });
                            }
                        })
                    } else {
                        favoritos.push(rescatado);
                        favoriteBtn.textContent = "Quitar de Favoritos";
                        favoriteBtn.classList.remove("favorite-btn")
                        favoriteBtn.classList.add("rojo")
                        localStorage.setItem('favoritos', JSON.stringify(favoritos));
                        contarFavoritos();
                        Swal.fire({
                            title: '¡Añadido!',
                            text: `Has añadido a ${rescatado.nombre} a tus favoritos.`,
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#a5dc86'
                        });
                    }


                    localStorage.setItem('favoritos', JSON.stringify(favoritos));
                    contarFavoritos();
                });

                card.appendChild(favoriteBtn);

                const infoBtn = document.createElement("button");
                infoBtn.className = "info-btn";
                infoBtn.textContent = "Más Información";

                infoBtn.addEventListener("click", function () {
                    const informacion = document.getElementById(`informacion${rescatado.id}`);
                    informacion.classList.toggle("visible");
                    infoBtn.textContent = informacion.classList.contains("visible") ? "Cerrar Información" : "Más Información";
                });


                card.appendChild(infoBtn);

                cardContainer.appendChild(card);
            });

        })
        .catch(error => {
            console.error('Ocurrió un problema al realizar Fetch:', error);
        });

    contarFavoritos()
    clima()

});

function contarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const cantFavoritos = document.getElementById('cantFavoritos');
    cantFavoritos.textContent = favoritos.length;
}


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


//REDIRECCION
document.querySelector(".fa-dog").addEventListener("click", function () {
    window.location.href = "./favoritos.html";
});

document.querySelector(".nombre").addEventListener("click", function () {
    window.location.href = "./index.html";
});


