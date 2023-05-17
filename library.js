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
        let response = await fetch(destination, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data)
            }
        );

        if(response.ok) {
            let result = await response.json();
            return result;
        }
        else {
            throw new Error(response.status);
        }
    }
    async delete(destination){
        //fix
    }    
}