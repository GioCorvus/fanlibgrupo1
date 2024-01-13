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
        console.log('Libros Data:', librosData);

        // se limpia el contenido actual
        const table = document.getElementById('librosTable');
        table.innerHTML = '';

        // se crea el header de la tabla
        const headerRow = table.insertRow(0);
        for (const key in librosData[0]) {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = key;
        }

        // generación dinámica del dom
        librosData.forEach((libro, index) => {
            const row = table.insertRow(index + 1);
            for (const key in libro) {
                const cell = row.insertCell();
                cell.textContent = libro[key];
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }

    this.controlador.verVista(Vista.vlistarlibros)
}

async pulsarIrAutores() {
  try {
      const autoresData = await this.restService.getAutor();
      console.log('Autores Data:', autoresData);

      // se limpia el contenido actual
      const table = document.getElementById('autoresTable');
      table.innerHTML = '';

      // se crea el header de la tabla
      const headerRow = table.insertRow(0);
      for (const key in autoresData[0]) {
          const headerCell = headerRow.insertCell();
          headerCell.textContent = key;
      }

      // generación dinámica del dom
      autoresData.forEach((autor, index) => {
          const row = table.insertRow(index + 1);
          for (const key in autor) {
              const cell = row.insertCell();
              cell.textContent = autor[key];
          }
      });

  } catch (error) {
      console.error('Error:', error);
  }

  this.controlador.verVista(Vista.vlistarautores);
}


}