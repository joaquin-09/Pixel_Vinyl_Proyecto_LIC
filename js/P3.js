    const conexiones = [
      ["m1", "m2"],
      ["m2", "m3"],
      ["m3", "m4"],
      ["m4", "m5"]
    ];

    function dibujarConexiones() {
      const svg = document.getElementById("svgConexiones");
      const mapa = document.getElementById("mapa");
      const rect = mapa.getBoundingClientRect();
      svg.innerHTML = "";

      conexiones.forEach(([id1, id2]) => {
        const e1 = document.getElementById(id1).getBoundingClientRect();
        const e2 = document.getElementById(id2).getBoundingClientRect();
        const x1 = e1.left + e1.width / 2 - rect.left;
        const y1 = e1.top + e1.height / 2 - rect.top;
        const x2 = e2.left + e2.width / 2 - rect.left;
        const y2 = e2.top + e2.height / 2 - rect.top;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("class", "linea");
        svg.appendChild(line);
      });
    }

    window.onload = () => {
      setTimeout(() => document.body.classList.add("visible"), 200);
      dibujarConexiones();
    };

    window.onresize = dibujarConexiones;

// API Key de GIPHY
const apiKey = "fkbiPjmMFOghh2xsSvXpMt72DjkMaOWH";

// IDs de GIFs para cada mundo
const gifIDs = {
    m1: "wIsgJksMSEQJ6YbZEE", // Mundo 1
    m2: "wIsgJksMSEQJ6YbZEE",  // Mundo 2 
    m3: "wIsgJksMSEQJ6YbZEE",  // Mundo 3 
    m4: "wIsgJksMSEQJ6YbZEE",  // Mundo 4 
    m5: "wIsgJksMSEQJ6YbZEE"   // Mundo 5 
};

// Función para cargar un GIF en un mundo
async function cargarGIFEnMundo(mundoId, gifID) {
    const url = `https://api.giphy.com/v1/gifs/${gifID}?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const gifURL = data.data.images.fixed_height.url;

        const mundo = document.getElementById(mundoId);
        // Reemplazar la imagen dentro del <a>
        const img = mundo.querySelector("img");
        img.src = gifURL;
    } catch (error) {
        console.error(`Error al cargar GIF para ${mundoId}:`, error);
    }
}

// Cargar todos los mundos al iniciar
for (const [mundoId, gifID] of Object.entries(gifIDs)) {
    cargarGIFEnMundo(mundoId, gifID);
}
