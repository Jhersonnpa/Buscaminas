let jugadores: object[] = [];
let campoDeMinas: any = [];
let restantes: number = 1;
let encontradas: number = 0;
let time: number = 30;
let numIntentos: number = 3;
let minas: number = 1;
// DOM
let minasRestantes: any = document.getElementById("minasPorEncontrar");
let minasEncontradas: any = document.getElementById("minasEncontradas");
let tiempo: any = document.getElementById("tiempo");
let intentos: any = document.getElementById("intentos");
let numMinas: any = document.getElementById("numMinas");

const jugar = () => {
    inicializarCampo();
    printCampo();
    const intervalId = setInterval(() => {
        time--;
        tiempo.innerText = time.toString();
        if (time === 0 || numIntentos == 0) {
            clearInterval(intervalId);
            alert("Has Perdido");
        };
        if (encontradas == minas) {
            clearInterval(intervalId);
            alert("Has ganado");
        }
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
                info += `<label class="swap swap-flip text-3xl m-0">
                <input type="checkbox" onclick="checkMine(${i},${j})" id="${i}${j}"/>
                <div class="swap-on p-1 bg-slate-800 rounded">💣</div>
                <div class="swap-off p-1 bg-slate-800 rounded"></div>
            </label>`
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
}

const verificarStorage = () => {
    if (localStorage.getItem("jugadores")) {
        let storageJugadores: any = localStorage.getItem("jugadores");
        storageJugadores = JSON.parse(storageJugadores);
        jugadores = storageJugadores;
    }
    // jugadores[0] = {nombre: "", minasEncontradas: 0, tiempo: 0, intentos: 0};
}

const checkMine = (i: number, j: number) => {
    let element: any = document.getElementById(`${i}${j}`);

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
}

verificarStorage();
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