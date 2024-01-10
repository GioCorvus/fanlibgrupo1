import { Vista } from "./vista.js";

export class Inicio extends Vista {
    constructor(controlador, contenedor) {
        super(controlador, contenedor);

        // Crear Botones
        const botonLibro = contenedor.querySelector('#irLibros');
        const botonAutor = contenedor.querySelector('#irAutores');

        botonLibro.onclick = () => {
            this.controlador.irAVista(Vista.vistaListarLibros);
        }

        botonAutor.onclick = () => {
            this.controlador.irAVista(Vista.vistaListarAutores);
        }
    }
}
