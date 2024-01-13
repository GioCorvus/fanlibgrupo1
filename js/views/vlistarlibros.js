import { Vista } from './vista.js'
import { Rest } from '../service/rest.js';

export class ListarLibros extends Vista {

  constructor(controlador, base) {
    super(controlador, base);

    this.altaLibro = this.base.querySelectorAll('button')[0];
    this.irInicio = this.base.querySelectorAll('button')[1];

    // Create an instance of RestService
    this.restService = new Rest();

    this.altaLibro.onclick = this.pulsarAltaLibro.bind(this);
    this.irInicio.onclick = this.pulsarVolverInicio.bind(this);

    this.base.addEventListener('click', this.handleDeleteButtonClick.bind(this));
  }

  async handleDeleteButtonClick(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
      const rowIndex = target.getAttribute('data-row-index');
      const librosTable = document.getElementById('librosTable');
      const id = librosTable.rows[rowIndex].cells[0].textContent; // Assuming the ID is in the first cell

      try {
        const result = await this.restService.borrarObra(id);
        if (result) {
          console.log(`Book with ID ${id} deleted successfully.`);
          // Refresh the book list after deletion
          this.pulsarIrLibros();
        } else {
          console.error(`Failed to delete book with ID ${id}.`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  pulsarAltaLibro(){
    this.controlador.verVista(Vista.valtalibro)
  }

  pulsarVolverInicio(){
    this.controlador.verVista(Vista.vinicio)
  }

}