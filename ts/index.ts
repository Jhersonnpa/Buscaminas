let jugadores: any[] = [];
let campoDeMinas: any = [];
let restantes: number = 1;
let encontradas: number = 0;
let time: number = 30;
let timePlayer: number = 0;
let numIntentos: number = 3;
let intentosUsados: number = 0;
let minas: number = 1;
// DOM
let minasRestantes: any = document.getElementById("minasPorEncontrar");
let minasEncontradas: any = document.getElementById("minasEncontradas");
let tiempo: any = document.getElementById("tiempo");
let intentos: any = document.getElementById("intentos");
let numMinas: any = document.getElementById("numMinas");

const reset = () => {
    restantes = numMinas.value;
    encontradas = 0;
    time = numMinas.value * 30;
    numIntentos = numMinas.value * 3;
    minas = numMinas.value;
    intentosUsados = 0;
    timePlayer = 0;
    let tablero: any = document.getElementById("tablero");
    tablero.innerHTML = `<div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>
    <div class="bg-gray-800 p-5"></div>`;
}

const jugar = () => {
    let name: any = document.getElementById("name");
    let infoModal: any = document.getElementById("info-modal");
    let modal: any = document.getElementById("modal");
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
            jugadores.push({ nombre: name.value, minasRestantes: restantes, minasEncontradas: encontradas, tiempo: timePlayer, intentos: intentosUsados, minasSeleccionadas: minas, win: false });
            localStorage.setItem("jugadores", JSON.stringify(jugadores));
            if (time === 0) infoModal.innerText = 'Game Over, se acabo el tiempo 😵‍💫';
            if (numIntentos == 0) infoModal.innerText = 'Game Over, no quedan intentos 😵‍💫';
            modal.click();
            printPlayers();
            reset();
            clearInterval(intervalId);
        };
        if (encontradas == minas && time > 0) {
            jugadores.push({ nombre: name.value, minasRestantes: restantes, minasEncontradas: encontradas, tiempo: timePlayer, intentos: intentosUsados, minasSeleccionadas: minas, win: true });
            localStorage.setItem("jugadores", JSON.stringify(jugadores));
            infoModal.innerText = 'Has ganado, revisa el ranking! 🥳';
            modal.click();
            printPlayers();
            reset();
            clearInterval(intervalId);
        }
        if (time > 0) time--;
        timePlayer++;
        tiempo.innerText = time.toString();
    }, 1000);
}

const inicializarCampo = () => {
    let numProbabilidades: any = document.getElementById("numMinas");
    numProbabilidades = parseInt(numProbabilidades.value);
    let contador: number = 0;
    // Inicializamos a 0 todas las posiciones
    for (let i = 0; i < 5; i++) {
        let array: number[] = [];
        campoDeMinas[i] = array;
        for (let j = 0; j < 5; j++) {
            campoDeMinas[i][j] = 0;
        }
    }

    // Asignamos aleatoriamente las minas en el array
    while (contador < numProbabilidades) {
        let randomI: number = Math.floor((Math.random() * 5));
        let randomJ: number = Math.floor((Math.random() * 5));

        if (campoDeMinas[randomI][randomJ] == 0) {
            campoDeMinas[randomI][randomJ] = 1;
            contador++;
        }
    }
}

const printCampo = () => {
    let tablero: any = document.getElementById("tablero");
    let info: any = '';

    for (let i = 0; i < campoDeMinas.length; i++) {
        for (let j = 0; j < campoDeMinas[i].length; j++) {
            if (campoDeMinas[i][j] == 1) {
                info += `<label class="swap swap-flip text-3xl m-0 w-min mx-auto">
                <input type="checkbox" onclick="checkMine(${i},${j})" id="${i}${j}"/>
                <div class="swap-on p-1 bg-slate-800 rounded">💣</div>
                <div class="swap-off p-1 bg-slate-800 rounded"></div>
            </label>`
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
}

const printPlayers = () => {
    let tbody: any = document.getElementById("tbody");
    let info: any = '';
    if (jugadores.length >= 1) {
        for (let i = 0; i < jugadores.length; i++) {
            let jugador: any = jugadores[i];
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
}

const verificarStorage = () => {
    if (localStorage.getItem("jugadores")) {
        let storageJugadores: any = localStorage.getItem("jugadores");
        storageJugadores = JSON.parse(storageJugadores);
        jugadores = storageJugadores;
    }
}

const checkMine = (i: number, j: number) => {
    let element: any = document.getElementById(`${i}${j}`);
    intentosUsados++;
    console.log(intentosUsados);
    numIntentos--;
    intentos.innerText = numIntentos;
    if (campoDeMinas[i][j] === 0) {
        element.removeAttribute("onclick");
        setTimeout(() => {
            element.click();
            element.setAttribute("onclick", `checkMine(${i},${j})`);
        }, 800);
    }
    if (campoDeMinas[i][j] === 1) {
        restantes--;
        encontradas++;
        minasEncontradas.innerText = encontradas;
        minasRestantes.innerText = restantes;
    }

}

verificarStorage();
printPlayers();
minasRestantes.innerText = numMinas.value;
minasEncontradas.innerText = '0';
tiempo.innerText = parseInt(numMinas.value) * 30;
intentos.innerText = parseInt(numMinas.value) * 3;
numMinas.addEventListener("change", (e: any) => {
    minasRestantes.innerText = e.target.value;
    tiempo.innerText = parseInt(e.target.value) * 30;
    intentos.innerText = parseInt(e.target.value) * 3;
    restantes = parseInt(e.target.value);
    time = parseInt(e.target.value) * 30;
    numIntentos = parseInt(e.target.value) * 3;
    minas = numMinas.value;
});