document.addEventListener("DOMContentLoaded", function () {
    // Función para mostrar los favoritos del localStorage
    function mostrarFavoritos() {
        const favoritosContainer = document.querySelector(".favoritos-container");
        favoritosContainer.innerHTML = "";

        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (favoritos.length === 0) {
            const sinFavoritosContainer = document.createElement("div");
            const sinFavoritos = document.createElement("p");
            sinFavoritos.className = "sinFavoritos dynapuff-font";
            sinFavoritos.textContent = "Agrega favoritos y comenzá a ayudar a nuestros/as rescatados/as.";
            const imgSinFavs = document.createElement("img");
            imgSinFavs.src = "./img/perroTriste.jpg";
            imgSinFavs.alt = "Foto de perro triste";
            imgSinFavs.className = "img-sin-favoritos";

            sinFavoritosContainer.appendChild(sinFavoritos);
            sinFavoritosContainer.appendChild(imgSinFavs);
            favoritosContainer.appendChild(sinFavoritosContainer);
        } else {
        favoritos.forEach(rescatado => {
            const card = document.createElement("div");
            card.className = "card open-sans-400";

            const img = document.createElement("img");
            img.src = rescatado.img;
            img.alt = "Foto de " + rescatado.nombre;
            card.appendChild(img);

            const name = document.createElement("h2");
            name.className = "dynapuff-font";
            name.innerHTML = rescatado.nombre;
            card.appendChild(name);

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
            info.className = "informacion visible";
            info.innerHTML = "<strong>Información:</strong> " + rescatado.info;
            card.appendChild(info);

            const favoriteBtn = document.createElement("button");
            favoriteBtn.className = "favorite-btn rojo";
            favoriteBtn.textContent = "Quitar de Favoritos";
            favoriteBtn.style.color = "red";
            favoriteBtn.addEventListener("click", function () {
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
                        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                        const index = favoritos.findIndex(fav => fav.id === rescatado.id);
                        if (index !== -1) {
                            favoritos.splice(index, 1);
                            localStorage.setItem('favoritos', JSON.stringify(favoritos));
                            mostrarFavoritos(); // Actualizar la lista de favoritos
                            contarFavoritos(); // Actualizar el contador de favoritos
                            Swal.fire({
                                title: '¡Eliminado/a!',
                                text: `${rescatado.nombre} ha sido eliminado/a de tus favoritos.`,
                                icon: 'success',
                                confirmButtonColor: '#a5dc86',
                                confirmButtonText: 'OK'
                            });
                        }
                    }
                });
            })
            /* const infoBtn = document.createElement("button");
            infoBtn.className = "info-btn";
            infoBtn.textContent = "Más Información"; */

            /* infoBtn.addEventListener("click", function () {
                const informacion = document.getElementById(`informacion${rescatado.id}`);
                informacion.classList.toggle("visible");
                infoBtn.textContent = informacion.classList.contains("visible") ? "Cerrar Información" : "Más Información";
            }); */



            const valoresDonacion = [1000, 2000, 5000, 10000];
            let indiceActual = 0;
            
            const apadrinarText = document.createElement("p");
            apadrinarText.className = "apadrinar-text";
            apadrinarText.textContent = "Apadrinar con";


            const donacionContainer = document.createElement("div");
            donacionContainer.className = "donacion-container";
            const decrementBtn = document.createElement("button");
            decrementBtn.className = "decrement-btn";
            decrementBtn.textContent = "-";


            const valorDisplay = document.createElement("span");
            valorDisplay.className = "donacion-valor";
            valorDisplay.textContent = rescatado.donacion ? `$${rescatado.donacion}` : `$${valoresDonacion[indiceActual]}`;



            const incrementBtn = document.createElement("button");
            incrementBtn.className = "increment-btn";
            incrementBtn.textContent = "+";

            const aceptarBtn = document.createElement("button");
            aceptarBtn.className = "aceptar-btn dynapuff-font-400";
            aceptarBtn.textContent = "Aceptar";



            const mensualText = document.createElement("p");
            mensualText.className = "mensual";
            mensualText.textContent = "Mensuales";

            donacionContainer.appendChild(apadrinarText)
            donacionContainer.appendChild(decrementBtn);
            donacionContainer.appendChild(valorDisplay);
            donacionContainer.appendChild(incrementBtn);
            donacionContainer.appendChild(mensualText);
            donacionContainer.appendChild(aceptarBtn);


            
            

            const buscarIndice = (valor) => { 
                return valoresDonacion.findIndex(donacion => donacion === valor); 
            };

            if (rescatado.donacion) { 
                apadrinarText.textContent = "Modificar donación";
                indiceActual = buscarIndice(rescatado.donacion); 
            }


            const updateValorDisplay = () => {
                valorDisplay.textContent = `$${valoresDonacion[indiceActual]}`;
            };

            updateValorDisplay(); 

            decrementBtn.addEventListener('click', () => {
                if (indiceActual > 0) {
                    indiceActual--;
                    updateValorDisplay();
                }
            });

            incrementBtn.addEventListener('click', () => {
                if (indiceActual < valoresDonacion.length - 1) {
                    indiceActual++;
                    updateValorDisplay();
                }
            });

            // updateValorDisplay();

            aceptarBtn.addEventListener('click', () => { 
                apadrinarText.textContent = "Modificar donación";
                const donacion = valoresDonacion[indiceActual]; 
                let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []; 
                const index = favoritos.findIndex(fav => fav.id === rescatado.id); 
                if (index !== -1) { 
                    favoritos[index].donacion = donacion; 
                    localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
                    Swal.fire({ 
                        title: '¡Donación guardada!', 
                        text: `Has guardado una donación de $${donacion} mensuales para ${rescatado.nombre}.`, 
                        icon: 'success', 
                        confirmButtonColor: '#a5dc86',
                        confirmButtonText: 'OK' 
                    }); 
                }
                updateValorDisplay();
            })

            // card.appendChild(infoBtn);
            // card.appendChild(apadrinarText); 
            card.appendChild(donacionContainer);
            // card.appendChild(mensualText);
            card.appendChild(favoriteBtn);


            favoritosContainer.appendChild(card);

            



        })};
    }

    
    mostrarFavoritos();
    contarFavoritos(); 
});

function contarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const cantFavoritos = document.getElementById('cantFavoritos');
    cantFavoritos.textContent = favoritos.length;
}

//REDIRECCION
document.querySelector(".fa-dog").addEventListener("click", function () {
    window.location.href = "./favoritos.html";
});

document.querySelector(".nombre").addEventListener("click", function () {
    window.location.href = "./index.html";
});