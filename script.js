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

// Fetch books from database
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.book-container');
    
   // Fetch books from the database
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books'); // Explicit IP for MAMP
      const data = await response.json();
      
      // Log the fetched data for debugging
      console.log('Fetched data:', data);

      // Ensure the data is an array before proceeding
      if (Array.isArray(data)) {
          
          const books = data; // Assign the fetched data to `books`
          
          // Populate the book container with data from the database
          books.forEach(book => {
            
              const bookElement = document.createElement('div');
              bookElement.className = 'book';
              bookElement.innerHTML = `
                  <div class="book-box">
                      <a href="book-details.html?id=${book.id}" target="_blank">
                          <div class="book-image-box">
                              <img src="${book.smallCoverUrl}" alt="Book Cover" class="book-cover">
                          </div>
                          <div class="book-text-box">
                              <h3 class="book-author">${book.authors}</h3>
                              <h2 class="book-title">${book.title}</h2>
                              <p class="suggested-contribution">$${book.contribution}</p>
                          </div>
                      </a>
                  </div>
              `;

              container.appendChild(bookElement);
              
          });
      } else {
          console.error('Expected an array but received:', data);
          container.innerHTML = '<p>Invalid data format. Please check the API response.</p>';
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      container.innerHTML = '<p>Failed to load books. Please try again later.</p>';
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