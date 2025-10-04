const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let posiciones = [0,0,0,0];

  function cambiarLetra(indice, direccion) {
    posiciones[indice] += direccion;
    if (posiciones[indice] < 0) posiciones[indice] = abecedario.length - 1;
    if (posiciones[indice] >= abecedario.length) posiciones[indice] = 0;
    document.getElementById("letra"+indice).textContent = abecedario[posiciones[indice]];
  }

  function confirmarNombre() {
  let nombre = posiciones.map(i => abecedario[i]).join("");
  const mensaje = document.getElementById("mensaje-nombre");
  const caja = document.getElementById("mensaje-box");
  const textoCompleto = "Bienvenido al juego " + nombre + "  ^ ^ /";

  mensaje.style.display = "flex";
  caja.textContent = "";
  mensaje.classList.add("mostrar");

  let i = 0;
  const escribir = setInterval(() => {
    caja.textContent += textoCompleto[i];
    i++;
    if (i >= textoCompleto.length) {
      clearInterval(escribir);

      // Espera 1s y luego inicia transición a negro
      setTimeout(() => {
        document.body.classList.add("transicion"); // fade-out

        // después de 0.5s (cuando ya está negro), redirigir
        setTimeout(() => {
          window.location.href = "P3.html";
        }, 500);

      }, 1000); // espera breve tras terminar el mensaje
    }
  }, 50); // tiempo por letra
}

  window.onload = () => {
    setTimeout(() => {
      document.body.classList.add("visible");
    }, 200);
  };
