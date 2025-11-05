import './style.css'
import './landing.css'
import './light-theme-button.js'
import './light-theme-css.css';
import './sound.js'
import {renderMusicPlayer} from './sound.js';
// causes for the whole light-th..js file to run (even though we only import one function)
import { switchTheme } from './light-theme-button';

const sentences = [
  {
    first: "Tomorrow you will trip over a ",
    second: ", which will force you to communicate only through ",
    third: ", until a wild ",
    fourth: " restores your dignity."
  },
  {
    first: "Soon you will receive a mysterious ",
    second: " in the mail that convinces you to start ",
    third: ", and only the sacred ",
    fourth: " will reveal your destiny."
  },
  {
    first: "You are destined to be followed by a ",
    second: " while trying to eat a ",
    third: ", until the legendary ",
    fourth: " declares you ruler of Tuesdays."
  },
  {
    first: "A magical ",
    second: " will challenge you to a duel of ",
    third: ", but only the arrival of ",
    fourth: " will prevent total chaos."
  },
  {
    first: "This month, you will adopt a talking ",
    second: " who demands you learn ",
    third: ", and together you will summon ",
    fourth: " to change world history."
  },
  {
    first: "Your future involves a haunted ",
    second: " that whispers about ",
    third: ", until a glowing ",
    fourth: " appears to grant questionable wishes."
  },
  {
    first: "During your next adventure, you will accidentally invent ",
    second: " while chasing a ",
    third: ", right before ",
    fourth: " offers you eternal fame."
  },
  {
    first: "A prophetic ",
    second: " will appear in your dreams, urging you to sacrifice ",
    third: ", so that the almighty ",
    fourth: " can reboot your destiny."
  },
  {
    first: "You will unexpectedly become obsessed with ",
    second: ", leading you to build a shrine of ",
    third: ", until the wise ",
    fourth: " bestows enlightenment."
  },
  {
    first: "The universe has chosen you to battle ",
    second: " using only ",
    third: ", and victory will earn you the sacred ",
    fourth: " of everlasting snacks."
  }
];


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
  
  // Start the app after modal closes
  init();
  // Icon for music
  renderMusicPlayer();
};

// Attach listener
document.getElementById('exitModal').addEventListener('click', closeModal);

/* const commentsContainer = document.getElementById('comments');
 
 let page = 1; 
let allComments = [];

// function to create the comment element 
const createComment  = (comment) => {
const commentEl = document.createElement('p')
commentEl.innerHTML = comment 
commentsContainer.appendChild(commentEl)
};

 // function to fetch the comments from the API and display them
fetch ('https://image-feed-api.vercel.app/api/images?page=1')
.then(resp => resp.json())
.then(json => {
      json.data.forEach(image => {
     image.comments.forEach(c => allComments.push(`${c.commenter_name}: ${c.comment}`));
});
console.log(allComments);
const shuffledComments = allComments.sort(() => 0.5 - Math.random());
const selectedComments = shuffledComments.slice(0, 4);
selectedComments.forEach(c => createComment(c));

}); */ 

// function to create the likes element
const likesContainer = document.getElementById('likes');

// Array of Halloween emojis
const halloweenEmojis = ['🎃'];

fetch('https://image-feed-api.vercel.app/api/images?page=1')
  .then(resp => resp.json())
  .then(json => {
    json.data.forEach(image => {
      const count = image.likes_count || 0;

      for (let i = 0; i < count; i++) {
        const emoji = document.createElement('span');
        emoji.classList.add('halloween-icon');

        // choose a random Halloween emoji
        emoji.textContent = halloweenEmojis[Math.floor(Math.random() * halloweenEmojis.length)];

        emoji.style.left = Math.random() * 90 + '%';
        emoji.style.animationDuration = (3 + Math.random() * 3) + 's';
         emoji.style.fontSize = (20 + Math.random() * 20) + 'px';

        likesContainer.appendChild(emoji);
      }
    });
  });

//----------------------------- light theme button ----------------------------- 
