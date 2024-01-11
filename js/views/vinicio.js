import { Vista } from './vista.js'
import { Rest } from '../service/rest.js';

export class MenuInicial extends Vista {

  constructor (controlador, base) {
    super(controlador, base)
    this.restService = new Rest();


    // Coger referencias del interfaz
    this.irLibros = this.base.querySelectorAll('button')[0]
    this.irAutores = this.base.querySelectorAll('button')[1]


    // Asociar eventos
    this.irLibros.onclick = this.pulsarIrLibros.bind(this)
    this.irAutores.onclick =  this.pulsarIrAutores.bind(this)

  }


  async pulsarIrLibros() {

      try {
          const librosData = await this.restService.getObra(); 
          //ver libros
          console.log('Libros Data:', librosData);
      } catch (error) {
          console.error('Error:', error);
      }

      // cambio la vista tras hacer la solicitud
      this.controlador.verVista(Vista.vlistarlibros);
  }

  pulsarIrAutores () {
    this.controlador.verVista(Vista.vlistarautores)
  }


}