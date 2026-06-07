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
      highlightScale(scales[selectedScale], "piano-container");
    });
  });