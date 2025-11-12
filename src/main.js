import './style.css'
import './landing.css'
import './light-theme-button.js'
import './light-theme-css.css';
import './sound.js'
import './christmas.css'
import './Christmas.js'
import {renderMusicPlayer} from './sound.js';
import {sentences} from './data.js'

const containerEl = document.getElementById('app')
const buttonContainer = document.getElementById('button-container')

// Hide main content initially until modal is closed
containerEl.style.display = 'none';
buttonContainer.style.display = 'none';

// Function to create and append an image element
const createImage = (src) => {
  return `
    <div class="image-wrapper">
      <img src="${src}" alt="Random image" />
      <div class="overlay" onclick="this.classList.add('hidden')"></div>
    </div>
  `;
};

// Return HTML string for text
const createText = (text) => {
  return `<p>${text}</p>`;
};

// **Fetch all 20 pages in parallel**
const fetchAllImages = async () => {
  const totalPages = 20;
  const failedPages = [];
  const pagePromises = [];

 // --- Show loading overlay ---
const loadingOverlay = document.createElement('div');
loadingOverlay.id = 'loading-overlay';
loadingOverlay.innerHTML = `<div id="loading-message">🔮 Operating magic 🔮</div>`;

// Append overlay to body 
document.body.appendChild(loadingOverlay);

// Optionally hide the app and theme button while loading
containerEl.style.display = 'none';
document.querySelector('.theme-btn')?.classList.add('hidden');


  //  Start fetching all pages 
  for (let page = 1; page <= totalPages; page++) {
    const promise = (async () => {
      try {
        const resp = await fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`);
        if (!resp.ok) {
          throw new Error(`HTTP error ${resp.status}`);
        }
        const json = await resp.json();
        return json.data;
      } catch (err) {
        console.error(`❌ Failed to fetch page ${page}`, err);
        failedPages.push(page);
        return [];
      }
    })();

    pagePromises.push(promise);
  }

  //  Wait for all fetches to finish 
  const results = await Promise.all(pagePromises);
  const allImages = results.flat();

  //  Remove loading message 
// After all images are fetched
loadingOverlay.remove();

// Show the app and theme button again
containerEl.style.display = 'block';
document.querySelector('.theme-btn')?.classList.remove('hidden');


  //  Show warning if some pages failed 
  if (failedPages.length > 0) {
    const warning = document.createElement('div');
    warning.className = 'fetch-warning';
    warning.innerHTML = `
      ⚠️ Some image pages failed to load: ${failedPages.join(', ')}.<br>
      Only partial results may be shown.
    `;
    document.body.appendChild(warning);

    // Fade-out after a few seconds
    setTimeout(() => warning.classList.add('fade-out'), 5000);
    setTimeout(() => warning.remove(), 7000);
  }

  return allImages;
};


// Updated init function using ${} template literals
const init = () => {
  fetchAllImages().then(images => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
    const shuffledImages = images.sort(() => 0.5 - Math.random())
    const selectedImages = shuffledImages.slice(0, 3)

    const html = `
      ${createText(randomSentence.first)}
      ${createImage(selectedImages[0].image_url)}
      ${createText(randomSentence.second)}
      ${createImage(selectedImages[1].image_url)}
      ${createText(randomSentence.third)}
      ${createImage(selectedImages[2].image_url)}
      ${createText(randomSentence.fourth)}
    `

    containerEl.innerHTML = html
  })
}

// Don't start the app initially - wait for modal to close

// Button to generate a new fortune
const buttonEl = document.createElement('button')
buttonEl.className = 'generate-btn'
buttonEl.innerText = "Generate New Fortune"
buttonEl.onclick = () => {
  containerEl.innerHTML = ""
  init()
}
buttonContainer.appendChild(buttonEl)

let appTitle = document.getElementById('app-title');

// Create modal overlay
const overlay = document.createElement('div');
overlay.className = 'modal-overlay';

const box = document.createElement('div');
box.className = 'modal-box';
box.innerHTML = `
  <h2>⚠️ Proceed with Caution</h2>
  <p class = 'normaltext'>This experience contains flashing lights, eerie sounds, and possibly a few heart-stopping moments 🎃</p>
  <p class = 'normaltext'>If you have a heart condition or dislike sudden spooky surprises, we recommend viewing with caution... or maybe not at all 👀</p>
  <div style="margin:10px 0px; display:flex; align-items:center; justify-content:end; gap:0.2rem;">
    <label>Your Name: </label> 
    <input type="text" id="usero" placeholder="Mystery Guest">
    <button id="exitModal" style = 'margin:0;' >Consent</button>
  </div>
`;
overlay.appendChild(box);
document.body.appendChild(overlay);

// Show modal with fade-in effect
requestAnimationFrame(() => overlay.classList.add('show'));

// Handle close + welcome text
const closeModal = () => {
  const usernameInput = document.getElementById('usero');
  const userNameValue = usernameInput.value.trim() || "User";

  overlay.classList.remove('show');
  setTimeout(() => overlay.remove(), 400);

  appTitle.innerHTML = `🎃 Future Predictions for ${userNameValue} 🎃`;
  
  // Show main content after modal closes
  containerEl.style.display = 'block';
  buttonContainer.style.display = 'block';
  
  // Start the app after modal closes
  init();
  // Icon for music
  renderMusicPlayer();
  // Start emojis animation 
  window.emojisAnimation();
};

// Attach listener
document.getElementById('exitModal').addEventListener('click', closeModal);

// function to create the likes element
 const likesContainer = document.getElementById('likes');

// Array of Halloween emojis
const halloweenEmojis = ['🎃', '👻', '🕷️', '🦇', '🍬', '🍭', '🧙‍♀️', '🧛‍♂️'];
const christmasEmojis = [ '❄️' ];

window.emojisAnimation = () => {
  // Check if Christmas theme is active
  const isChristmasTheme = document.body.classList.contains('christmas-theme');
  const emojiArray = isChristmasTheme ? christmasEmojis : halloweenEmojis;

  likesContainer.innerHTML = '';
  
  fetch('https://image-feed-api.vercel.app/api/images?page=1')
    .then(resp => resp.json())
    .then(json => {
      json.data.forEach(image => { 
        // Use the number of likes, but limit the number of emojis to 60
        const count = Math.min(image.likes_count || 0, 70); 

        for (let i = 0; i < count; i++) {
          const emoji = document.createElement('span');
          if (isChristmasTheme) {
            emoji.classList.add('emoji-icon');  
          } else {
            emoji.classList.add('halloween-icon');  
          }
          // choose a random emoji from the appropriate array
          emoji.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];

          emoji.style.left = Math.random() * 100 + '%';
          emoji.style.animationDuration = (3 + Math.random() * 3) + 's';
          emoji.style.fontSize = (20 + Math.random() * 20) + 'px';

          likesContainer.appendChild(emoji);
      }
    });
  });
};