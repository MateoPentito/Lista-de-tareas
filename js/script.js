const seccionTarea = document.getElementById("seccion-tarea");
const inputTarea = document.getElementById("input-tarea");
const botonCargarTarea = document.getElementById("boton-cargarTarea");

let cantidadDeTareas = 0;
let tareas = [];

// Cargar tareas del localStorage
const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));

if (tareasGuardadas) {
    tareas = tareasGuardadas;

    tareas.forEach(texto => {
        crearTarea(texto);
    });
}

// Botón cargar tarea
botonCargarTarea.addEventListener("click", () => {
    agregarTarea();
});

// Enter para agregar tarea
inputTarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        agregarTarea();
    }
});

// Agregar tarea nueva
function agregarTarea() {

    const texto = inputTarea.value.trim();

    if (texto === "") return;

    tareas.push(texto);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    crearTarea(texto);

    inputTarea.value = "";
}

// Crear tarea en el DOM
function crearTarea(texto) {

    cantidadDeTareas++;

    const div = document.createElement("div");
    div.classList.add("mostrar-tarea");

    const titulo = document.createElement("h3");
    titulo.textContent = "Tarea: " + cantidadDeTareas;

    const detalle = document.createElement("p");
    detalle.textContent = texto;
    detalle.classList.add("texto-tarea");

    const botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar 🖊️";
    botonModificar.classList.add("boton-modificar");

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar 🗑️";
    botonEliminar.classList.add("boton-eliminar");

    div.appendChild(titulo);
    div.appendChild(detalle);
    div.appendChild(botonModificar);
    div.appendChild(botonEliminar);

    seccionTarea.appendChild(div);

    // Evento eliminar
    botonEliminar.addEventListener("click", () => {
        const confirmarEliminacion = confirm("Estas seguro que queres eliminar la tarea?");

        if (confirmarEliminacion) {
            div.remove();

            tareas = tareas.filter(t => t !== detalle.textContent);
            localStorage.setItem("tareas", JSON.stringify(tareas));
        }
    });

    // Evento modificar
    botonModificar.addEventListener("click", () => {

        const textoNuevo = prompt("Modificar tarea:", detalle.textContent);

        if (textoNuevo !== null && textoNuevo.trim() !== "") {

            const index = tareas.indexOf(detalle.textContent);
            tareas[index] = textoNuevo;

            detalle.textContent = textoNuevo;

            localStorage.setItem("tareas", JSON.stringify(tareas));
        }

    });

}