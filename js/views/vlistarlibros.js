// listarlibros.js

import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';
import { MenuInicial } from './vinicio.js';

export class ListarLibros extends Vista {
  constructor(controlador, base) {
    super(controlador, base);

    this.altaLibro = this.base.querySelectorAll('button')[0];
    this.irInicio = this.base.querySelectorAll('button')[1];

    this.restService = new Rest();
    this.menuInicialObjeto = new MenuInicial(controlador, base);

    this.altaLibro.onclick = this.pulsarAltaLibro.bind(this);
    this.irInicio.onclick = this.pulsarVolverInicio.bind(this);

    this.base.addEventListener('click', (event) => this.handleDeleteButtonClick(event));

    // No need to fetch data here; it will be handled by MenuInicial
  }

  async handleDeleteButtonClick(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
      const id = target.getAttribute('data-id');
  
      if (!id) {
        console.error('Unable to determine book ID.');
        return;
      }
  
      try {
        const result = await this.restService.borrarObra(id);
        if (result) {
          console.log(`Book with ID ${id} deleted successfully.`);
          console.log("wololo bueno");
          // Reload or update the book gallery after deletion
          this.menuInicialObjeto.pulsarIrLibros();
        } else {
          console.error(`Failed to delete book with ID ${id}.`);
          console.log("wololo no se ha borrado");
        }
      } catch (error) {
        console.error('Error:', error);
        console.log("wololo error");
      }
    }
  }
  
  

  async pulsarAltaLibro() {
    this.controlador.verVista(Vista.valtalibro);
  }

  async pulsarVolverInicio() {
    this.controlador.verVista(Vista.vinicio);
  }
}
