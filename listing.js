//CLEAR OLD DATA 

function resetBookDetails() {
    document.getElementById("book-cover-small").src = "https://via.placeholder.com/150";
    document.getElementById("book-cover-large").src = "https://via.placeholder.com/400";
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-summary").value = "";
    document.getElementById("book-genre").value = "";
    document.getElementById("book-condition").value = "";
    document.getElementById("suggested-contribution").value = "";
    console.log("data cleared")
}


resetBookDetails(); // call when page loads


//FETCH BOOK DETAILS 
  // Need account and API key for google books, double check API endpoint for open library

document.getElementById("fetch-button").addEventListener("click", fetchBookDetails);

async function fetchBookDetails() {

  resetBookDetails();   // Clear old data

  const isbn = document.getElementById("isbn-input").value.trim();

  if (!isbn) {
      alert("Please enter an ISBN!");
      return;
  }

  const openLibraryUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  let largeImage = "https://via.placeholder.com/400";
  let smallImage = "https://via.placeholder.com/150";
  let title = "No Title Available";
  let authors = "Unknown Author";
  let description = "No description available.";
  let categories = "No categories available.";

  try {
      // Fetch Open Library data
      const openLibraryResponse = await fetch(openLibraryUrl);
      const openLibraryData = await openLibraryResponse.json();
      const openLibraryBook = openLibraryData[`ISBN:${isbn}`];

      if (openLibraryBook) {
          largeImage = openLibraryBook.cover?.large || largeImage;
      }
  } catch (error) {
      console.error("Error fetching Open Library data:", error);
  }

  try {
      // Fetch Google Books data
      const googleBooksResponse = await fetch(googleBooksUrl);
      const googleBooksData = await googleBooksResponse.json();

      if (googleBooksData.totalItems > 0) {
          const googleBook = googleBooksData.items[0].volumeInfo;

          title = googleBook.title || title;
          authors = googleBook.authors?.join(", ") || authors;
          description = googleBook.description || description;
          categories = googleBook.categories?.join(", ") || categories;
          smallImage = googleBook.imageLinks?.smallThumbnail || smallImage;
      }
  } catch (error) {
      console.error("Error fetching Google Books data:", error);
  }

  // Populate UI fields
  document.getElementById("book-cover-small").src = smallImage;
  document.getElementById("book-cover-large").src = largeImage;
  document.getElementById("book-title").value = title;
  document.getElementById("book-author").value = authors;
  document.getElementById("book-summary").value = description;
  document.getElementById("book-genre").value = categories;

  // Show details section
  document.getElementById("book-details").style.display = "flex";
}



// 'BACK TO TOP' BUTTON

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


// SAVE LISTING TO DATABASE

document.getElementById("save-button").addEventListener("click", saveBookDetails);

function saveBookDetails() {
    const data = {
        isbn: document.getElementById("isbn-input").value,
        title: document.getElementById("book-title").value,
        authors: document.getElementById("book-author").value,
        genre: document.getElementById("book-genre").value,
        description: document.getElementById("book-summary").value,
        condition: document.getElementById("book-condition").value,
        price: document.getElementById("suggested-contribution").value,
        smallCoverUrl: document.getElementById("book-cover-small").src,
        largeCoverUrl: document.getElementById("book-cover-large").src
    };

    fetch("save_book.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((result) => {
            alert(result.message);
        })
        .catch((error) => {
            console.error("Error saving book details:", error);
            alert("An error occurred while saving the book details.");
        });
}