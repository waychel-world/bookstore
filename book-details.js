
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

        document.getElementById('details-image-box').innerHTML = `
            <div class="image-box-large">
                <img src="${book.largeCoverUrl}" alt="Large Book Cover" id="details-cover-large" class="details-cover-large">
            </div>
            <div class="image-box-small">
                <img src="${book.smallCoverUrl}" alt="Small Book Cover" id="details-cover-small" class="details-cover-small">
            </div>
        `;
        document.getElementById('add-to-cart-button').innerHTML = `
            <input type="submit" value="Add to Cart" id="add-to-cart-button" class="add-to-cart-button" data-book-id="${book.id}">
        `;
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


// Add to Cart function using Local Storage

document.getElementById('add-to-cart-button').addEventListener('click', event => {
    const bookId = event.target.getAttribute('data-book-id'); // Get book ID
    addToCart(bookId); // Call the function to add to the cart
});

function addToCart(bookId) {
    // Retrieve existing cart from local storage or start with an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the book is already in the cart
    const existingItem = cart.find(item => item.bookId === bookId);
    if (existingItem) {
        alert('This book is already in your cart!') // if the book already exists in cart
    } else {
        cart.push({ bookId: bookId }); // Add new book to cart
        alert('Book added to cart!');
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(cart)
}