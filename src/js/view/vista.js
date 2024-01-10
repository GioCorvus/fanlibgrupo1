export class Vista {
    static {
        //Vista.vistaPortada = Symbol('Portada')
        Vista.vistaInicio = Symbol('Inicio')
        Vista.vistaListarLibros = Symbol('Listar libros')
        Vista.vistaInsertarLibros = Symbol('Insertar libros')
        Vista.vistaListarAutores = Symbol('Listar autores')
        Vista.vistaInsertarAutores = Symbol('Insertar autores')
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