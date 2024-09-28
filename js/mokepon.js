// Variable global, para usarla en cualquier otra funcion
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById('boton-reiniciar')

const spanMascotaJugador = document.getElementById('mascota-jugador') 
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById('resultado')
const sectionAtaqueJugador = document.getElementById('ataque-jugador')
const sectionAtaqueEnemigo = document.getElementById('ataque-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

let mokepones = []
let ataqueEnemigo = []
let opcionDeMokepones

let mascotaJugador

let inputHipodoge
let inputCapipepo
let inputRatigueya

let ataquesMokepon

let botonFuego
let botonAgua
let botonTierra
let botones = []

let ataqueJugador = []
let ataquesMokeponEnemigo = []

let indexAtaqueJugador
let indexAtaqueEnemigo

let vidasJugador = 3
let vidasEnemigo = 3
let victoriasJugador = 0
let victoriasEnemigo = 0

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon ('Hipodogue', './assets/img/mokepons_mokepon_hipodoge_attack.png', 5)

let capipepo = new Mokepon('Capipepo', './assets/img/mokepons_mokepon_capipepo_attack.png', 5)

let ratigueya = new Mokepon('Ratigueya', './assets/img/mokepons_mokepon_ratigueya_attack.png', 5)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'

    sectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} srcset="">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodogue')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    // Elegir mascota
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    //Reiniciar
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Elegir mascota
function seleccionarMascotaJugador() {
    //ocultar/mostrar secciones
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionSeleccionarMascota.style.display = 'none'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota, Don Comedias')
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

//Ataques
function extraerAtaques(mascotaJugador){
    let ataques

    for(let i = 0; i < mokepones.length; i++){
        if(mokepones[i].nombre === mascotaJugador){
            ataques = mokepones[i].ataques
        }
    }
    
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){

    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id="${ataque.id}" class="boton-ataque BAtaque">${ataque.nombre}</button>
      `
      contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1) 
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre

    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques

    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }

    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length == 5) {
        combate()
    }
}

// Combate 🥷
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {    
    for(let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo [i]) {
            indexAmbosOponentes(i, i)
            crearMensaje('Empate 🧐')
        } else if  (ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA') {
            indexAmbosOponentes(i, i)
            crearMensaje('GANASTE 🎉')
            victoriasJugador++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO') {
            indexAmbosOponentes(i, i)
            crearMensaje('GANASTE 🎉')
            victoriasJugador++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA') {
            indexAmbosOponentes(i, i)
            crearMensaje('GANASTE 🎉')
            victoriasJugador++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje('PERDISTE 😂🫵')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            spanVidasJugador.innerHTML = victoriasJugador
        }
    }
    revisarVidas()
}

function crearMensaje(resultadoAtaque) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    
    sectionMensajes.innerHTML = resultadoAtaque
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate. Quieres revancha?")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones! Ganaste el juego")
    } else {
        crearMensajeFinal("PERDISTE PUTA JSJAJSHADJ")
    }
}

function crearMensajeFinal(resultadoFinal) {   
    sectionMensajes.innerHTML = '<b>' + resultadoFinal + '</b>'

    //show reset button
    sectionReiniciar.style.display = 'block'
}

// Reset
function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)