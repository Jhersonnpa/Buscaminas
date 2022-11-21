"use strict";
let jugadores = [];
let campoDeMinas = [];
let minasRestantes = document.getElementById("minasPorEncontrar");
let tiempo = document.getElementById("tiempo");
let intentos = document.getElementById("intentos");
let numMinas = document.getElementById("numMinas");
const jugar = () => {
    inicializarCampo();
    printCampo();
    console.log(tiempo);
    let time = parseInt(tiempo.value);
    const timeoutId = setTimeout(() => {
        console.log(time * 1000);
    }, 5000);
};
const inicializarCampo = () => {
    let numProbabilidades = document.getElementById("numMinas");
    numProbabilidades = parseInt(numProbabilidades.value);
    let contador = 0;
    // Inicializamos a 0 todas las posiciones
    for (let i = 0; i < 5; i++) {
        let array = [];
        campoDeMinas[i] = array;
        for (let j = 0; j < 5; j++) {
            campoDeMinas[i][j] = 0;
        }
    }
    // Asignamos aleatoriamente las minas en el array
    while (contador < numProbabilidades) {
        let randomI = Math.floor((Math.random() * 5));
        let randomJ = Math.floor((Math.random() * 5));
        if (campoDeMinas[randomI][randomJ] == 0) {
            campoDeMinas[randomI][randomJ] = 1;
            contador++;
        }
    }
};
const printCampo = () => {
    let tablero = document.getElementById("tablero");
    let info = '';
    for (let i = 0; i < campoDeMinas.length; i++) {
        for (let j = 0; j < campoDeMinas[i].length; j++) {
            if (campoDeMinas[i][j] == 1) {
                info += `<label class="swap swap-flip text-3xl m-0">
                <input type="checkbox" />
                <div class="swap-on p-1 bg-slate-800 rounded">💣</div>
                <div class="swap-off p-1 bg-slate-800 rounded"></div>
            </label>`;
            }
            else {
                info += `<label class="swap swap-flip text-3xl m-0">
                <input type="checkbox" />
                <div class="swap-on p-1 bg-slate-800 rounded">🤭</div>
                <div class="swap-off p-1 bg-slate-800 rounded"></div>
            </label>`;
            }
        }
    }
    tablero.innerHTML = info;
};
const verificarStorage = () => {
    if (localStorage.getItem("jugadores")) {
        let storageJugadores = localStorage.getItem("jugadores");
        storageJugadores = JSON.parse(storageJugadores);
        jugadores = storageJugadores;
    }
    // jugadores[0] = {nombre: "", minasEncontradas: 0, tiempo: 0, intentos: 0};
};
verificarStorage();
numMinas.addEventListener("change", (e) => {
    minasRestantes.innerText = e.target.value;
    tiempo.innerText = parseInt(e.target.value) * 30;
    intentos.innerText = parseInt(e.target.value) * 3;
});
