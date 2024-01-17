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

    // flag para imagen portada
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
  
    // Append the image to the body
    document.body.appendChild(imageElement);
  
    // Wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    // Fade out smoothly
    imageElement.style.transition = 'opacity 1s ease'; // CSS transition for opacity
    imageElement.style.opacity = '0';
  
    // Remove the image after the transition
    setTimeout(() => {
      document.body.removeChild(imageElement);
    }, 1000); // Delay the removal to match the transition duration
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
        if (!isNaN(key)) {
          // saltar los headers que por algun motivo son numeros
          continue;
        }
        const headerCell = headerRow.insertCell();
        headerCell.textContent = key;
      }
      //  for the image delete

      const deleteHeaderCell = headerRow.insertCell();
      deleteHeaderCell.textContent = 'Delete';
  
      librosData.forEach((libro, index) => {
        const row = table.insertRow(index + 1);
        for (const key in libro) {
          if (!isNaN(key)) {
            //  numeric keys
            continue;
          }
          if (key === 'portada') {

            const imageCell = row.insertCell();
            if (libro[key]) {
              const image = document.createElement('img');
              image.src = libro[key];
              image.alt = 'Libro Image';
              image.classList.add('libro-image'); 
              imageCell.appendChild(image);
            } else {

              row.insertCell();

            }
          } else {

            const cell = row.insertCell();
            cell.textContent = libro[key];
          }
        }
      
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.setAttribute('data-row-index', index + 1);
        deleteButton.addEventListener('click', () => this.handleDelete(index + 1));
        deleteCell.appendChild(deleteButton);
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
  
    this.controlador.verVista(Vista.vlistarlibros);
  }

  async getAuthorName(authorId) {
    try {
        const autoresData = await this.restService.getAutor();
        const author = autoresData.find(autor => autor.id === authorId);
        return author ? author.nombre : 'Unknown Author';
    } catch (error) {
        console.error('Error fetching author data:', error);
        return 'Unknown Author';
    }
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