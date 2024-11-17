//Image carousel with links

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-images a");
  const dots = document.querySelectorAll(".dot");

  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  // Show the selected slide
  slides[index].classList.add("active");

  // Loop through dots and update the active dot
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);

  // Reset the interval when a dot is clicked
  resetInterval();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % document.querySelectorAll(".slide").length;
  showSlide(currentSlide);
}

function startInterval() {
  slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// Initial display and start interval
showSlide(currentSlide);
startInterval();


// Clone placeholder book
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.book-container');
  const item = document.querySelector('.book'); // Select the item to clone

  for (let i = 2; i <= 15; i++) { // Clone it 9 more times
    const clone = item.cloneNode(true); // Deep copy the item with all its children
    container.appendChild(clone); // Append clone to the container
  }
});


// Button toggle functionality

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-button');
  const bookSection = document.getElementById('book-section');

  toggleButton.addEventListener('click', () => {
      // Toggle the 'expanded' class
      bookSection.classList.toggle('expanded');

      // Update the button text
      if (bookSection.classList.contains('expanded')) {
          toggleButton.textContent = 'less';
      } else {
          toggleButton.textContent = 'more';
      }
  });
});

// Back to top button

document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('back-to-top');

  // Show or hide the button based on scroll position
  window.addEventListener('scroll', () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }
  });

  // Scroll to top when the button is clicked
  backToTopButton.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});

/*
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

*/