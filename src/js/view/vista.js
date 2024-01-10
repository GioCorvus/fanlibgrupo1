/**
 * Clase que representa una vista en la aplicación.
 */
export class Vista {
    /**
     * Enumeración de vistas disponibles.
     * @type {Object}
     * @readonly
     */
    static VISTA1 = Symbol("Inicio"); // Corregir el nombre
    static VISTA2 = Symbol("InsertarAutor");
    static VISTA3 = Symbol("ListarAutores");
    static VISTA4 = Symbol("ListarLibros");

    constructor(controlador, base) {
        this.controlador = controlador;
        this.base = base;
    }

    /**
     * Muestra u oculta la vista según el valor de 'ver'.
     * @param {boolean} ver - Valor booleano para mostrar u ocultar la vista.
     */
    mostrar(ver) {
        if (ver) {
            this.base.style.display = "block";
        } else {
            this.base.style.display = "none";
        }
    }
}