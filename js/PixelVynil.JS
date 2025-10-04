let jugador = "";
    let cancionSeleccionada = "";
    const teclasValidas = ['a','s','k','l'];
    const mapaTeclas = { 'a':0,'s':1,'k':2,'l':3 };

    const marcador = document.getElementById('puntos');
    const barraVida = document.getElementById('relleno-vida');
    const pantallaFin = document.getElementById('fin-juego');
    const contenedorJuego = document.getElementById('contenedor-juego');

    let puntos = 0, vida = 100, juegoActivo = false;
    let intervaloNotas, intervaloActualizacion;
    let velocidadNotas = 4;
    let combo = 0;

    const artistasCanciones = {
      "System of a Down": ["Chop Suey!", "Toxicity", "B.Y.O.B."],
      "Radiohead": ["Creep", "Karma Police", "No Surprises"],
      "Linkin Park": ["In the End", "Numb", "Crawling"],
      "Metallica": ["Enter Sandman", "One", "Master of Puppets"],
      "The Strokes": ["Last Nite", "Someday", "Reptilia"]
    };

    function cargarArtistas() {
      const divArtistas = document.getElementById("lista-artistas");
      divArtistas.innerHTML = "";
      Object.keys(artistasCanciones).forEach(artista => {
        const btn = document.createElement("button");
        btn.textContent = artista;
        btn.onclick = () => mostrarCanciones(artista);
        divArtistas.appendChild(btn);
      });
    }

    function mostrarCanciones(artista) {
      const divCanciones = document.getElementById("lista-canciones");
      divCanciones.innerHTML = "";
      document.querySelectorAll("#lista-artistas button").forEach(btn => {
        btn.classList.remove("activo");
      });

      const btnArtista = [...document.querySelectorAll("#lista-artistas button")]
        .find(b => b.textContent === artista);
      if (btnArtista) btnArtista.classList.add("activo");
      artistasCanciones[artista].forEach(cancion => {
        const btn = document.createElement("button");
        btn.textContent = cancion;
        btn.onclick = () => seleccionarCancion(artista, cancion);
        divCanciones.appendChild(btn);
      });
    }

    function irAMenuArtistas() {
      jugador = document.getElementById("nombre-jugador").value || "Jugador";
      mostrarPantalla("pantalla-artistas");
      cargarArtistas();
    }

    function seleccionarCancion(artista, cancion) {
      cancionSeleccionada = `${artista} - ${cancion}`;
      alert(jugador + " jugará: " + cancionSeleccionada);
      mostrarPantalla("pantalla-juego");
      iniciarJuego();
    }

    function mostrarPantalla(id) {
      document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
      document.getElementById(id).classList.add("activa");
    }

    function crearNota() {
      if (!juegoActivo) return;
      const tecla = teclasValidas[Math.floor(Math.random()*teclasValidas.length)];
      const indice = mapaTeclas[tecla];
      const nota = document.createElement('div');
      nota.classList.add('nota');
      nota.dataset.tecla = tecla;
      nota.style.left = (indice*25)+"%";
      nota.style.top = '0px';
      contenedorJuego.appendChild(nota);
    }

    function actualizarNotas() {
      document.querySelectorAll('.nota').forEach(nota=>{
        let top = parseFloat(nota.style.top);
        top += velocidadNotas;
        nota.style.top = top+"px";
        if (top > contenedorJuego.offsetHeight) {
          nota.remove();
          vida -= 10;
          actualizarVida();
        }
      });
    }

    function actualizarVida() {
      vida = Math.max(0, Math.min(vida, 100));
      barraVida.style.width = vida+"%";
      if (vida <= 0) terminarJuego();
    }
    function regresar(idPantalla) {
      if (juegoActivo) {
      terminarJuego();
      }
      mostrarPantalla(idPantalla);
    }

    function comprobarGolpe(tecla) {
      const notas = document.querySelectorAll('.nota');
      for (let nota of notas) {
        if (nota.dataset.tecla===tecla) {
          const top = parseFloat(nota.style.top);
          if (top >= contenedorJuego.offsetHeight - 120 && top <= contenedorJuego.offsetHeight - 40) {
            nota.remove();
            puntos += 100;
            combo++;
            if (combo % 5 === 0) velocidadNotas += 0.5;
            vida += 5;
            actualizarVida();
            marcador.textContent = 'Puntos: ' + puntos;
            return;
          }
        }
      }
      vida -= 5;
      combo = 0;
      actualizarVida();
    }

    function terminarJuego() {
      juegoActivo = false;
      clearInterval(intervaloNotas);
      clearInterval(intervaloActualizacion);
      pantallaFin.style.display = 'flex';
    }

    function reiniciarJuego() {
      puntos = 0; vida = 100; velocidadNotas = 4; combo = 0;
      juegoActivo = true;
      marcador.textContent = 'Puntos: 0';
      barraVida.style.width = '100%';
      pantallaFin.style.display = 'none';
      document.querySelectorAll('.nota').forEach(nota=>nota.remove());
      intervaloNotas = setInterval(crearNota, 1000);
      intervaloActualizacion = setInterval(actualizarNotas, 20);
    }

    function iniciarJuego() { reiniciarJuego(); }

    /* Eventos teclado (PC) */
    document.addEventListener('keydown', e=>{
      const tecla = e.key.toLowerCase();
      if (teclasValidas.includes(tecla) && juegoActivo) comprobarGolpe(tecla);
    });

    /* Eventos táctiles y click (Celular + PC) */
    document.querySelectorAll(".tecla").forEach(boton=>{
      boton.addEventListener("touchstart", ()=> {
        if (juegoActivo) comprobarGolpe(boton.dataset.tecla);
      });
      boton.addEventListener("click", ()=> {
        if (juegoActivo) comprobarGolpe(boton.dataset.tecla);
      });
    });