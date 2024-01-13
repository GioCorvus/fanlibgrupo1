export class Rest {
    constructor() {
        this.baseUrl = 'https://migueljaque.com/fanlib/v1';
        this.token = 'testToken';
        this.headers = {
            'Fanlibtoken': this.token,
            'Content-Type': 'application/json'
        };
    }
    /* OBRA */

    async getObra() {
        try {
            const url = `${this.baseUrl}/obra`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
    
            const data = await response.json(); 
            
            console.log('Data received from server:', data);
    
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async crearObra(obraData) {
        try {
            const url = `${this.baseUrl}/obra`;
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(obraData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    /* AUTOR */
    async getAutor() {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json(); 
            
        console.log('Data received from server:', data);

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
    }

    async getAutorPorId(id) {
        try {
            const url = `${this.baseUrl}/autor/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async crearAutor(autorData) {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(autorData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async actualizarAutor(autorData) {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(autorData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async borrarAutor(id) {
        try {
            const url = `${this.baseUrl}/autor/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    handleResponse(response) {
        // Implement your response handling logic here
    }
}
