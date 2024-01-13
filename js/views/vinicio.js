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
      // Add a new header cell for the delete button
      const deleteHeaderCell = headerRow.insertCell();
      deleteHeaderCell.textContent = 'Delete';

      librosData.forEach((libro, index) => {
        const row = table.insertRow(index + 1);
        for (const key in libro) {
          const cell = row.insertCell();
          cell.textContent = libro[key];
        }

        // Add a new cell for the delete button in each row
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn'); // Add a class for easy identification
        deleteButton.setAttribute('data-row-index', index + 1); // Set a data attribute with the row index
        // deleteButton.addEventListener('click', () => this.handleDelete(index + 1)); // Handle delete directly
        deleteCell.appendChild(deleteButton);
      });

    } catch (error) {
      console.error('Error:', error);
    }

    this.controlador.verVista(Vista.vlistarlibros);
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