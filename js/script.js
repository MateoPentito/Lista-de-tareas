const seccionTarea = document.getElementById("seccion-tarea");
const inputTarea = document.getElementById("input-tarea");
const botonCargarTarea = document.getElementById("boton-cargarTarea");
let cantidadDeTareas = 0;
let tareas = [];

//Carga las tareas del localStorage
const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
if (tareasGuardadas) {
    tareas = tareasGuardadas;
    tareas.forEach(tarea => {
        crearTareasDesdeStorage(tarea);
    });

}

function crearTareasDesdeStorage(texto) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar 🖊️";
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar 🗑️";
    eliminarTarea(div, botonEliminar);
    modificarTarea(p, botonModificar);
    p.textContent = texto;
    div.appendChild(p);
    div.appendChild(botonModificar);
    div.appendChild(botonEliminar);
    seccionTarea.appendChild(div);
    inputTarea.value = "";
}

botonCargarTarea.addEventListener("click", () => {
    agregarTarea();
    inputTarea.value = "";
})

function agregarTarea() {
    cantidadDeTareas++;
    const crearDiv = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = "Tarea: " + cantidadDeTareas;
    const detalle = document.createElement("p");
    detalle.textContent = inputTarea.value;
    const botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar 🖊️";
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar 🗑️";

    seccionTarea.appendChild(crearDiv);
    crearDiv.appendChild(titulo)
    crearDiv.appendChild(detalle);
    crearDiv.appendChild(botonModificar);
    crearDiv.appendChild(botonEliminar);

    tareas.push(inputTarea.value);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    eliminarTarea(crearDiv, botonEliminar);
    modificarTarea(crearDiv, botonModificar);


    botonModificar.addEventListener("click", () => {
        const textoNuevo = prompt("Modificar tarea: ", detalle.textContent);

        if (textoNuevo !== null) {
            detalle.textContent = textoNuevo;
        }
    })

}

function eliminarTarea(div, botonEliminar) {
    botonEliminar.addEventListener("click", () => {
        div.remove();
    })
}

function modificarTarea(div, botonModificar) {
    botonModificar.addEventListener("click", () => {
        const textoNuevo = prompt("Modificar tarea: ", detalle.textContent)
        if (textoNuevo !== null) {
            detalle.textContent = textoNuevo;
        }
    })
}


inputTarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        agregarTarea();
    }
})

