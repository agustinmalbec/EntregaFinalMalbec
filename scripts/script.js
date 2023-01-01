class Category {
  constructor(id = 0, name = "No definido") {
      this.id = id
      this.name = name
  }

  toString() {
      return this.name
  }
}

class Product {
  constructor(id = 0, name = "No definido", price = 0, category = null) {
      this.id = id
      this.name = name
      this.price = price
      this.category = category
  }

  toString() {
      return this.name
  }
}

// Definicion categorias

let keyboardCategory = new Category(1, "Teclados")
let displayCategory = new Category(2, "Pantallas")
let accessoriesCategory = new Category(3, "Accesorios")
let soundCategory = new Category(4, "Sonido")

// Definicion productos

let products = []

products.push(new Product(1, "Teclado", 1000, keyboardCategory))
products.push(new Product(2, "Monitor", 5000, displayCategory))
products.push(new Product(3, "MousePad", 500, accessoriesCategory))
products.push(new Product(4, "Auriculares", 3000, soundCategory))

let shoppingCart = []

let cartContainer = document.getElementById("carritoContenedor")
let container = document.getElementById("contenedor")
let empyButton = document.getElementById("vaciarCarrito")
let totalPrice = document.getElementById("precioTotal")

// Almacenamiento local

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("shoppingCart")) {
      shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
      cartRefresh()
  }
})

// Creador de productos

products.forEach((product) => {
  let div = document.createElement("div")
  div.classList.add("product")
  div.innerHTML = `
<h3>${product.name}(${product.category})</h3>
<p>$${product.price}</p>
<button id="agregar${product.id}">Agregar al carrito</button>
`
  container.appendChild(div)

  let boton = document.getElementById(`agregar${product.id}`)

  boton.addEventListener("click", () => {
      addToCart(product.id)
  })
})

// Actualicion de carrito

let addToCart = (prodId) => {
  let item = products.find((prod) => prod.id === prodId)
  shoppingCart.push(item)
  cartRefresh()
}

let deleteFromCart = (prodId) => {
  let item = shoppingCart.find((prod) => prod.id === prodId)
  let indice = shoppingCart.indexOf(item)
  shoppingCart.splice(indice, 1)
  cartRefresh()
}

empyButton.addEventListener("click", () => {
  shoppingCart.length = 0
  cartRefresh()
})

function cartRefresh() {
  cartContainer.innerHTML = ""
  shoppingCart.forEach((prod) => {
      let div = document.createElement("div")
      div.innerHTML = `
      <p>${prod.name}</p>
      <p>Precio:$${prod.price}</p>
      <button onclick="deleteFromCart(${prod.id})">X</button>
      `
      cartContainer.appendChild(div)

      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  })
  totalPrice.innerText = shoppingCart.reduce((ac, prod) => ac + prod.price, 0)
}