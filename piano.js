// piano.js

// Todas las notas de una octava en orden, con su tipo de tecla
const KEYS = [
  { note: "C",  type: "white" },
  { note: "C#", type: "black" },
  { note: "D",  type: "white" },
  { note: "D#", type: "black" },
  { note: "E",  type: "white" },
  { note: "F",  type: "white" },
  { note: "F#", type: "black" },
  { note: "G",  type: "white" },
  { note: "G#", type: "black" },
  { note: "A",  type: "white" },
  { note: "A#", type: "black" },
  { note: "B",  type: "white" },
];

// Genera los elementos del piano y los inserta en el contenedor. Usa un DocumentFragment para hacer un único insert al DOM y evitar reflows por cada tecla.
export function renderPiano(containerId) {
  const container = document.getElementById(containerId);
  const fragment = document.createDocumentFragment();

  // Itera sobre cada octava y crea un div por tecla con su nota como data attribute
  for (let octave = 1; octave <= 2; octave++) {
    KEYS.forEach(({ note, type }) => {
      const key = document.createElement("div");
      key.className = `key ${type}`;
      key.dataset.note = `${note}${octave}`;
      fragment.appendChild(key);
    });
  }

  container.appendChild(fragment);
}

// Resalta las teclas que pertenecen a la escala recibida. Limpia el highlight anterior en cada llamada.
export function highlightScale(scale, containerId) {

  // Mapeo de notas enarmónicas a su equivalente en sostenidos, para normalizar escalas que usen bemoles (ej: Bb → A#)
  const enharmonicMap = {
    "E#": "F",  "B#": "C",  "Fb": "E",  "Cb": "B",
    "Bb": "A#", "Eb": "D#", "Ab": "G#", "Db": "C#", "Gb": "F#"
  };

  // Convierte todas las notas de la escala a su forma canónica
  const normalizedScale = scale.map(note => enharmonicMap[note] || note);
  const container = document.getElementById(containerId);

  // Por cada tecla, activa o desactiva la clase highlight según si su nota está en la escala. El replace quita el número de octava (ej: "C1" → "C") antes de comparar.
  container.querySelectorAll(".key").forEach((key) => {
    const noteWithoutOctave = key.dataset.note.replace(/\d+$/, "");
    key.classList.toggle("highlight", normalizedScale.includes(noteWithoutOctave));
  });
}