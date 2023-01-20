class Category {
    constructor(id = 0, name = "No definido") {
      this.id = id
      this.name = name
    }
  
    toString() {
      return this.name
    }
  }
  
let keyboardCategory = new Category(1, "Teclados")
let displayCategory = new Category(2, "Pantallas")
let accessoriesCategory = new Category(3, "Accesorios")
let soundCategory = new Category(4, "Sonido")