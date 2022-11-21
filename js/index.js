"use strict";
let jugadores = [];
let campoDeMinas = [];
let restantes = 1;
let encontradas = 0;
let time = 30;
let numIntentos = 3;
let minas = 1;
// DOM
let minasRestantes = document.getElementById("minasPorEncontrar");
let minasEncontradas = document.getElementById("minasEncontradas");
let tiempo = document.getElementById("tiempo");
let intentos = document.getElementById("intentos");
let numMinas = document.getElementById("numMinas");
const jugar = () => {
    inicializarCampo();
    printCampo();
    const intervalId = setInterval(() => {
        time--;
        tiempo.innerText = time.toString();
        if (time === 0 || numIntentos == 0) {
            clearInterval(intervalId);
            alert("Has Perdido");
        }
        ;
        if (encontradas == minas) {
            clearInterval(intervalId);
            alert("Has ganado");
        }
    }, 1000);
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
                <input type="checkbox" onclick="checkMine(${i},${j})" id="${i}${j}"/>
                <div class="swap-on p-1 bg-slate-800 rounded">💣</div>
                <div class="swap-off p-1 bg-slate-800 rounded"></div>
            </label>`;
            }
            else {
                info += `<label class="swap swap-flip text-3xl m-0">
                <input type="checkbox" onclick="checkMine(${i},${j})" id="${i}${j}"/>
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
const checkMine = (i, j) => {
    let element = document.getElementById(`${i}${j}`);
    setTimeout(() => {
        if (campoDeMinas[i][j] === 0) {
            element.onclick = '';
            element.click();
            element.onclick = `checkMine(${i},${j})`;
        }
        if (campoDeMinas[i][j] === 1) {
            restantes--;
            encontradas++;
            minasEncontradas.innerText = encontradas;
            minasRestantes.innerText = restantes;
        }
        numIntentos--;
        intentos.innerText = numIntentos;
    }, 800);
};
verificarStorage();
minasRestantes.innerText = numMinas.value;
minasEncontradas.innerText = '0';
tiempo.innerText = parseInt(numMinas.value) * 30;
intentos.innerText = parseInt(numMinas.value) * 3;
numMinas.addEventListener("change", (e) => {
    minasRestantes.innerText = e.target.value;
    tiempo.innerText = parseInt(e.target.value) * 30;
    intentos.innerText = parseInt(e.target.value) * 3;
    restantes = parseInt(e.target.value);
    time = parseInt(e.target.value) * 30;
    numIntentos = parseInt(e.target.value) * 3;
    minas = numMinas.value;
});
