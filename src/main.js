import './style.css'
import './landing.css'
import './light-theme-button.js'
import './light-theme-css.css';
import './sound.js'
import './christmas.css'
import './Christmas.js'
import './comment.css'
import { showCommentsAfterModal } from './comment.js'
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
const fetchAllImages = () => {
  const totalPages = 20
  const pagePromises = []

  for (let page = 1; page <= totalPages; page++) {
    pagePromises.push(
      fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`)
        .then(resp => resp.json())
        .then(json => json.data)
        .catch(err => {
          console.error(`Failed to fetch page ${page}`, err)
          return []
        })
    )
  }

  return Promise.all(pagePromises).then(results => results.flat())
}

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
// init()

// Button to generate a new fortune
const buttonEl = document.createElement('button')
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
  
  // Mark user as logged in
  userLoggedIn = true;
  
  // Start the app after modal closes
  init();
  // Icon for music
  renderMusicPlayer();
  // Start emojis animation 
  window.emojisAnimation();
  // Hide comments after user logs in
  showCommentsAfterModal();
};

// Attach listener
document.getElementById('exitModal').addEventListener('click', closeModal);

const likesContainer = document.getElementById('likes');

// Array of Halloween emojis
const halloweenEmojis = ['🎃', '👻', '🕷️', '🦇', '🍬', '🍭', '🧙‍♀️', '🧛‍♂️'];
const christmasEmojis = [ '❄️' ];
let userLoggedIn = false; // Track if user has completed login

window.emojisAnimation = () => {
  // Don't show emojis before login
  if (!userLoggedIn) {
    likesContainer.innerHTML = '';
    return;
  }
  
  // Check theme and choose emoji set
  const isChristmasTheme = document.body.classList.contains('christmas-theme');
  const emojiArray = isChristmasTheme ? christmasEmojis : halloweenEmojis;

  likesContainer.innerHTML = '';
  
  fetch('https://image-feed-api.vercel.app/api/images?page=1')
    .then(resp => resp.json())
    .then(json => {
      json.data.forEach(image => { 
        // Use the number of likes, but limit the number of emojis to 60
        const count = Math.min(image.likes_count || 0, 60); 

        for (let i = 0; i < 50; i++) {
          const emoji = document.createElement('span');
          emoji.classList.add(isChristmasTheme ? 'emoji-icon' : 'halloween-icon');
          // choose a random emoji from the appropriate array
          emoji.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];

          emoji.style.left = Math.random() * 100 + '%';
          emoji.style.animationDuration = (1 + Math.random() * 10) + 's';
          emoji.style.fontSize = (20 + Math.random() * 25) + 'px';

          likesContainer.appendChild(emoji);
        }
      });
    });
};


 