// piano.js
export function renderPiano(containerId) {
  const container = document.getElementById(containerId);
  const keys = [
    { note: "C", type: "white" },
    { note: "C#", type: "black" },
    { note: "D", type: "white" },
    { note: "D#", type: "black" },
    { note: "E", type: "white" },
    { note: "F", type: "white" },
    { note: "F#", type: "black" },
    { note: "G", type: "white" },
    { note: "G#", type: "black" },
    { note: "A", type: "white" },
    { note: "A#", type: "black" },
    { note: "B", type: "white" }
  ];

  // Render keys
  keys.forEach((key) => {
    const keyElement = document.createElement("div");
    keyElement.className = `key ${key.type}`;
    keyElement.dataset.note = key.note;
    container.appendChild(keyElement);
  });
}

export function highlightScale(scale, containerId) {
  const container = document.getElementById(containerId);
  const keys = container.querySelectorAll(".key");

  keys.forEach((key) => {
    if (scale.includes(key.dataset.note)) {
      key.classList.add("highlight");
    } else {
      key.classList.remove("highlight");
    }
  });
}