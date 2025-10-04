// Animación del "Cargando..."
    let puntos = 0;
    let textoCarga = document.getElementById("texto-carga");
    setInterval(() => {
      puntos = (puntos + 1) % 4;
      textoCarga.textContent = "CARGANDO" + ".".repeat(puntos);
    }, 500);

    // Simulación de carga
    window.onload = () => {
      setTimeout(() => {
        let pantallaCarga = document.getElementById("pantalla-carga");
        pantallaCarga.style.opacity = "0";
        setTimeout(() => {
          pantallaCarga.style.display = "none";
          document.body.classList.add("fondo");
          document.getElementById("menu").style.display = "flex";
        }, 1000);
      }, 3000);
    };

   function comenzar() {
  // Aplicar la clase que hace la transición a negro
  document.body.classList.add("transicion");
  
  // Esperar 0.5 segundos antes de cambiar de página
  setTimeout(() => {
    window.location.href = "./pages/P2.html";
  }, 500); // 500 ms = 0.5 segundos
}
