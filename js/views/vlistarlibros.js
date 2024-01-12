import { Vista } from './vista.js';

export class ListarLibros extends Vista {

  constructor(controlador, base) {
    super(controlador, base);

      this.anadirLibro = this.base.querySelectorAll('button')[0];
      this.volverInicio = this.base.querySelectorAll('button')[1];

      this.anadirLibro.onclick = this.pulsarIrInsertarLibros.bind(this);
      this.volverInicio.onclick = this.pulsarIrInicio.bind(this);

       
      this.obtenerListadoLibros();
  }

  obtenerListadoLibros() {
    fetch('https://migueljaque.com/fanlib/v1', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Fanlibtoken': 'testToken'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición Fetch');
        }
        return response.json();
    })
    .then(data => {
        console.log('Listado de Libros:', data);
    })
    .catch(error => {
        console.error('Error en la petición Fetch:', errowlr);
    });
  }

  pulsarIrInsertarLibros() {
    this.controlador.verVista(Vista.vInsertarLibros);
  }

  pulsarIrInicio() {
      this.controlador.verVista(Vista.vInicio);
  }
}