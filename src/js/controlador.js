import { Vista1 } from "./vistas/vista1.js";
import { Vista2 } from "./vistas/vista2.js";
import { Vista3 } from "./vistas/vista3.js";
import { Vista4 } from "./vistas/vista4.js";

/**
 * Controlador principal que gestiona las diferentes vistas y la interacción entre ellas.
 */
class Controlador {
    constructor() {

        // Obtener los contenedores de las vistas
        const Inicio = document.getElementById("Inicio");
        const VistaInsertarAutor = document.getElementById("VistaInsertarAutor");
        const VistaListarAutores = document.getElementById("VistaListarAutores");
        const VistaListarLibros = document.getElementById("VistaListarLibros");

        // Crear instancias de las vistas y asignarlas a los contenedores correspondientes
        this.view.set(Vista1, new Vista1(this, Inicio));
        this.view.set(Vista2, new Vista2(this, VistaInsertarAutor));
        this.view.set(Vista3, new Vista3(this, VistaListarAutores));
        this.view.set(Vista4, new Vista4(this, VistaListarLibros));

        // Mostrar la primera vista al cargar la página
        this.verVista(Vista1); 
    }
    
    verVista(vista) {
        this.ocultarVistas();
        this.vistas.get(vista).mostrar(true);
    }

    // Oculta todas las vistas
    
    ocultarVistas() {
    for (let vista of this.vistas.values()) {
        vista.mostrar(false);
    }
}

// Inicializar el controlador al cargar la página
window.onload = () => {
    new Controlador();
};

