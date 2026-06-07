import { renderPiano, highlightScale } from "./piano.js";

fetch("./scales.json")
  .then((response) => response.json())
  .then((scales) => {
    renderPiano("piano-container");

    const scaleSelector = document.getElementById("scale-selector");
    Object.keys(scales).forEach((scale) => {
      const option = document.createElement("option");
      option.value = scale;
      option.textContent = scale;
      scaleSelector.appendChild(option);
    });

    scaleSelector.addEventListener("change", (event) => {
      const selectedScale = event.target.value;
      const selectedNotesDiv = document.getElementById("selected-notes");

      if (selectedScale) {
        const notes = scales[selectedScale];
        highlightScale(notes, "piano-container");
        selectedNotesDiv.textContent = `Notes: ${notes.join(", ")}`;
      } else {
        selectedNotesDiv.textContent = "";
      }
    });
  });