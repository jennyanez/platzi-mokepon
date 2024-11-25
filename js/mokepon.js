// Variable global, para usarla en cualquier otra funcion
const sectionInicio = document.getElementById('pantalla-inicio')
const botonPlay = document.getElementById("play-game")
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById('boton-reiniciar')

const spanMascotaJugador = document.getElementById('mascota-jugador') 
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const subtituloPelea = document.getElementById("subtitulo_pelea")

const sectionMascotas = document.getElementById("mascotas-seleccionadas")

const sectionMensajes = document.getElementById('resultado')
const sectionAtaqueJugador = document.getElementById('ataque-jugador')
const sectionAtaqueEnemigo = document.getElementById('ataque-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueEnemigo = []
let opcionDeMokepones

let mascotaJugadorNombre
let mascotaJugador
let mascotaEnemigo
let mascotasSeleccionadas

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

let vida = new Image()
vida.src = './assets/img/vida.png'

let vidasJugador = 3    
let vidasEnemigo = 3

let lienzo = mapa.getContext("2d")
let alturaNueva
let anchoMapa = window.innerWidth - 20
const maxAncho = 620

if (anchoMapa > maxAncho) {
    anchoMapa = maxAncho - 20
}

let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/img/mi-mapa.webp'



alturaNueva = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaNueva

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
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

//mascotas enemigo
let hipodogeEnemigo = new Mokepon ('Hipodoge', './assets/img/mokepons_mokepon_hipodoge_attack.png', 5, './assets/img/hipodoge.png')
let capipepoEnemigo = new Mokepon('Capipepo', './assets/img/mokepons_mokepon_capipepo_attack.png', 5, './assets/img/capipepo.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/img/mokepons_mokepon_ratigueya_attack.png', 5, './assets/img/ratigueya.png')


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

hipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
)

capipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
)

ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra'},
)


mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>
            <img src=${mokepon.foto} alt=${mokepon.nombre} srcset="">
            <p>${mokepon.nombre}</p>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    inputCapipepo.checked = true

    //iniciar juego
    botonPlay.addEventListener('click', startGame)

    // Elegir mascota
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    //Reiniciar
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function startGame (){
    sectionInicio.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'flex'
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Elegir mascota
function seleccionarMascotaJugador() {
    //ocultar/mostrar secciones
   
    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
   
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
    }

    iniciarMapa()

    extraerAtaques(mascotaJugadorNombre)
    //seleccionarMascotaEnemigo()
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
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if(mascotaJugador.velocidadX != 0 || mascotaJugador.velocidadY != 0) {
        revisarColisionEnemigo(hipodogeEnemigo)
        revisarColisionEnemigo(capipepoEnemigo)
        revisarColisionEnemigo(ratigueyaEnemigo)
    }
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

function revisarColisionEnemigo(enemigo) {
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
    
    subtituloPelea.innerHTML= 'Elegiste luchar contra ' + enemigo.nombre + '! Ahora debes elegir tu ataque!'
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


function seleccionarMascotaEnemigo(enemigo){
    mascotaEnemigo = enemigo
    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre
    ataquesMokeponEnemigo = mascotaEnemigo.ataques

   
    if(mascotaJugador.nombre === mascotaEnemigo.nombre){
        for(i = 0; i < 2; i++) {
            mascotasSeleccionadas = `
            <div class='mascota'>
                <div class="vidas-nombre-container">
                    <p>${mascotaJugador.nombre}</p>
                    <div class="vidas" id="vidas-${i}">
                        <img src=${vida.src}>
                        <img src=${vida.src}>
                        <img src=${vida.src}>
                    </div>
                </div>
                <img src=${mascotaJugador.foto} alt=${mascotaJugador.nombre} srcset="">
            </div>
        `
        sectionMascotas.innerHTML += mascotasSeleccionadas
        }
        
    }
    else {
        mascotasSeleccionadas = `
            <div class='mascota'>
                <div class="vidas-nombre-container">
                    <p>${mascotaJugador.nombre}</p>
                    <div class="vidas" id="vidas-0">
                        <img src=${vida.src}>
                        <img src=${vida.src}>
                        <img src=${vida.src}>
                    </div>
                </div>
                <img src=${mascotaJugador.foto} alt=${mascotaJugador.nombre} srcset="">
            </div>
            <div class='mascota'>
                <div class="vidas-nombre-container">
                    <p>${mascotaEnemigo.nombre}</p>
                    <div class="vidas" id="vidas-1">
                        <img src=${vida.src}>
                        <img src=${vida.src}>
                        <img src=${vida.src}>
                    </div>
                </div>
                <img src=${mascotaEnemigo.foto} alt=${mascotaEnemigo.nombre} srcset="">  
            </div>
        `
        sectionMascotas.innerHTML = mascotasSeleccionadas
    }    
     
    secuenciaAtaque()
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
            console.log(ataqueJugador)
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '🔥'){
        ataqueEnemigo.push('FUEGO')
        ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
    }else if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '💧'){
        ataqueEnemigo.push('AGUA')
        ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
    }else {
        ataqueEnemigo.push('TIERRA')
        ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
    }
    
    console.log(ataquesMokeponEnemigo)

    iniciarPelea()
}

function iniciarPelea(){
   combate()
}

// Combate 🥷
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {    
    let indexAtaque = ataqueJugador.length - 1
    indexAtaqueJugador = ataqueJugador[indexAtaque]
    indexAtaqueEnemigo = ataqueEnemigo[indexAtaque] 

    let arrayVidasJugador = document.querySelectorAll("#vidas-0 img")
    let arrayVidasEnemigo = document.querySelectorAll("#vidas-1 img")

    if(ataqueJugador[indexAtaque] == ataqueEnemigo [indexAtaque]) {
        crearMensaje('Empate 🧐')
    } else if  (ataqueJugador[indexAtaque] == 'FUEGO' && ataqueEnemigo[indexAtaque] == 'TIERRA') {
        crearMensaje('GANASTE 🎉')
        arrayVidasEnemigo[vidasEnemigo-1].style.display = "none"
        vidasEnemigo--
    } else if (ataqueJugador[indexAtaque] == 'AGUA' && ataqueEnemigo[indexAtaque] == 'FUEGO') {
        crearMensaje('GANASTE 🎉')
        arrayVidasEnemigo[vidasEnemigo-1].style.display = "none"
        vidasEnemigo--
    } else if (ataqueJugador[indexAtaque] == 'TIERRA' && ataqueEnemigo[indexAtaque] == 'AGUA') {
        crearMensaje('GANASTE 🎉')
        arrayVidasEnemigo[vidasEnemigo-1].style.display = "none"
        vidasEnemigo--
    } else {
        crearMensaje('PERDISTE 😂🫵')
        arrayVidasJugador[vidasJugador-1].style.display = "none"
        vidasJugador--
    }

    console.log(vidasJugador, vidasEnemigo)

    if(ataqueJugador.length == 5 || vidasJugador === 0 || vidasEnemigo === 0) {
        revisarVidas()
    }  
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
    if(vidasJugador === 0 || vidasEnemigo === 0){
        botones.forEach((boton) => {
            boton.disabled = true
        })
    }

    if (vidasJugador === vidasEnemigo) {
        crearMensajeFinal("Esto fue un empate. Inténtalo de nuevo")
    } else if (vidasJugador > vidasEnemigo) {
        crearMensajeFinal("Ganaste el juego!")
    } else {
        crearMensajeFinal("PERDISTE. Quieres revancha?")
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