import './style.css'

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

// Function to create and append an image element
const createImage = (src) => {
  const wrapperEl = document.createElement('div')
  wrapperEl.classList.add('image-wrapper')

  const imageEl = document.createElement('img')
  imageEl.src = src
  imageEl.alt = "Random image"

  const overlayEl = document.createElement('div')
  overlayEl.classList.add('overlay')

  overlayEl.addEventListener('click', () => {
    overlayEl.classList.add('hidden')
  })

  wrapperEl.appendChild(imageEl)
  wrapperEl.appendChild(overlayEl)
  containerEl.appendChild(wrapperEl)
}

// Function to create and append a text paragraph
const createText = (text) => {
  const textEl = document.createElement('p')
  textEl.innerText = text
  containerEl.appendChild(textEl)
}

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

// Updated init function without async/await
const init = () => {
  fetchAllImages().then(images => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
    const shuffledImages = images.sort(() => 0.5 - Math.random())
    const selectedImages = shuffledImages.slice(0, 3)

    createText(randomSentence.first)
    createImage(selectedImages[0].image_url)

    createText(randomSentence.second)
    createImage(selectedImages[1].image_url)

    createText(randomSentence.third)
    createImage(selectedImages[2].image_url)

    createText(randomSentence.fourth)
  })
}

// Start the app initially
init()

// Button to generate a new fortune
const buttonEl = document.createElement('button')
buttonEl.innerText = "Generate New Fortune"
buttonEl.onclick = () => {
  containerEl.innerHTML = ""
  init()
}
buttonContainer.appendChild(buttonEl)




import './landing.css';
import { lightTheme } from '../light-theme-button';

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
};

// Attach listener
document.getElementById('exitModal').addEventListener('click', closeModal);

//----------------------------- light theme button ----------------------------- 

import { lightTheme } from '../light-theme-button';

//creates a slider button in the header
const themeButtonLabelEl = document.createElement('label')
themeButtonLabelEl.classList.add('switch')
const themeButtonInputEl = document.createElement('input')
themeButtonInputEl.type = 'checkbox'
const themeButtonSpanEl = document.createElement('span')
themeButtonSpanEl.classList.add('slider', 'round')
themeButtonLabelEl.appendChild(themeButtonInputEl)
themeButtonLabelEl.appendChild(themeButtonSpanEl)

const headerEl = document.querySelector('header')
headerEl.appendChild(themeButtonLabelEl)

const bodyEl = document.body;
let theme = 'default' // sets the current theme to default

//light theme function that overrides the current css
//and sets theme to 'theme' so the switchTheme function reacts correctly
lightTheme();

//sets css values back to the initial values. 
const reverseLightTheme = () => {
  bodyEl.classList.remove('light-theme')
  theme = 'default'
}

const switchTheme = () => {
  if (theme === 'default') {
    lightTheme();
  } else if (theme === 'theme') {
    reverseLightTheme();
  }
}

themeButtonInputEl.addEventListener('click', switchTheme)