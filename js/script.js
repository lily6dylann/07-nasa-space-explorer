// Get references to the button, gallery, and date inputs
const fetchBtn = document.getElementById('fetch-btn');
const gallery = document.getElementById('gallery');
const startInput = document.getElementById('start-date');
const endInput = document.getElementById('end-date');

// NASA API key
const apiKey = 'HcIsqR1cdlyVKyRGDZlm3XBNh4k5WYl1O9KahTEQ';

// Function to fetch APOD images for the selected date range
const fetchAPODImages = async () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Check if both dates are selected
  if (!startDate || !endDate) {
    gallery.innerHTML = '<p>Please select both start and end dates.</p>';
    return;
  }

  // Show a loading message
  gallery.innerHTML = '<p>🔄 Loading space photos…</p>';

  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Clear the gallery before adding new content
    gallery.innerHTML = '';

    // Populate the gallery with images or videos
    if (Array.isArray(data)) {
      data.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        if (item.media_type === 'image') {
          // Handle image entries
          galleryItem.innerHTML = `
            <img src="${item.url}" alt="${item.title}" class="space-image">
            <h3>${item.title}</h3>
            <p>${item.date}</p>
          `;

          // Add click event to open the modal
          galleryItem.addEventListener('click', () => {
            openModal(item.url, item.title, item.date, item.explanation);
          });
        } else if (item.media_type === 'video') {
          // Handle video entries
          galleryItem.innerHTML = `
            <div class="video-container">
              <iframe src="${item.url}" frameborder="0" allowfullscreen class="space-video"></iframe>
            </div>
            <h3>${item.title}</h3>
            <p>${item.date}</p>
            <a href="${item.url}" target="_blank" class="video-link">Watch Video</a>
          `;
        }

        gallery.appendChild(galleryItem);
      });

      if (gallery.children.length === 0) {
        gallery.innerHTML = '<p>No content found for this date range.</p>';
      }
    } else {
      gallery.innerHTML = `<p>${data.msg || 'No content found.'}</p>`;
    }
  } catch (error) {
    gallery.innerHTML = `<p>Sorry, something went wrong: ${error.message}</p>`;
  }
};

// Add event listener to the button
fetchBtn.addEventListener('click', fetchAPODImages);

// Modal functionality
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalExplanation = document.getElementById('modal-explanation');
const closeModal = document.getElementById('close-modal');

// Function to open the modal
const openModal = (imageUrl, title, date, explanation) => {
  modalImage.src = imageUrl;
  modalTitle.textContent = title;
  modalDate.textContent = date;
  modalExplanation.textContent = explanation;

  modal.classList.remove('hidden');
};

// Function to close the modal
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Get reference to the space fact text element
const factText = document.getElementById('fact-text');

// Array of random space facts
const spaceFacts = [
  "A day on Venus is longer than a year on Venus.",
  "Neutron stars can spin 600 times per second.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Saturn's moon Titan has rivers, lakes, and seas made of methane.",
  "The largest volcano in the solar system is on Mars: Olympus Mons.",
  "The Sun accounts for 99.86% of the mass in the solar system.",
  "A teaspoon of neutron star material weighs about 6 billion tons.",
  "Jupiter has 79 moons, the most of any planet in the solar system.",
  "The Milky Way galaxy is about 100,000 light-years across.",
  "Black holes can grow by consuming stars and other matter."
];

// Function to display a random space fact
const displayRandomFact = () => {
  // Pick a random fact from the array
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  // Update the fact text element
  factText.textContent = randomFact;
};

// Call the function to display a random fact when the page loads
displayRandomFact();
