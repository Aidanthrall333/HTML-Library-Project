//load all books right away
window.onload = function(){
    loadAllBooks();
};

async function loadAllBooks(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            const booksDisplay = document.getElementById("BooksDisplay");
            let innerHTML = "<ul>";

            data.forEach((book) => {
                innerHTML += `<li class="bookTitle"><b>${book.title}</b> - ${book.body}</li>`;
            });
            innerHTML += "</ul>";
            booksDisplay.innerHTML = innerHTML;
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}