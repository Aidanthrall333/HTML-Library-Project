class httpLibrary{
    async get(destination){
        let response = await fetch(destination);
        let books = await response.json();
        return books;
    }
    async post(destination, data){
        //fix
    }
    async put(target){
        try{
            const putMethod = {
                method: 'PUT',
                headers: {"content-type": "application/json"},
                body: JSON.stringify(putData)
            }
            let response = await fetch(target, putMethod);
            return response;
        }
        catch(exception){
            console.log(exception.toString());
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

//CHANGE THIS TO TEST PUT DATA
const putData = {
    title: 'this is a test',
    body: 'this is a test'
}
//CHANGE THIS TO TEST PUT DATA

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

      document.getElementById('putButton').addEventListener('click', async (event) => {
        event.preventDefault();
        // Get values from drop-downs
        const topic = document.getElementById('searchInput').value;
        // Get and put book
        try {
          const responseData = await newLibrary.put(topic);
          ProcessPut(responseData);
        } catch (err) {
          ProcessPut(err);
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

function ProcessPut(response){
    if(response.ok) {
        let output = '<h1>Object Put</h1>';
        document.getElementById("booksDisplay").innerHTML = output;
    }
    else{
        document.getElementById("booksDisplay").innerHTML = "Error In Putting";
    }
}
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
