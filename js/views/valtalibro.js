import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';
import { MenuInicial } from './vinicio.js'; // Import MenuInicial


export class AltaLibro extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.restService = new Rest();
        this.menuInicialObjeto = new MenuInicial(controlador, base);



        const buttons = this.base.querySelectorAll('button');
        this.agregarLibro = buttons[0];
        this.irInicio = buttons[1];

        this.agregarLibro.onclick = this.pulsarAgregarLibro.bind(this);
        this.irInicio.onclick = this.pulsarIrInicio.bind(this);
    }

    async pulsarAgregarLibro(event) {
        event.preventDefault();


        const tituloInput = this.base.querySelectorAll('input')[0];
        const titulo = tituloInput.value.trim();

        try {
            const obraData = await this.restService.crearObra({ titulo });
            console.log('Obra Added:', obraData);

            // Successfully added
            if (obraData) {
                // Reset 
                tituloInput.value = '';
                console.log('Work added successfully!');
                this.controlador.verVista(Vista.vlistarlibros);
            }

        } catch (error) {
            console.error('Error adding obra:', error);
            this.menuInicialObjeto.pulsarIrLibros();
        }
    }

    pulsarIrInicio() {
        console.log("asdasdasd")
        this.controlador.verVista(Vista.vinicio);
    }
}
