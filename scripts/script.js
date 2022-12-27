const baseDeDatos = [
    {
        id: 1,
        nombre: "Teclado",
        precio: 1000,
    },
    {
        id: 2,
        nombre: "Monitor",
        precio: 5000,
    },
    {
        id: 3,
        nombre: "MousePad",
        precio: 500,
    },
    {
        id: 4,
        nombre: "Auriculares",
        precio: 3000,
    }
]

alert("Si su compra supera los $20000 pesos obtiene un 25% OFF")

let carrito = []
let total = 0

// Agregar items al carrito

function agregarItem(item, cantidad) {
    for (let index = 0; index < cantidad; index++) {
        carrito.push(baseDeDatos[item])
    }
}

// Menu

function menu() {
    let item, cantidad, salir, opcion
    console.log("MENU")
    do {
        opcion = parseInt(prompt("Opcion 1 = Cargar productos, Opcion 2 = Opcion de pago, Opcion 3 = Ver Carrito, Opcion 4 = Ver el total, Opcion 5 = Salir"))
        switch (opcion) {
            case 1:
                do {
                    alert("Elija el producto")
                    item = prompt("Producto 1 = Teclado, Producto 2 = Monitor, Producto 3 = MousePad, Producto 4 = Auriculares")
                    cantidad = prompt("Ingrese la cantidad")
                    agregarItem(item - 1, cantidad)
                    salir = prompt("Desea agregar otro producto? s/n")
                } while (salir == "s")
                break
            case 2:
                calcularCarrito()
                metodoDePago()
                break
            case 3:
                verCarrito()
                break
            case 4:
                descuento()
                break
        }
    } while (opcion != 5)
}

// Funciones del carrito carrito

function calcularCarrito() {
    for (let index = 0; index < carrito.length; index++) {
        total += carrito[index].precio
    }
    return total
}

function verCarrito() {
    const lista = carrito.map(carrito => carrito.nombre)
    console.log(lista)
}

// Elegir metodo de pago

function metodoDePago() {
    let opcion;
    do {
        opcion = prompt("Elija metodo de pago. Opcion 1: efectivo 10% OFF!!. Opcion 2: 3 cuotas sin interes. Opcion 3: 12 cuotas un 10% de recargo")
        switch (parseInt(opcion)) {
            case 1:
                return total -= total * 10 / 100
            case 2:
                return total
            case 3:
                return total += total * 10 / 100
            default:
                console.log("Metodo de pago no valido, ingreselo nuevamente")
        }
    } while (opcion > 3 || opcion <= 0)
}

// Funcion que muestra el total

function descuento() {
    if (total > 20000) {
        console.log("El total a pagar es: " + parseInt(total - total * 25 / 100))
    } else {
        console.log("El total a pagar es: " + parseInt(total))
    }
}

menu()