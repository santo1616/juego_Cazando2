let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTO_GATO = 80;
const ANCHO_GATO = 80;
const ALTO_COMIDA = 40;
const ANCHO_COMIDA = 40;

let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;
let puntaje = 0;
let tiempo = 50;
let intervalo;

function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    mostrarEnSpan("puntos", puntaje);
    mostrarEnSpan("tiempo", tiempo);

    intervalo = setInterval(restarTiempo, 1000);

    actualizarPantalla();
}

function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "green");
}

function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "yellow");
}

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moverIzquierda() {
    gatoX = gatoX - 10;
    actualizarPantalla();
}

function moverDerecha() {
    gatoX = gatoX + 10;
    actualizarPantalla();
}

function moverArriba() {
    gatoY = gatoY - 10;
    actualizarPantalla();
}

function moverAbajo() {
    gatoY = gatoY + 10;
    actualizarPantalla();
}

function actualizarPantalla() {
    limpiarCanva();
    detectarColision();
    graficarGato();
    graficarComida();
}

function detectarColision() {
    if (
        gatoX + ANCHO_GATO > comidaX &&
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoY + ALTO_GATO > comidaY &&
        gatoY < comidaY + ALTO_COMIDA
    ) {
        puntaje = puntaje + 1;
        mostrarEnSpan("puntos", puntaje);

        comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
        comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);

        if (puntaje == 6) {
            clearInterval(intervalo);
            alert("Ganaste");
        }
    }
}

function restarTiempo() {
    tiempo = tiempo - 1;
    mostrarEnSpan("tiempo", tiempo);

    if (tiempo == 0) {
        clearInterval(intervalo);
        alert("Game Over");
    }
}

function reiniciarJuego() {
    clearInterval(intervalo);

    puntaje = 0;
    tiempo = 10;

    mostrarEnSpan("puntos", puntaje);
    mostrarEnSpan("tiempo", tiempo);

    iniciarJuego();
}