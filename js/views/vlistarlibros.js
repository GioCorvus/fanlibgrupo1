import { Vista } from './vista.js'



export class ListarLibros extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.altaLibro = this.base.querySelectorAll('button')[0]
    this.irInicio = this.base.querySelectorAll('button')[1]
    
    this.altaLibro.onclick = this.pulsarAltaLibro.bind(this)
    this.irInicio.onclick = this.pulsarVolverInicio.bind(this)

  }

  pulsarAltaLibro(){
    this.controlador.verVista(Vista.valtalibro)
  }

  pulsarVolverInicio(){
    this.controlador.verVista(Vista.vinicio)
  }

}