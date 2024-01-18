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

        this.setupImagePreview();


        //traerse autores
        this.desplegable();

    }

    setupImagePreview() {
        const inputFile = document.getElementsByName('portada')[0];
        const imagePreview = document.getElementById('imagePreview');

        inputFile.addEventListener('change', async () => {
            const file = inputFile.files[0];

            if (file) {
                const base64Image = await this.getBase64FromImage(file);
                imagePreview.src = base64Image;
                imagePreview.style.display = 'block';
            } else {
                imagePreview.src = '';
                imagePreview.style.display = 'none';
            }
        });
    }

    async pulsarAgregarLibro(event) {
        event.preventDefault();
    
        const inputFile = document.getElementsByName('portada')[0].files[0];
    
        //si se ha seleccionado un archivo...
        if (inputFile) {
            //base64 para poder ser subida
            const base64Image = await this.getBase64FromImage(inputFile);
    
            const libroData = {
                titulo: document.getElementsByName('tituloLibro')[0].value,
                id_autor: parseInt(document.getElementsByName('autor')[0].value),
                fecha_publicacion: document.getElementsByName('fecha_publicacion')[0].value,
                reseña: document.getElementsByName('reseña')[0].value,
                portada: base64Image,
                genero: document.getElementsByName('genero')[0].value,
            };
    
            await this.restService.crearObra(libroData);
            this.menuInicialObjeto.pulsarIrLibros();
            document.getElementById('altaLibroForm').reset();
        } else {
            console.error('BIP BOP, IMAGEN OBLIGATORIA');
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
