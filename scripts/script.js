let shoppingCart = []

const cartContainer = document.getElementById("carritoContenedor")
const container = document.getElementById("contenedor")
const emptyButton = document.getElementById("vaciarCarrito")
const totalPrice = document.getElementById("precioTotal")

// Almacenamiento local

document.addEventListener("DOMContentLoaded", () => {
  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || []
  cartRefresh()
})

function saveStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
}

// Recuperar productos

const productsRequest = async() => {
  const resp = await fetch("../data/data.json")
  const data = await resp.json()
  getProducts(data)
}
productsRequest()

// Creador de productos

function getProducts(products) {
  products.forEach((product) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = `
      <img src="${product.img}" class="card-img-top" alt="">
      <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <p>Categoria: ${product.category.name}</p>
        <p>$${product.price}</p>
        <button id="agregar${product.id}" class="btn btn-secondary">Agregar al carrito</button>
      </div>
      `
    container.appendChild(div)

    const button = document.getElementById(`agregar${product.id}`)

    button.addEventListener("click", () => {
      Swal.fire({
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 1000
      })
      addToCart(product.id)
    })
  })
  const addToCart = (prodId) => {
    const exist = shoppingCart.some((prod) => prod.id === prodId)
    if (exist) {
      const prod = shoppingCart.map(prod => {
        if (prod.id === prodId) {
          prod.quantity++
        }
      })
    } else {
      const item = products.find((prod) => prod.id === prodId)
      shoppingCart.push(item)
    }
    cartRefresh()
  }
}

// Actualicion de carrito

const deleteFromCart = (prodId) => {
  const item = shoppingCart.find((prod) => prod.id === prodId)
  const indice = shoppingCart.indexOf(item)
  shoppingCart.splice(indice, 1)
  cartRefresh()
}

function deleteCart() {
  shoppingCart = []
  cartRefresh()
}

emptyButton.addEventListener("click", () => {
  deleteCart()
})

function cartRefresh() {
  cartContainer.innerHTML = ""
  shoppingCart.forEach((prod) => {
    const div = document.createElement("div")
    div.className = ("productoEnCarrito")
    div.innerHTML = `
      <p>${prod.name}</p>
      <p>Precio:$${prod.price}</p>
      <p>Cantidad :${prod.quantity}</p>
      <button onclick="deleteFromCart(${prod.id})" class="btn btn-danger"><i class="bi bi-trash3"></i></button>
      `
    cartContainer.appendChild(div)
  })

  if (shoppingCart.length === 0) {
    cartContainer.innerHTML = `
    <p class="emptyCart">El carrito esta vacio</p>
    `
  }
  saveStorage()
  totalPrice.innerText = shoppingCart.reduce((ac, prod) => ac + prod.quantity * prod.price, 0)
}

// Continuar la compra

const finish = document.getElementById("comprar")

finish.addEventListener("click", () => {
  const spinner = document.getElementById("spinner")
  spinner.classList.add('d-flex')
  spinner.classList.remove('d-none')

  setTimeout(() => {
    spinner.classList.remove('d-flex')
    spinner.classList.add('d-none')
    checkOut()
  }, 2000)
})

function checkOut() {
  if (shoppingCart.length > 0) {
    Swal.fire({
      icon: 'success',
      title: 'Su compra fue exitosa!',
      showConfirmButton: false,
      timer: 2000
    })
    deleteCart()
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'No hay productos en su carrito',
      showConfirmButton: false,
      timer: 2000
    })
  }
}

