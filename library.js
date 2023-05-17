window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#searchButton").addEventListener("click", function () {
       // Get values from drop-downs
       const topic = document.getElementById("searchInput").value;
       // Get and display book
       newLibrary = new httpLibrary("https://jsonplaceholder.typicode.com/posts");
       newLibrary.get(topic);
    });
 });
class httpLibrary{
    constructor(baseURL){
        this.baseURL = baseURL;
    }
    async get(destination){
        try{
            const response = await fetch(this.baseURL);
            const data = await response.json();
            let html = '<ol>';
            for (let line of data) {
                if(line.title == destination){
                    html += '<li>' + line.title + '</li>' + '<li>' + line.body + '</li>';
                }
             }
             html += "</ol>";

            document.getElementById("booksDisplay").innerHTML = html;
            return data;
        } catch (error) {
            document.getElementById("booksDisplay").innerHTML = "Topic '" + destination + "' not found";
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