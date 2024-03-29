export class Vista {

    static {
      Vista.vinicio = Symbol('Inicio')
      Vista.vlistarautores = Symbol('Listar Autores')
      Vista.vlistarlibros = Symbol('Listar Libros')
      Vista.valtaautor = Symbol('Añadir nuevo autor')
      Vista.valtalibro = Symbol('Añadir nuevo libro')

    }
  
    constructor(controlador, base) {
      this.controlador = controlador
      this.base = base
    }
  
    mostrar(ver) {
      if (ver)
        this.base.style.display = 'block'
      else 
        this.base.style.display = 'none'
    }
  }