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
        try{
            const deleteMethod = {
            method: 'DELETE',
            headers: {"content-type": "application/json"}
            }
            let response = await fetch(destination, deleteMethod);
            return response;
        }
        catch(exception){
            console.log(exception.toString());
        }
    }    
}

const newLibrary = new httpLibrary();
window.addEventListener('DOMContentLoaded', async () => {
    try {
      document.getElementById('searchButton').addEventListener('click', async (event) => {
        event.preventDefault();
        // Get values from drop-downs
        const topic = document.getElementById('searchInput').value;
        // Get and display book
        try {
          const responseData = await newLibrary.get(topic);
          ShowResponse(responseData);
        } catch (err) {
          ShowError(err);
        }
      });
  
      document.getElementById('deleteButton').addEventListener('click', async (event) => {
        event.preventDefault();
        // Get values from drop-downs
        const topic = document.getElementById('searchInput').value;
        // Get and display book
        try {
          const responseData = await newLibrary.delete(topic);
          ProcessDelete(responseData);
        } catch (err) {
          ProcessDelete(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

function ProcessDelete(res){
    if(res.ok){
        let output;
        output = "<ul style=\"list-style:none\">";
        output += `<li> Object Deleted</li>`;
        output += "</ul>";
        document.getElementById("booksDisplay").innerHTML = output;
    }
    else{
        document.getElementById("booksDisplay").innerHTML = "Error In Deletion";
    }
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
