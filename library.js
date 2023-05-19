window.addEventListener("DOMContentLoaded", function () {
    newLibrary = new httpLibrary();
    document.querySelector("#searchButton").addEventListener("click", function () {
       // Get values from drop-downs
       const topic = document.getElementById("searchInput").value;
       // Get and display book
       newLibrary.get(topic)
       .then(responseData => ShowResponse(responseData))
       .catch(err => ShowError(err));
    });
 });

 window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#putButton").addEventListener("click", function () {
       const topic = document.getElementById("searchInput").value;
       newLibrary = new httpLibrary("https://jsonplaceholder.typicode.com/posts");
       newLibrary.put(topic);
    });
 });

class httpLibrary{
    constructor(baseURL){
        this.baseURL = baseURL;
    }
    async get(destination){
        const theRequest = new Promise((resolve,reject) => {
            const requestOption = {
                method: "GET",
                headers: {"content-type": "application\json"}
            }
            fetch(destination, requestOption)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error(response.status);
                }
            })
            .then(responseData => resolve(responseData))
            .catch(err => reject(err));
        })   
        return theRequest;
    }
    async post(destination, data){
        //fix
    }
    //(destination, data)
    async put(target){
        try{
            let response = await fetch(this.baseURL);
            let data = await response.json();

            let html = '<ul>';
            for(let line of data) {
                if(line.title === target) {
                    line.title = 'this is a test';
                    line.body = 'this is a test';
                    console.log(line);

                    html += '<li>' + line.userId + '</li>' + '<li>' + line.id + '</li>' 
                    + '<li>' + line.title + '</li>' + '<li>' + line.body + '</li>';
                }
            }
            html += '</ul>';
            
            document.getElementById("booksDisplay").innerHTML = html;
            return data;
        }
        catch(error) {
            document.getElementById("booksDisplay").innerHTML = "Topic '" + destination + "' not found";
            throw new Error(`PUT request failed to ${endpoint} failed`);
        }
    }
    async delete(destination){
        //fix
    }    
}
