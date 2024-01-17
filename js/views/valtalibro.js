import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';
import { MenuInicial } from './vinicio.js'; // Import MenuInicial


export class AltaLibro extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.restService = new Rest();
        this.menuInicialObjeto = new MenuInicial(controlador, base);



        const buttons = this.base.querySelectorAll('button');
        this.agregarLibro = buttons[0];
        this.irInicio = buttons[1];

        this.agregarLibro.onclick = this.pulsarAgregarLibro.bind(this);
        this.irInicio.onclick = this.pulsarIrInicio.bind(this);

        //traerse autores
        this.desplegable();

    }

    async pulsarAgregarLibro(event) {
        event.preventDefault();
    
        const inputFile = document.getElementsByName('portada')[0].files[0];
        
        // Verifica si se ha seleccionado un archivo
        if (inputFile) {
          // Convierte la imagen a Base64
          const base64Image = await this.getBase64FromImage(inputFile);
        
          const libroData = {
            titulo: document.getElementsByName('tituloLibro')[0].value,
            id_autor: parseInt(document.getElementsByName('autor')[0].value),
            fecha_publicacion: document.getElementsByName('fecha_publicacion')[0].value,
            reseña: document.getElementsByName('reseña')[0].value,
            portada: base64Image, // Guarda la imagen en Base64
            genero: document.getElementsByName('genero')[0].value,
          };
          await this.restService.crearObra(libroData);
          this.menuInicialObjeto.pulsarIrLibros();

        } else {
          console.error('Por favor, selecciona una imagen');
        }
        
      }

      getBase64FromImage(inputFile) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          
          reader.onload = (event) => {
            resolve(event.target.result);
          };
      
          reader.onerror = (error) => {
            reject(error);
          };
      
          reader.readAsDataURL(inputFile);
        });
      }

    async desplegable() {
        const desplegableAutores = document.getElementsByName('autor')[0];
        const autores = await this.restService.getAutor();
    
        autores.forEach((autor) => {
          const option = document.createElement('option');
          option.value = autor.id;
          option.text = autor.nombre;
          desplegableAutores.add(option);
        });
      }



    pulsarIrInicio() {
        console.log("asdasdasd")
        this.controlador.verVista(Vista.vinicio);
    }

}
