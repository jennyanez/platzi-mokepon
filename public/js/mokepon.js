//const { application } = require("express")

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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let JugadorId = null
let enemigoId = null

let mokepones = []
let mokeponesEnemigos = []
let ataqueEnemigo = []
let opcionDeMokepones

let mascotaJugadorNombre
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

let lienzo = mapa.getContext("2d")
let alturaNueva
let anchoMapa = window.innerWidth - 20
const maxAncho = 420

if (anchoMapa > maxAncho) {
    anchoMapa = maxAncho - 20
}

let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/img/mokemap.png'

alturaNueva = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaNueva

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.width = 60
        this.height = 60
        this.x = aleatorio(0, mapa.width - this.width)
        this.y = aleatorio(0, mapa.height - this.height)     
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.id = id
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

//mascotas jugador
let hipodoge = new Mokepon ('Hipodoge', './assets/img/mokepons_mokepon_hipodoge_attack.png', 5, './assets/img/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/img/mokepons_mokepon_capipepo_attack.png', 5, './assets/img/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/img/mokepons_mokepon_ratigueya_attack.png', 5, './assets/img/ratigueya.png')

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
]

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
]

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra'},
]

//pasarle los elementos de la lista, con los ...
hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
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

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    // Elegir mascota
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    //Reiniciar
    botonReiniciar.addEventListener('click', reiniciarJuego)

    joinGame()
}

function joinGame(){
   fetch("http://172.20.10.4:8080/join")
        .then(function (res) {
            if(res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        }) 
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Elegir mascota
function seleccionarMascotaJugador() {   
        
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugadorNombre = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugadorNombre = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugadorNombre = inputRatigueya.id
    } else {
        alert('Selecciona una mascota, Don Comedias')
        return //esto hace que no se siga ejecutando el codigo
    }
    
    sectionSeleccionarMascota.style.display = 'none'
    
    selectMokepon(mascotaJugadorNombre)

    extraerAtaques(mascotaJugadorNombre)

    sectionVerMapa.style.display = 'flex'

    iniciarMapa()
}

function selectMokepon(mokeponJugador){
    fetch(`http://172.20.10.4:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mokeponJugador
        })
    })
}

function getMascota () {
    for(let i = 0; i < mokepones.length; i++){
        if(mokepones[i].nombre === mascotaJugadorNombre){
            return mokepones[i]
        }
    }
}

// dibujar en canvas
function iniciarMapa(){
    mascotaJugador = getMascota()

    intervalo = setInterval(pintarCanvas, 50)

    //eventos del teclado 
    window.addEventListener('keydown', teclaPresionada)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas(){
    mascotaJugador.x = mascotaJugador.x + mascotaJugador.velocidadX
    mascotaJugador.y = mascotaJugador.y + mascotaJugador.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugador.pintarMokepon()

    enviarPosicion(mascotaJugador.x, mascotaJugador.y)
    
    mokeponesEnemigos.forEach(function (mokepon) {
        if(mokepon !== undefined){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })

}

function enviarPosicion(x, y){
    fetch(`http://172.20.10.4:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({ enemigos }){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        if(enemigo.mokepon !== undefined){
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if(mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon ('Hipodoge', './assets/img/mokepons_mokepon_hipodoge_attack.png', 5, './assets/img/hipodoge.png', enemigo.id)
                            } else if (mokeponNombre === "capipepo"){
                                mokeponEnemigo = new Mokepon('Capipepo', './assets/img/mokepons_mokepon_capipepo_attack.png', 5, './assets/img/capipepo.png', enemigo.id)
                            } else if(mokeponNombre === "Ratigueya"){
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/img/mokepons_mokepon_ratigueya_attack.png', 5, './assets/img/ratigueya.png', enemigo.id)
                            }
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                            
                            return mokeponEnemigo
                        }
                    })
                })
        }
    })
}

function moverDerecha() {
    mascotaJugador.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugador.velocidadX = - 5
}

function moverArriba() {
    mascotaJugador.velocidadY = - 5
}

function moverAbajo() {
    mascotaJugador.velocidadY = 5
}

function detenerMovimiento() {
    mascotaJugador.velocidadX = 0
    mascotaJugador.velocidadY = 0
}

function teclaPresionada(event) {
    switch (event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}

function revisarColision(enemigo) {
    
    if(enemigo.x == undefined || enemigo.y == undefined){
        return
    }

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.height
    const derechaEnemigo = enemigo.x + enemigo.width
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugador.y
    const abajoMascota = mascotaJugador.y + mascotaJugador.height
    const derechaMascota = mascotaJugador.x + mascotaJugador.width
    const izquierdaMascota = mascotaJugador.x

    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo){
        return
    }
    
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision")

    enemigoId = enemigo.id

    // alert('Hay colision con un enemigo: ' + enemigo.nombre)

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'

    seleccionarMascotaEnemigo(enemigo)
}

//Ataques
function extraerAtaques(mascotaJugadorNombre){
    let ataques

    for(let i = 0; i < mokepones.length; i++){
        if(mokepones[i].nombre === mascotaJugadorNombre){
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
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://172.20.10.4:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://172.20.10.4:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok){
                res.json()
                    .then(function( {ataques} ) {
                        if(ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){

    //let mascotaAleatoria = aleatorio(0, mokepones.length - 1) 
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques

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
    clearInterval(intervalo)

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