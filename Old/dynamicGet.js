const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchDisplay');

let data;

window.onload = function() {
    data = getAllBooks();
}

searchInput.addEventListener('input', function(){
    const searchTerm = searchInput.value;
    console.log(searchTerm);
    updateSearchResults(searchTerm);
});

function updateSearchResults(searchTerm) {

    let filteredResults = getMatchingResults(searchTerm);
    
    for(let i = 0; i < filteredResults.length; ++i) {

    }
}

function getMatchingResults(searchTerm){
    let filteredResults;
    for(var book in data){
        if (book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredResults.push(book.title);
        }
    };
    return filteredResults;
}

async function getAllBooks(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}