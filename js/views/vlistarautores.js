import { Vista } from './vista.js'


export class ListarAutores extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    //Referencia del interfaz
    this.aniadirAutor = this.base.querySelectorAll('button')[0]
    this.volverInicio = this.base.querySelectorAll('button')[1]

    //Asociamos los eventos a los botones
    this.aniadirAutor.onclick = this.pulsarNuevoAutor.bind(this)
    this.volverInicio.onclick = this.pulsarVolverInicio.bind(this)
  }

  pulsarNuevoAutor(){
    this.controlador.verVista(Vista.valtaautor)
  }

  pulsarVolverInicio(){
    this.controlador.verVista(Vista.vinicio)
  }
}