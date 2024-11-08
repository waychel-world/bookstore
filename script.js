// Store book listings and cart items in arrays
const bookListings = [];
const cart = [];

// Fetch book details from Amazon API based on ISBN
async function fetchBookData() {
  const isbn = document.getElementById("isbn").value;
  // Mock API call; replace this with an actual call to your back-end API
  const response = await fetch(`/api/get-book-info?isbn=${isbn}`);
  const book = await response.json();

  // Populate fields with data
  document.getElementById("title").value = book.title || "";
  document.getElementById("description").value = book.description || "";
  document.getElementById("price").value = book.price || "";
}

// Submit book listing to storefront
function submitBook() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const condition = document.getElementById("condition").value;
  const review = document.getElementById("review").value;

  // Create book object
  const book = { title, description, price, condition, review };
  bookListings.push(book);

  // Render updated book listings
  renderBookListings();
  clearForm();
}

// Render available books in the storefront
function renderBookListings() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  bookListings.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Condition: ${book.condition}</p>
      <p>${book.description}</p>
      <p>Price: $${book.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    bookList.appendChild(bookItem);
  });
}

// Add selected book to cart
function addToCart(index) {
  const book = bookListings[index];
  cart.push(book);
  renderCart();
}

// Render items in the cart
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <h3>${item.title}</h3>
      <p>Price: $${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartList.appendChild(cartItem);
  });
}

// Remove book from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Mock checkout function
function checkout() {
  alert("Checkout complete! Thank you for your donation.");
  cart.length = 0; // Clear the cart
  renderCart();
}

// Clear form fields after submission
function clearForm() {
  document.getElementById("book-form").reset();
}
