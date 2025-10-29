
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
  // Create wrapper div
  const wrapperEl = document.createElement('div')
  wrapperEl.classList.add('image-wrapper')

  // Create image element
  const imageEl = document.createElement('img')
  imageEl.src = src
  imageEl.alt = "Random image"

  // Create overlay div
  const overlayEl = document.createElement('div')
  overlayEl.classList.add('overlay')

  // When overlay is clicked, reveal image
  overlayEl.addEventListener('click', () => {
    overlayEl.classList.add('hidden')
  })

  // Append image and overlay to wrapper
  wrapperEl.appendChild(imageEl)
  wrapperEl.appendChild(overlayEl)

  // Add wrapper to container
  containerEl.appendChild(wrapperEl)
}


// Function to create and append a text paragraph
const createText = (text) => {
  const textEl = document.createElement('p')
  textEl.innerText = text
  containerEl.appendChild(textEl)
}

const init = () => {
  // Fetch images from the API
  fetch('https://image-feed-api.vercel.app/api/images?page=1')
    .then(resp => resp.json())
    .then(json => {
      const images = json.data

      // Pick one random sentence object from the sentences array
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]

      // Shuffle images and select 3 unique ones
      const shuffledImages = images.sort(() => 0.5 - Math.random())
      const selectedImages = shuffledImages.slice(0, 3)

      // Display the sentence and images in order
      createText(randomSentence.first)
      createImage(selectedImages[0].image_url)

      createText(randomSentence.second)
      createImage(selectedImages[1].image_url)

      createText(randomSentence.third)
      createImage(selectedImages[2].image_url)

      createText(randomSentence.fourth)
    })
}

init()

const buttonEl = document.createElement('button')
buttonEl.innerText = "Generate New Fortune"
buttonEl.onclick = () => {
  containerEl.innerHTML = ""
  init()
}
buttonContainer.appendChild(buttonEl)