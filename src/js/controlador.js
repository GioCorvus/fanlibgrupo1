import { Vista } from "./view/vista.js";
//import { Vista1 } from "./view/vistaPortada.js";
import { Inicio } from "./view/vistaInicio.js";
import { ListarLibros } from "./view/vistaListarLibros.js";
import { InsertarLibros } from "./view/vistaInsertarLibros.js";
import { ListarAutores } from "./view/vistaListarAutores.js";
import { InsertarAutores } from "./view/vistaInsertarAutores.js";

/**
 * Controlador principal que gestiona las diferentes vistas y la interacción entre ellas.
 */
class Controlador {
    constructor() {
        this.vistas = new Map();
        //this.modelo = new Modelo();

        // Obtener los contenedores de las vistas
        const divvistaInicio = document.getElementById("VistaInicio")
        const divvistaListarLibros = document.getElementById("VistaListarLibros")
        const divvistaInsertarLibros = document.getElementById("VistaInsertarLibros")
        const divvistaListarAutores = document.getElementById("VistaListarAutores")
        const divvistaInsertarAutores = document.getElementById("VistaInsertarAutores")

        // Crear instancias de las vistas y asignarlas a los contenedores correspondientes
        
        this.vistas.set(Vista.vistaInicio, new Inicio(this, divvistaInicio));
        this.vistas.set(Vista.vistaListarLibros, new ListarLibros(this, divvistaListarLibros));
        this.vistas.set(Vista.vistaInsertarLibros, new InsertarLibros(this, divvistaInsertarLibros));
        this.vistas.set(Vista.vistaListarAutores, new ListarAutores(this, divvistaListarAutores));
        this.vistas.set(Vista.vistaInsertarAutores, new InsertarAutores(this, divvistaInsertarAutores));

        // Mostrar la primera vista al cargar la página
        this.irAVista(Vista.vistaInicio);
    }
    
    irAVista(vista) {
        this.ocultarVistas();
        this.vistas.get(vista).mostrar(true);
    }

    /**
     * Oculta todas las vistas.
     */
    ocultarVistas() {
        for (let vista of this.vistas.values()) {
            vista.mostrar(false);
        }
    }
}

// Inicializar el controlador al cargar la página
window.onload = () => {new Controlador()}