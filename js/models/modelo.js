import { Rest } from "../service/rest.js";

export class Modelo {
    constructor() {
        this.datos = new Rest()
    }

    async cogerAutores(){
        const autores = this.datos.getAutor()
        
        if (autores) {
            console.log(autores)
            return autores
        }else{
            console.log("Fallo al recoger los autores")
            return null
        }
    }

}
