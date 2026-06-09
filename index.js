import { renderPiano, highlightScale } from "./piano.js";

// Carga las escalas desde el JSON y arranca la app
fetch("./scales.json")
    .then((response) => response.json())
    .then((scales) => {

        // Dibuja el teclado en el contenedor
        renderPiano("piano-container");

        // Puebla el selector con una opción por cada escala del JSON
        const scaleSelector = document.getElementById("scale-selector");
        Object.keys(scales).forEach((scale) => {
            const option = document.createElement("option");
            option.value = scale;
            option.textContent = scale.replace(/_/g, " ");
            scaleSelector.appendChild(option);
        });

        // Al cambiar la selección, resalta las teclas correspondientes y muestra las notas
        scaleSelector.addEventListener("change", (event) => {
            const selectedScale = event.target.value;
            const selectedNotesDiv = document.getElementById("selected-notes");

            if (selectedScale) {
                const notes = scales[selectedScale];
                highlightScale(notes, "piano-container");
                selectedNotesDiv.textContent = `Notes: ${notes.join(", ")}`;
            } else {
                // Si se vuelve a "Select a scale", limpia el texto y quita los highlights
                selectedNotesDiv.textContent = "";
                highlightScale([], "piano-container");
            }
        });
    });