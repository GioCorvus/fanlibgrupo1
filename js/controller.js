import {Vista} from './views/vista.js'
import {MenuInicial} from './views/vinicio.js'  //SERGIO
import {ListarAutores} from './views/vlistarautores.js'  //SERGIO
import {ListarLibros} from './views/vlistarlibros.js'  //SERGIO
import {InsertarLibros} from './views/vInsertarLibros.js'  //LEANDRO

class Controlador {

    vistas = new Map();

    constructor(){
        //referencia de la interfaz
        const divInicio = document.getElementById('divInicio')
        const divListarLibros = document.getElementById('divListarLibros')
        const divListarAutores = document.getElementById('divListarAutores')
        const divInsertarLibros = document.getElementById('divInsertarLibros')
    
        //creacion de las vistas
        this.vistas.set(Vista.vinicio, new MenuInicial(this, divInicio))
        this.vistas.set(Vista.vlistarautores, new ListarAutores(this, divListarAutores))
        this.vistas.set(Vista.vlistarlibros, new ListarLibros(this, divListarLibros))
        this.vistas.set(Vista.vInsertarLibros, new InsertarLibros(this, divInsertarLibros))
        
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

}
window.onload = () => {new Controlador()}