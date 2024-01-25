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
    this.menuInicialObjeto = new MenuInicial(controlador, base, this);

    this.altaLibro.onclick = this.pulsarAltaLibro.bind(this);
    this.irInicio.onclick = this.pulsarVolverInicio.bind(this);


    this.base.addEventListener('click', (event) => this.handleDeleteButtonClick(event));
    this.base.addEventListener('click', (event) => this.handleFavButtonClick(event))

  }

  async handleDeleteButtonClick(event) {
    const target = event.target;
  
    // Check if the clicked element or its parent has the 'delete-btn' class
    const deleteButton = target.closest('.delete-btn');
    if (deleteButton) {
      const id = deleteButton.getAttribute('data-id');
  
      if (!id) {
        console.error('Unable to determine ID.');
        return;
      }
  
      try {
        const result = await this.restService.borrarObra([id]); // or borrarAutor for authors
        if (result) {
          console.log(`Item with ID ${id} deleted successfully.`);
          console.log("wololo bueno");
          // Reload or update the gallery after deletion
          this.menuInicialObjeto.pulsarIrLibros();
        } else {
          console.error(`Failed to delete item with ID ${id}.`);
          console.log("wololo no se ha borrado");
        }
      } catch (error) {
        console.error('Error:', error);
        console.log("wololo error");
      }
    }
}

async handleFavButtonClick(event) {
  const target = event.target;

  // Check if the clicked element or its parent has the 'fav-button' class
  const favButton = target.closest('.fav-button');
  if (favButton) {
    const id = favButton.getAttribute('data-id');

    if (!id) {
      console.error('Unable to determine ID.');
      return;
    }

    const isFav = favButton.classList.contains('favorito');

    try {
      if (isFav) {
        // Remove from favorites (delete the cookie)
        this.removeFavorite(id);
        console.log(`Removed book with ID ${id} from favorites.`);
      } else {
        // Add to favorites (set a cookie)
        this.addFavorite(id);
        console.log(`Added book with ID ${id} to favorites.`);
      }

      // Toggle the 'favorito' class to update the button style
      favButton.classList.toggle('favorito');

      // Update the favorite icon image source dynamically
      const favoriteIcon = favButton.querySelector('.fav-icon');
      if (favoriteIcon) {
        favoriteIcon.src = isFav ? 'media/img/favempty.png' : 'media/img/favfull.png';
        favoriteIcon.alt = isFav ? 'Empty Favorite Icon' : 'Full Favorite Icon';
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
}

  addFavorite(id) {
    // Implement the logic to add the book to favorites (set a cookie, for example)
    // You can use document.cookie or a library like js-cookie for easier handling
    // Example using document.cookie:
    document.cookie = `favorite_${id}=true; expires=Wed, 01 Jan 2025 00:00:00 UTC; path=/;`;
  }

  removeFavorite(id) {
    // Implement the logic to remove the book from favorites (delete the cookie)
    // Example using document.cookie:
    document.cookie = `favorite_${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }


  

  async pulsarAltaLibro() {
    this.controlador.verVista(Vista.valtalibro);
  }

  async pulsarVolverInicio() {
    this.controlador.verVista(Vista.vinicio);
  }
}
