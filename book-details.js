
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
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-author').textContent = `Author: ${book.authors}`;
        // document.getElementById('book-description').textContent = book.summary;
        document.getElementById('suggested-contribution').textContent = `Suggested contribution: $${book.contribution}`;
    })
    .catch(err => {
        console.error('Error fetching book details:', err);
        document.getElementById('book-details').textContent = 'Failed to load book details.';
    });

});

/*
function addToCart() {
    alert('Add to cart functionality coming soon!');
}
*/
