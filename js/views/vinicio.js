import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

export class MenuInicial extends Vista {

  constructor(controlador, base) {
    super(controlador, base);
    this.restService = new Rest();
    this.librosData = []; // Property to store librosData

    this.irLibros = this.base.querySelectorAll('button')[0];
    this.irAutores = this.base.querySelectorAll('button')[1];

    this.irLibros.onclick = this.pulsarIrLibros.bind(this);
    this.irAutores.onclick = this.pulsarIrAutores.bind(this);

    this.firstTimeLoad = true;
    this.imagenPortada();
  }

  async imagenPortada() {
    const imageElement = document.createElement('img');
    imageElement.src = 'media/img/fanlibbg.jpg'; 
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    imageElement.style.position = 'fixed';
    imageElement.style.top = '0';
    imageElement.style.left = '0';
    imageElement.style.opacity = '1';
  
    document.body.appendChild(imageElement);
  
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    imageElement.style.transition = 'opacity 1s ease';
    imageElement.style.opacity = '0';
  
    setTimeout(() => {
      document.body.removeChild(imageElement);
    }, 1000);
  }

  async pulsarIrLibros() {
    try {
      this.librosData = await this.restService.getObra(); // Update librosData here
      console.log('Libros Data:', this.librosData);

      const galleryContainer = document.getElementById('librosGallery');
      galleryContainer.innerHTML = '';

      this.librosData.forEach((libro, index) => {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container');
        galleryContainer.appendChild(bookContainer);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        bookContainer.appendChild(imageContainer);

        if (libro['portada']) {
          const image = document.createElement('img');
          image.src = libro['portada'];
          image.alt = 'Libro Image';
          image.classList.add('libro-image');
          imageContainer.appendChild(image);
        }

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');
        bookContainer.appendChild(infoContainer);

        for (const key in libro) {
          if (!isNaN(key) || key === 'portada') {
            continue;
          }

          const infoRow = document.createElement('div');
          infoRow.classList.add('info-row');

          const label = document.createElement('div');
          label.classList.add('label');
          label.textContent = key;
          infoRow.appendChild(label);

          const value = document.createElement('div');
          value.classList.add('value');
          value.textContent = libro[key];
          infoRow.appendChild(value);

          infoContainer.appendChild(infoRow);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.setAttribute('data-id', libro.id); // Attach id as a data attribute
        infoContainer.appendChild(deleteButton);
  
        bookContainer.setAttribute('data-row-index', index + 1);
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

      const table = document.getElementById('autoresTable');
      table.innerHTML = '';

      const headerRow = table.insertRow(0);
      for (const key in autoresData[0]) {
        if (!isNaN(key)) {
          continue;
        }
        const headerCell = headerRow.insertCell();
        headerCell.textContent = key;
      }

      autoresData.forEach((autor, index) => {
        const row = table.insertRow(index + 1);
        for (const key in autor) {
          if (!isNaN(key)) {
            continue;
          }
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
