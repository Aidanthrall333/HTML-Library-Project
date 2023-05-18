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
function ShowResponse(responseData){
    let html = "<ol style = 'list-style:none'/>";
    if(Array.isArray(responseData)){
        responseData.forEach(book => {
            html += `<li>${book.id}. ${book.title}  -  ${book.body}</li>`;
        })
    }
    else{
        html += `<li>User ${responseData.id} -  ${responseData.body}</li>`
    }
    document.getElementById("booksDisplay").innerHTML = html;
}
class httpLibrary{
    async get(destination){
        let response = await fetch(destination);
        let books = await response.json();
        return books;
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
