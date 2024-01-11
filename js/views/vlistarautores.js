import { Vista } from './vista.js'
import { Modelo } from "../models/modelo.js";

export class ListarAutores extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    //Referencia del interfaz
    this.aniadirAutor = this.base.querySelectorAll('button')[0]
    this.volverInicio = this.base.querySelectorAll('button')[1]

    //Asociamos los eventos a los botones
    this.aniadirAutor.onclick = this.pulsarNuevoAutor.bind(this)
    this.volverInicio.onclick = this.pulsarVolverInicio.bind(this)

    this.datos = new Modelo()
    this.mostrarAutores()
  }

  pulsarNuevoAutor(){
    this.controlador.verVista(Vista.valtaautor)
  }

  pulsarVolverInicio(){
    this.controlador.verVista(Vista.vinicio)
  }

  async mostrarAutores() {
    const autores = await this.datos.cogerAutores();

    if (autores) {
        const divListarAutor = document.getElementById('divListarAutor');
        divListarAutor.innerHTML = ''; // Limpiamos el contenido actual

        autores.forEach((autor) => {
            const autoresDiv = document.createElement('div')
            autoresDiv.textContent = `Nombre: ${autor.nombre}, Fecha Nacimiento: ${autor.fecha_nacimiento}, Fecha Muerte: ${autor.fecha_muerte}, Nacionalidad: ${autor.nacionalidad}, Foto: ${autor.foto}`
            divListarAutor.appendChild(autoresDiv)
        })
    } else {
        console.log('No se pudo obtener la lista de Autores');
    }
}



}