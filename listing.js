document.getElementById("fetch-button").addEventListener("click", fetchBookDetails);

function fetchBookDetails() {
  const isbn = document.getElementById("isbn-input").value.trim();

  if (!isbn) {
    alert("Please enter an ISBN!");
    return;
  }

  // Open Library API URL for large cover image
  const openLibraryUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

  // Google Books API URL for book details including small thumbnail
  const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  // First, fetch data from Open Library for large cover image
  fetch(openLibraryUrl)
    .then((response) => response.json())
    .then((openLibraryData) => {
      const openLibraryBook = openLibraryData[`ISBN:${isbn}`];

      if (!openLibraryBook) {
        alert("No book found for this ISBN in Open Library.");
        return;
      }

      const largeImage = openLibraryBook.cover?.large || "https://via.placeholder.com/500";

      // Now fetch data from Google Books for small thumbnail and other details
      fetch(googleBooksUrl)
        .then((response) => response.json())
        .then((googleBooksData) => {
          if (googleBooksData.totalItems === 0) {
            alert("No book found for this ISBN in Google Books.");
            return;
          }

          const googleBook = googleBooksData.items[0].volumeInfo;
          const title = googleBook.title || "No Title Available";
          const authors = googleBook.authors?.join(", ") || "Unknown Author";
          const description = googleBook.description || "No description available.";
          const categories = googleBook.categories?.join(", ") || "No categories available.";
          
          // Extract small thumbnail image from Google Books
          const smallImage = googleBook.imageLinks?.smallThumbnail || "https://via.placeholder.com/150";

          // Fetch genre and subject information (you can use categories as genre)
          const genre = categories || "No genre available";

          // Populate the UI with fetched data
          document.getElementById("book-cover-small").src = smallImage; // Small image from Google Books
          document.getElementById("book-cover-large").src = largeImage; // Large image from Open Library
          document.getElementById("book-title").textContent = title;
          document.getElementById("book-author").textContent = `Author(s): ${authors}`;
          document.getElementById("book-summary").textContent = description;
          document.getElementById("book-genre").textContent = `Genre: ${genre}`;

          // Show the details section
          document.getElementById("book-details").style.display = "flex";
        })
        .catch((error) => {
          console.error("Error fetching data from Google Books:", error);
          alert("An error occurred while fetching book details from Google Books.");
        });
    })
    .catch((error) => {
      console.error("Error fetching data from Open Library:", error);
      alert("An error occurred while fetching book details from Open Library.");
    });
}


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