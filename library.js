class httpLibrary{
    constructor(baseURL){
        this.baseURL = baseURL;
    }
    async get(destination){
        try{
            const response = await fetch(`${this.baseURL}${destination}`)
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`GET request failed to ${endpoint} failed`);
        }
    }
    async post(destination, data){
        //fix
    }
    async put(destination, data){
        try {
            let response = await fetch(destination, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(data)
                }
            );

            let result = await response.json();
            return result;
        }
        catch(error) {
            throw new Error(`PUT request failed to ${endpoint} failed`);
        }
    }
    async delete(destination){
        //fix
    }    
}