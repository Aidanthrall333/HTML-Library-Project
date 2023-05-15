const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchValue = searchInput.value;
    fetchBooks(searchValue);
});

async function fetchBooks(searchValue) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log(searchValue);

            const booksDisplay = document.getElementById("BooksDisplay");
            let innerHTML = "<ul>";

            data.forEach((book) => {
                if (book.title === searchValue) {
                    innerHTML += `<li>${book.title} - ${book.body}</li>`;
                }
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
