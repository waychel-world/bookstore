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