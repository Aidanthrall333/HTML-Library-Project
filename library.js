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
    async put(destination, data){
        //fix
    }
    async delete(destination){
        //fix
    }    
}
