import { Vista } from './vista.js'



export class ListarLibros extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.irInicio = this.base.querySelectorAll('button')[1]
    
    this.irInicio.onclick = this.pulsarVolverInicio.bind(this)

  }

  pulsarVolverInicio(){
    this.controlador.verVista(Vista.vinicio)
  }

}