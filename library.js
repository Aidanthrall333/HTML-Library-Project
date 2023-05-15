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
        //fix
    }
    async delete(destination){
        //fix
    }    
}