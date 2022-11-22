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
const reset = () => {
    restantes = numMinas.value;
    encontradas = 0;
    time = numMinas.value * 30;
    numIntentos = numMinas.value * 3;
    minas = numMinas.value;
    let tablero = document.getElementById("tablero");
    tablero.innerHTML = `<div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>`;
};
const jugar = () => {
    let name = document.getElementById("name");
    let infoModal = document.getElementById("info-modal");
    let modal = document.getElementById("modal");
    if (name.value == '') {
        infoModal.innerText = 'Introduce un nombre';
        modal.click();
        return;
    }
    inicializarCampo();
    printCampo();
    minasRestantes.innerText = numMinas.value;
    minasEncontradas.innerText = '0';
    tiempo.innerText = time;
    intentos.innerText = numIntentos;
    const intervalId = setInterval(() => {
        if (time === 0 || (numIntentos == 0 && encontradas != minas)) {
            jugadores.push({ nombre: name.value, minasRestantes: restantes, minasEncontradas: encontradas, tiempo: time, intentos: numIntentos, minasSeleccionadas: minas, win: false });
            localStorage.setItem("jugadores", JSON.stringify(jugadores));
            if (time === 0)
                infoModal.innerText = 'Game Over, se acabo el tiempo 😵‍💫';
            if (numIntentos == 0)
                infoModal.innerText = 'Game Over, no quedan intentos 😵‍💫';
            modal.click();
            printPlayers();
            reset();
            clearInterval(intervalId);
        }
        ;
        if (encontradas == minas && time > 0) {
            jugadores.push({ nombre: name.value, minasRestantes: restantes, minasEncontradas: encontradas, tiempo: time, intentos: numIntentos, minasSeleccionadas: minas, win: true });
            localStorage.setItem("jugadores", JSON.stringify(jugadores));
            infoModal.innerText = 'Has ganado, revisa el ranking! 🥳';
            modal.click();
            printPlayers();
            reset();
            clearInterval(intervalId);
        }
        if (time > 0)
            time--;
        tiempo.innerText = time.toString();
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
                info += `<label class="swap swap-flip text-3xl m-0 w-min mx-auto">
                <input type="checkbox" onclick="checkMine(${i},${j})" id="${i}${j}"/>
                <div class="swap-on p-1 bg-slate-800 rounded">💣</div>
                <div class="swap-off p-1 bg-slate-800 rounded"></div>
            </label>`;
            }
            else {
                info += `<label class="swap swap-flip text-3xl m-0 w-min mx-auto">
                <input type="checkbox" onclick="checkMine(${i},${j})" id="${i}${j}"/>
                <div class="swap-on p-1 bg-slate-800 rounded">🤭</div>
                <div class="swap-off p-1 bg-slate-800 rounded"></div>
            </label>`;
            }
        }
    }
    tablero.innerHTML = info;
};
const printPlayers = () => {
    let tbody = document.getElementById("tbody");
    let info = '';
    if (jugadores.length >= 1) {
        for (let i = 0; i < jugadores.length; i++) {
            let jugador = jugadores[i];
            if (jugador.win == false) {
                info += `
                <tr class="hover bg-red-700">
                    <th>${i + 1}</th>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.minasRestantes}</td>
                    <td>${jugador.minasEncontradas}</td>
                    <td>${jugador.tiempo} s</td>
                    <td>${jugador.intentos}</td>
                    <td>${jugador.minasSeleccionadas}</td>
                </tr>`;
            }
            else {
                info += `
                <tr class="hover bg-green-700">
                    <th>${i + 1}</th>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.minasRestantes}</td>
                    <td>${jugador.minasEncontradas}</td>
                    <td>${jugador.tiempo} s</td>
                    <td>${jugador.intentos}</td>
                    <td>${jugador.minasSeleccionadas}</td>
                </tr>`;
            }
        }
    }
    tbody.innerHTML = info;
};
const verificarStorage = () => {
    if (localStorage.getItem("jugadores")) {
        let storageJugadores = localStorage.getItem("jugadores");
        storageJugadores = JSON.parse(storageJugadores);
        jugadores = storageJugadores;
    }
};
const checkMine = (i, j) => {
    let element = document.getElementById(`${i}${j}`);
    numIntentos--;
    intentos.innerText = numIntentos;
    if (campoDeMinas[i][j] === 0) {
        element.removeAttribute("onclick");
        setTimeout(() => {
            element.click();
            element.setAttribute("onclick", `checkMine(${i},${j})`);
            // element.onclick = `checkMine(${i},${j})`;
        }, 800);
    }
    if (campoDeMinas[i][j] === 1) {
        restantes--;
        encontradas++;
        minasEncontradas.innerText = encontradas;
        minasRestantes.innerText = restantes;
    }
};
verificarStorage();
printPlayers();
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
