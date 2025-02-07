

// Fetch cart data from local storage
const cartIds = JSON.parse(localStorage.getItem('cart')) || [];

cartIds.forEach(book => {
    console.log(`Book ID: ${book.bookId}`);
});


async function fetchCartDetails() {
    if (cartIds.length === 0) {
        document.getElementById('cart-box').innerHTML = '<p>Your cart is empty ಠ╭╮ಠ</p>';
        return;
    }

    try {
        // Send a POST request with the array of book IDs
        const response = await fetch('http://127.0.0.1:8000/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: cartIds.map(book => book.bookId) }), // Extract bookId from each object
        });
        
        if (!response.ok) throw new Error('Failed to fetch cart');
        
        const books = await response.json();
        renderCart(books);
    } catch (error) {
        console.error('Error fetching cart details:', error);
        document.getElementById('cart-box').innerHTML = '<p>Error loading cart. Please try again.</p>';
    }
}


function renderCart(books) {
    const cartBox = document.getElementById('cart-box');

    books.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div id="cart-image-box" class="cart-image-box">
                <a href="book-details.html?id=${item.id}" target="_blank" class="cover-link">
                    <img src="${item.smallCoverUrl}" alt="Book Cover" class="cart-book-cover">
                </a>
            </div>
            <div id="cart-details" class="cart-details">
                <h2 id="cart-item-title" class="cart-item-title cart-details-content">${item.title}</h2>
                <h3 id="cart-item-author" class="cart-item-author cart-details-content">${item.authors}</h3>
                <p id="cart-item-condition" class="cart-item-condition cart-details-content">Condition: ${item.book_condition}</p>
                <input type="submit" value="Remove" id="remove-button" class="remove-button" data-book-id="${item.id}">
            </div>
            <div id="cart-contribution-box" class="cart-contribution-box">
                <p id="cart-item-contribution" class="cart-item-contribution">$${item.contribution}</p>
            </div>
        `;
        cartBox.appendChild(cartItem);
    });

    attachRemoveListeners(); // Re-attach event listeners for new buttons
}


// Function to remove a book from the cart
function attachRemoveListeners() {
    console.log("attachRemoveListeners")
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const bookId = event.target.dataset.bookId;
            removeFromCart(bookId);
        });
    });
}

// Function to remove a book ID from local storage
function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.bookId !== bookId); // Remove item by bookId
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
    window.location.reload();
}

// Fetch and render cart details on page load
fetchCartDetails();


/* Reinstate if useful, not priority currently 
function clearCart() {
    localStorage.removeItem('cart');
    alert('Cart cleared!');
}
*/