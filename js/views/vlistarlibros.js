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
    fetch('https://migueljaque.com/fanlib/v1/autor', {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Fanlibtoken': 'testToken'
    }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error en la petición Fetch:', error));
  }

  pulsarIrInsertarLibros() {
    this.controlador.verVista(Vista.vInsertarLibros);
  }

  pulsarIrInicio() {
      this.controlador.verVista(Vista.vInicio);
  }
}