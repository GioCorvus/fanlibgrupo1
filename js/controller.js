import {Vista} from './views/vista.js'
import {MenuInicial} from './views/vinicio.js'  //SERGIO
import {ListarAutores} from './views/vlistarautores.js'  //SERGIO
import {ListarLibros} from './views/vlistarlibros.js'  //SERGIO
import {AltaAutor} from './views/valtaautor.js'
import {AltaLibro} from './views/valtalibro.js'



class Controlador {

    vistas = new Map();

    constructor(){
        //inicia objeto rest

        //referencia de la interfaz
        const divInicio = document.getElementById('divInicio')
        const divListarLibros = document.getElementById('divListarLibros')
        const divListarAutores = document.getElementById('divListarAutores')
        const divInsertarAutores = document.getElementById('divInsertarAutores')
        const divInsertarLibros = document.getElementById('divInsertarLibros')
    
        //creacion de las vistas
        this.vistas.set(Vista.vinicio, new MenuInicial(this, divInicio))
        this.vistas.set(Vista.vlistarautores, new ListarAutores(this, divListarAutores))
        this.vistas.set(Vista.vlistarlibros, new ListarLibros(this, divListarLibros))
        this.vistas.set(Vista.valtaautor, new AltaAutor(this, divInsertarAutores))
        this.vistas.set(Vista.valtalibro, new AltaLibro(this, divInsertarLibros))
        
        this.verVista(Vista.vinicio)
    }

    verVista (vista) {
        this.ocultarVistas()
        this.vistas.get(vista).mostrar(true)
    }

    ocultarVistas(){
		for(const vista of this.vistas.values())
			vista.mostrar(false)
	}

    //AJAX



}

window.onload = () => {new Controlador()}