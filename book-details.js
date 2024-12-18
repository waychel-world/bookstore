
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    
    fetch(`http://127.0.0.1:8000/api/books/${bookId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(book => {
        document.getElementById('details-title').textContent = book.title;
        document.getElementById('details-author').textContent = `${book.authors}`;
        document.getElementById('details-condition').textContent = `${book.book_condition}`;
        document.getElementById('details-contribution').textContent = `$${book.contribution}`;   
        document.getElementById('details-isbn').textContent = book.isbn;
        document.getElementById('details-genre').textContent = book.genre;
        document.getElementById('details-summary').textContent = book.summary;

    })
    .catch(err => {
        console.error('Error fetching book details:', err);
        document.getElementById('book-details-box').textContent = 'Failed to load book details.';
    });

});

/*
function addToCart() {
    alert('Add to cart functionality coming soon!');
}

*/
