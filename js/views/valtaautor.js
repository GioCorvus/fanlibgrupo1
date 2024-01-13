import { Vista } from './vista.js'

export class AltaAutor extends Vista {

  constructor (controlador, base) {
    super(controlador, base)


    this.irInicio = this.base.querySelectorAll('button')[0]
    
    this.irInicio.onclick = this.pulsarVolverInicio.bind(this)

  }

  pulsarVolverInicio(){
    this.controlador.verVista(Vista.vinicio)
  }
  
}