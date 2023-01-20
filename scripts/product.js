class Product {
  constructor(id = 0, name = "No definido", price = 0, category = null, quantity = 1, img = null) {
    this.id = id
    this.name = name
    this.price = price
    this.category = category
    this.quantity = quantity
    this.img = img
  }

  toString() {
    return this.name
  }
}