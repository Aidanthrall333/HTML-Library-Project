window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#searchButton").addEventListener("click", function () {
       // Get values from drop-downs
       const topic = document.getElementById("searchInput").value;
       // Get and display book
       newLibrary = new httpLibrary("https://jsonplaceholder.typicode.com/posts");
       newLibrary.get(topic);
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