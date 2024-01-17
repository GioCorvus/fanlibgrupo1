import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

export class ListarAutores extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.restService = new Rest();

        // referencia
        const buttons = this.base.querySelectorAll('button');
        this.aniadirAutor = buttons[0];
        this.volverInicio = buttons[1];

        // eventos
        this.aniadirAutor.onclick = this.pulsarAniadirAutor.bind(this);
        this.volverInicio.onclick = this.pulsarVolverInicio.bind(this);
    }

    pulsarAniadirAutor() {
        // logic
        console.log('Añadir Autor button clicked');
    }

    pulsarVolverInicio() {
        this.controlador.verVista(Vista.vinicio);
    }
}
