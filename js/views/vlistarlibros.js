import { Vista } from './vista.js'

export class ListarLibros extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.irAutores = this.base.querySelectorAll('button')[1]
    
  }


}