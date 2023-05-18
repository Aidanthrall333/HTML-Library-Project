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
        const deleteMethod = {
            method: 'DELETE',
            headers: {"content-type": "application/json"}
        };
        fetch(destination, deleteMethod)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error(response.status);
            }
        })   
    }    
}

const newLibrary = new httpLibrary;
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", function () { // Get handler
       // Get values from drop-downs
       const topic = document.getElementById("searchInput").value;
       // Get and display book
       newLibrary.get(topic)
       .then(responseData => ShowResponse(responseData))
       .catch(err => ShowError(err));
       
    });
    document.getElementById("deleteButton").addEventListener("click", function () { // Delete Handler
        // Get values from drop-downs
        const topic = document.getElementById("searchInput").value;
        // Get and display book
        newLibrary.get(topic)
       .then(responseData => ShowResponse(responseData))
       .catch(err => ShowError(err));
        newLibrary.delete(topic, ProcessDelete);
     });
 });

function ProcessDelete(err, res){
    let output;
    if (err) {
        output = `<p>${err}</p>`;
    }
    else{
        output = "<ul style=\"list-style:none\">";
        output += `<li> ${res}</li>`;
        output += "</ul>";
    }
    document.getElementById("booksDisplay").innerHTML = output;
}
function ShowResponse(responseData){
    let html = "<ol style = 'list-style:none'/>";
    if(Array.isArray(responseData)){
        responseData.forEach(book => {
            html += `<li>${book.id}. ${book.title}  -  ${book.body}</li>`;
        })
    }
    else{
        html += `<li>${responseData.id}. ${responseData.title}  -  ${responseData.body}</li>`
    }
    document.getElementById("booksDisplay").innerHTML = html;
}
