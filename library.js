class httpLibrary{
    async get(destination){
        try{
            let response = await fetch(destination);
            let books = await response.json();
            if(response.ok){
                return books;
            }
            else{
                document.getElementById("booksDisplay").innerHTML = "Error In Getting Data";
            }
        }
        catch(error){
            console.log(error.toString());
        }
        
    }
    async post(destination, data){
        try {
            const postMethod = {
                method: 'POST',
                headers : {"content-type" : "application/json"},
                body: JSON.stringify(data)
            }
            let response = await fetch(destination, postMethod);
            let postData = await response.json();
            console.log(postData);
            return response;
        }
        catch(exception) {
            console.log(exception.toString());
        }
    }
    async put(target, putData){
        try{
            const putMethod = {
                method: 'PUT',
                headers: {"content-type": "application/json"},
                body: JSON.stringify(putData)
            }
            let response = await fetch(target, putMethod);
            //CONSOLE LOGGING PURPOSES
            let data = await response.json();
            console.log(data);
            //CONSOLE LOGGING PURPOSES
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
window.addEventListener('DOMContentLoaded', async () => {
    /* Get Handler */
      document.getElementById('searchButton').addEventListener('click', async (event) => {
        event.preventDefault();
        // Get values from drop-downs
        const topic = document.getElementById('searchInput').value;
        // Get and display book
        try {
          const responseData = await newLibrary.get(topic);
          ShowResponse(responseData);
        } catch {
            document.getElementById("booksDisplay").innerHTML = "Error In Getting Data";
        }
      });
      
      /* Post Handler */
      document.getElementById('postButton').addEventListener('click', async (event)=> {
        event.preventDefault();
        // Get values
        const topic = document.getElementById('searchInput').value;
        const titleData = document.getElementById('titleInput').value;
        const bodyData = document.getElementById('bodyInput').value;

        const postData = { // contents that are to be added
            title: titleData,
            body: bodyData
        }
        // display post
        try {
            const responseData = await newLibrary.post(topic, postData); 
            ProcessPost(responseData);
        }
        catch (err) {
            ProcessPost(err);
        }
      })

      /* Put Handler */
      document.getElementById('putButton').addEventListener('click', async (event) => { 
        event.preventDefault();
        // Get values from drop-downs
        const topic = document.getElementById('searchInput').value;
        const titleData = document.getElementById('titleInput').value;
        const bodyData = document.getElementById('bodyInput').value;

        //CHANGE THIS TO TEST PUT DATA
        const putData = {
          title: titleData,
          body: bodyData
        }
        //CHANGE THIS TO TEST PUT DATA

        // Get and put book
        try {
          const responseData = await newLibrary.put(topic, putData);
          ProcessPut(responseData);
        } catch (err) {
          ProcessPut(err);
        }
      });

      /* Delete Handler */
      document.getElementById('deleteButton').addEventListener('click', async (event) => {
        event.preventDefault();
        // Get values from search
        const topic = document.getElementById('searchInput').value;
        // Delete book
        try {
          const responseData = await newLibrary.delete(topic);
          ProcessDelete(responseData);
        } catch (err) {
          ProcessDelete(err);
        }
      });
});

function ProcessPut(response){
    if(response.ok) {
        let output = '<ul style=\"list-style:none\"> <li>Object Put</li> </ul>';
        //let output = '<h1>Object Put</h1>';
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
        output += `<li>Object Deleted</li>`;
        output += "</ul>";
        document.getElementById("booksDisplay").innerHTML = output;
    }
    else{
        document.getElementById("booksDisplay").innerHTML = "Error In Deletion";
    }
}
function ProcessPost(response) {
    if (response.ok) {
        let output;
        output = "<ul style=\"list-style:none\">";
    
        // this would display specifics of what is added if server could handle it
        // output += `<li>${response.title} - ${response.body}</li>`; 
    
        output += `<li> Book Posted </li>`; // use this to show if book is actually added 
        output += "</ul>";
        document.getElementById("booksDisplay").innerHTML = output;
    }
    else{
        document.getElementById("booksDisplay").innerHTML = "Error in Posting";
    }
}

function ShowResponse(res){
    let html = "<ol style = 'list-style:none'/>";
    if(Array.isArray(res)){
         res.forEach(book => {
             html += `<li>${book.id}. ${book.title}  -  ${book.body}</li>`;
        })
    }
    else{
        html += `<li>${res.id}. ${res.title}  -  ${res.body}</li>`
    }   
    document.getElementById("booksDisplay").innerHTML = html;
}
