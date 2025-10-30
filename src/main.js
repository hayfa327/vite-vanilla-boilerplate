
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

// Function to create and append an image element
const createImage = (src) => {
  const imageEl = document.createElement('img')
  imageEl.src = src
  imageEl.alt = "Random image"
  containerEl.appendChild(imageEl)
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
const halloweenEmojis = ['🎃', '👻', '💀', '😈', '🕸️', '🦇', '🕷️', '⚰️'];

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

 